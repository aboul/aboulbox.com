build: 
	docker compose build --pull --no-cache

up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

up-local-prod: 
	docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up -d --build

up-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --force-recreate

down:
	docker compose down --remove-orphans

logs:
	docker compose logs -f

restart:
	docker compose restart