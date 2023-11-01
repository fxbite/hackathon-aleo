import React, { useState } from 'react'
import styled from 'styled-components'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ShareIcon from '@mui/icons-material/Share'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import CloseIcon from '@mui/icons-material/Close'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import AlbumIcon from '@mui/icons-material/Album';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Typography from '@mui/material/Typography'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Wallet } from './AleoWallet'
import Button from '@mui/material/Button';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../swipper.css'
// import TextField from '@mui/material/TextField';
// import { withStyles } from '@mui/styles'
// import GitHubIcon from '@mui/icons-material/GitHub'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
// import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff'

import { BackgroundMode } from '../../../types/BackgroundMode'
import { setShowJoystick, toggleBackgroundMode } from '../stores/UserStore'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getAvatarString, getColorByString } from '../util'

const WrapperWallet = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackdropLarge = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
`

const WrapperLarge = styled.div`
  width: 100%;
  height: 100%;
  background: #222639;
  border-radius: 16px;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #0000006f;

  .close {
    position: absolute;
    top: 0px;
    right: 0px;
  }
`

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  gap: 10px;
  bottom: 16px;
  right: 16px;
  align-items: flex-end;

  .wrapper-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const Wrapper = styled.div`
  position: relative;
  font-size: 16px;
  color: #eee;
  background: #222639;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 16px;
  padding: 15px 35px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .tip {
    margin-left: 12px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Title = styled.h3`
  font-size: 24px;
  color: #eee;
  text-align: center;
`

const RoomName = styled.div`
  margin: 10px 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 24px;
    color: #eee;
  }
`

const RoomDescription = styled.div`
  margin: 0 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`

const VideoGrid = styled.div`
flex: 1;
min-height: 0;
display: grid;
grid-gap: 10px;
grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));

.video-container {
  position: relative;
  background: black;
  border-radius: 8px;
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    object-fit: contain;
  }

  .player-name {
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 1px 2px rgb(0 0 0 / 60%), 0 0 2px rgb(0 0 0 / 30%);
    white-space: nowrap;
  }
}
`

const StyledFab = styled(Fab)<{ target?: string }>`
  &:hover {
    color: #1ea2df;
  }
`

export default function HelperButtonGroup() {
  const [showControlGuide, setShowControlGuide] = useState(false)
  const [showRoomInfo, setShowRoomInfo] = useState(false)
  const [showSpotify, setShowSpotify] = useState(false)
  const [showSponsor, setShowSponsor] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  const showJoystick = useAppSelector((state) => state.user.showJoystick)
  const backgroundMode = useAppSelector((state) => state.user.backgroundMode)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomId = useAppSelector((state) => state.room.roomId)
  const roomName = useAppSelector((state) => state.room.roomName)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  const dispatch = useAppDispatch()
  const htmlContentSpotify = `<p></p><iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6QClArDhvcW" width="100%" height="650rem" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  const donationEndpoint =
      process.env.NODE_ENV === 'production'
        ? `https://${window.location.hostname}/donation`
        : `http://${window.location.hostname}/donation`
  const htmlContentDonation = `<p></p><iframe src="${donationEndpoint}" width="100%" height="680rem" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
  const sponsorList = [
    { img: '/assets/sponsor/sponsor_aag.png', link: '#' },
    { img: '/assets/sponsor/sponsor_besn.png', link: 'https://www.facebook.com/besn.ftuhanoi' },
    { img: '/assets/sponsor/sponsor_bizres.png', link: 'https://www.facebook.com/BizResOrganization' },
    { img: '/assets/sponsor/sponsor_col.png', link: 'https://discord.gg/Y5ewbMHrkp' },
    { img: '/assets/sponsor/sponsor_compass.png', link: '#' },
    { img: '/assets/sponsor/sponsor_domdom.png', link: '#' },
    { img: '/assets/sponsor/sponsor_greenwich.png', link: 'https://greenwich.edu.vn' },
    { img: '/assets/sponsor/sponsor_hellogit.png', link: 'https://www.facebook.com/HelloGIT' },
    { img: '/assets/sponsor/sponsor_jasminePham.png', link: '#' },
    { img: '/assets/sponsor/sponsor_kao.png', link: 'https://www.facebook.com/kaoentertainmentvietnam' },
    { img: '/assets/sponsor/sponsor_kclub.png', link: 'https://www.facebook.com/Kclubgreenwich' },
    { img: '/assets/sponsor/sponsor_newme.png', link: '#' },
    { img: '/assets/sponsor/sponsor_pmc.png', link: '#' },
    { img: '/assets/sponsor/sponsor_ptc.png', link: 'https://www.facebook.com/caulacbopageturner' },
    { img: '/assets/sponsor/sponsor_ftu.png', link: 'http://www.ftu.edu.vn' },
  ]

  


  return (
    <Backdrop>
      <div className="wrapper-group">
        {showDonation && (
          <BackdropLarge>
            <WrapperLarge>
              <IconButton className="close" onClick={() => setShowDonation(false)} size="small">
                <CloseIcon />
              </IconButton>

              <WrapperWallet>
                <Wallet/>
                <Button variant="contained" color="warning" size="large" startIcon={<VolunteerActivismIcon />}>
                  Raise fund with us
                </Button>                
              </WrapperWallet>
              <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: htmlContentDonation }} /> 
              
            </WrapperLarge>
          </BackdropLarge>
        )}
        {showSpotify && (
          <BackdropLarge>
            <WrapperLarge>
              <IconButton className="close" onClick={() => setShowSpotify(false)} size="small">
                <CloseIcon />
              </IconButton>
              <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: htmlContentSpotify }} /> 
            </WrapperLarge>
          </BackdropLarge>
        )}
        {showSponsor && (
          <BackdropLarge>
            <WrapperLarge>
              <IconButton className="close" onClick={() => setShowSponsor(false)} size="small">
                <CloseIcon />
              </IconButton>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                {sponsorList.map(item => (
                  <SwiperSlide>
                    <a href={item.link}>
                      <img src={item.img}  alt="sponsor" />
                    </a>
                  </SwiperSlide>
                ))}
                </Swiper>
            </WrapperLarge>
          </BackdropLarge>
        )}
        {showRoomInfo && (
          <Wrapper>
            <IconButton className="close" onClick={() => setShowRoomInfo(false)} size="small">
              <CloseIcon />
            </IconButton>
            <RoomName>
              <Avatar style={{ background: getColorByString(roomName) }}>
                {getAvatarString(roomName)}
              </Avatar>
              <h3>{roomName}</h3>
            </RoomName>
            <RoomDescription>
              <ArrowRightIcon /> ID: {roomId}
            </RoomDescription>
            <RoomDescription>
              <ArrowRightIcon /> Description: {roomDescription}
            </RoomDescription>
            <p className="tip">
              <LightbulbIcon />
              Shareable link coming up 😄
            </p>
          </Wrapper>
        )}
        {showControlGuide && (
          <Wrapper>
            <Title>Controls</Title>
            <IconButton className="close" onClick={() => setShowControlGuide(false)} size="small">
              <CloseIcon />
            </IconButton>
            <ul>
              <li>
                <strong>W, A, S, D or arrow keys</strong> to move
              </li>
              <li>
                <strong>F</strong> to sit down (when facing a chair)
              </li>
              <li>
                <strong>E</strong> to use computer to screen share (when facing a computer)
              </li>
              <li>
                <strong>Enter</strong> to open chat
              </li>
              <li>
                <strong>ESC</strong> to close chat
              </li>
            </ul>
            <p className="tip">
              <LightbulbIcon />
              Video connection will start if you are close to someone else
            </p>
          </Wrapper>
        )}
      </div>
      <ButtonGroup>
        {roomJoined && (
          <>
            <Tooltip title="Donation">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowDonation(!showDonation)
                  setShowSpotify(false)
                  setShowSponsor(false)
                  setShowRoomInfo(false)
                  setShowControlGuide(false)
                }}
              >
                <VolunteerActivismIcon/>
              </StyledFab>
            </Tooltip>
            <Tooltip title="Spotify Music">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowDonation(false)
                  setShowSpotify(!showSpotify)
                  setShowSponsor(false)
                  setShowRoomInfo(false)
                  setShowControlGuide(false)
                }}
              >
                <AlbumIcon/>
              </StyledFab>
            </Tooltip>
            <Tooltip title="Our Sponsor">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowDonation(false)
                  setShowSpotify(false)
                  setShowSponsor(!showSponsor)
                  setShowRoomInfo(false)
                  setShowControlGuide(false)
                }}
              >
                <HandshakeIcon/>
              </StyledFab>
            </Tooltip>
            <Tooltip title="Room Info">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowDonation(false)
                  setShowSpotify(false)
                  setShowSponsor(false)
                  setShowRoomInfo(!showRoomInfo)
                  setShowControlGuide(false)
                }}
              >
                <ShareIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="Control Guide">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowDonation(false)
                  setShowSpotify(false)
                  setShowSponsor(false)
                  setShowRoomInfo(false)
                  setShowControlGuide(!showControlGuide)
                }}
              >
                <HelpOutlineIcon />
              </StyledFab>
            </Tooltip>
          </>
        )}
        <Tooltip title="Visit Our Youtube">
          <StyledFab
            size="small"
            href="https://www.youtube.com/channel/UCp-_7tg1LqKejNd4O5iCT9g"
            target="_blank"
          >
            <YouTubeIcon/>
          </StyledFab>
        </Tooltip>
        <Tooltip title="Follow Us on Facebook">
          <StyledFab size="small" href="https://www.facebook.com/HEART-Vietnam-104181528908773" target="_blank">
            <FacebookIcon/>
          </StyledFab>
        </Tooltip>
        <Tooltip title="Switch Background Theme">
          <StyledFab size="small" onClick={() => dispatch(toggleBackgroundMode())}>
            {backgroundMode === BackgroundMode.DAY ? <DarkModeIcon /> : <LightModeIcon />}
          </StyledFab>
        </Tooltip>
      </ButtonGroup>
    </Backdrop>
  )
}
