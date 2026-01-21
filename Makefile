build: 
	docker compose build --pull --no-cache

up:
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml up -d

up-build:
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml up -d --build --force-recreate

down:
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans

logs:
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml logs -f

bash: 
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml exec caddy sh

reload-caddy:
	docker compose --env-file .env -f caddy.compose.yml -f caddy.compose.dev.yml -f docker-compose.yml -f docker-compose.dev.yml exec caddy caddy reload --config /etc/caddy/Caddyfile

restart: down up