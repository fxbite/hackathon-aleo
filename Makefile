.PHONY: all

DOCKER_DEV_UP = docker compose -f docker-compose.dev.yml -f docker-compose.yml up -d --build 
DOCKER_DEV_DOWN = docker compose -f docker-compose.prod.yml -f docker-compose.yml down
DOCKER_DEV_RESTART = $(DOCKER_DEV_DOWN) && $(DOCKER_DEV_UP)

DOCKER_PROD_UP = docker compose -f docker-compose.prod.yml -f docker-compose.yml up -d --build
DOCKER_PROD_DOWN = docker compose -f docker-compose.prod.yml -f docker-compose.yml down
DOCKER_PROD_RESTART = $(DOCKER_PROD_DOWN) && $(DOCKER_PROD_UP)

all: runDev stopDev restartDev runProd stopProd restartProd

runDev:
	$(DOCKER_DEV_UP)

stopDev: 
	$(DOCKER_DEV_DOWN)

restartDev:
	$(DOCKER_DEV_RESTART)

runProd:
	$(DOCKER_PROD_UP)

stopProd: 
	$(DOCKER_PROD_DOWN)

restartProd:
	$(DOCKER_PROD_RESTART)