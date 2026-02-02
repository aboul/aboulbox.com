---
description: Serveur musical
---

# Navidrome

- URL: `https://music.{$SERVER_NAME}`
- Auth: OIDC / trusted sources (`ND_EXTAUTH_TRUSTEDSOURCES` pointe sur l'IP interne de Caddy)
- Docker volume:
  - `${ND_STORAGE_DATA}:/data` => BDD
  - `${ND_STORAGE_MUSIC}:/music:ro` => Discothèque
