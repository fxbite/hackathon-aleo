async function getSmartContract() {
    const apiUrl = 'https://aleo123.io/api/v4/aleo/transactions/transition?program=heart_token.aleo'
    try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        return { status: true, data: result}
    } catch(e) {
        console.warn('Get smart contract error', e)
        return { status: false, data: e}
    }
}

async function getTransition(id) {
    const apiUrl = `https://aleo123.io/api/v4/aleo/transactions/transition/${id}`
    try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        return { status: true, data: result}
    } catch(e) {
        console.warn('Get transition error', e)
        return { status: false, data: e}
    }
}

async function leaderBoardHandle() {
    const result = await getSmartContract()
    const mintToken = result?.data?.transitions.filter(obj => obj['function'] === 'mint_token');
    let donation = []

    // Handle each transition
    for (const item of mintToken) {
        const result = await getTransition(item['id'])
        const token = result?.data?.transition?.inputs[0]?.value.replace(/u128/g, '');
        const address = result?.data?.transition?.address[0]
        const link = `https://aleo123.io/transitionDetails/${item['id']}`
        const info = {token, address, link}
        donation.push(info)
    }
    return donation
}

async function renderData() {
    const donation = await leaderBoardHandle()
    const leaderboardContainer = document.getElementById('render');

    donation.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="number">${index + 1}</td>
        <td class="name">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                ${item.address.slice(0, 12)}...${item.address.slice(-12)}
            </a>
        </td>
        <td class="points">
            ${item.token} heart 
            ${index + 1 === 1 ? '<img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>' : ''}
        </td>
      `;
      leaderboardContainer.appendChild(row);
    })
}

renderData()

