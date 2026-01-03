build: 
	docker compose build --pull --no-cache

up:
	docker compose --env-file .env.dev -f docker-compose.yml -f docker-compose.dev.yml up -d

up-build:
	docker compose --env-file .env.dev -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate

up-build-local-prod: 
	docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up -d --build --force-recreate

up-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

up-build-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --force-recreate

down:
	docker compose down --remove-orphans

logs:
	docker compose logs -f

bash: 
	docker compose exec caddy sh

restart: down up

restart-build: down up-build

restart-local-prod: down up-build-local-prod

restart-prod: down up-prod

restart-build-prod: down up-build-prod