---
description: Dashboard interne
---

# Homepage

- URL: `https://home.{$SERVER_NAME}`
- Health endpoint: `/`
- Auth: Authelia (forward_auth)
- Purpose: Dashboard interne (liens, status, services)
- Docker volume: uniquement la `config` et les `images` custom depuis des dossiers du repo
- Accès Docker : via `docker-proxy` (tecnativa/docker-socket-proxy), lecture seule, `/containers` uniquement (`config/docker.yaml` : `host: docker-proxy`). Le socket n'est jamais monté dans Homepage.
