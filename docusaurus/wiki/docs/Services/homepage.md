---
description: Dashboard interne
---

# Homepage

- URL: `https://home.{$SERVER_NAME}`
- Health endpoint: `/`
- Auth: Authelia (forward_auth)
- Purpose: Dashboard interne (liens, status, services)
- Docker volume: uniquement la `config` et les `images` custom depuis des dossiers du repo
