---
description: Monitoring
---

# Glances

- URL: `https://glances.{$SERVER_NAME}`
- Auth: Authelia (forward_auth)
- Purpose: Monitoring léger (CPU, RAM, Disk, Docker)
- Docker volume:
  - OS Release
  - Rootfs pour les stats disques durs
- Accès Docker : via `docker-proxy` (tecnativa/docker-socket-proxy), lecture seule (`/containers`, `/version`, `/info`), avec `DOCKER_HOST=tcp://docker-proxy:2375`. Le socket n'est jamais monté dans Glances.
