---
description: Photos
---

# Immich

- Photos
- URL: `https://photo.{$SERVER_NAME}`
- Auth: OIDC via Authelia
- Docker volume:
  - `${IMMICH_UPLOAD_LOCATION}:/data` pour les photos uploadées depuis mon téléphone
  - `${IMMICH_UPLOAD_LOCATION}/external-library:/mnt/photos` pour mes photos existentes

## Immich Android App

Immich propose une [APP Android](https://play.google.com/store/apps/details?id=app.alextran.immich) qui fonctionne très bien avec l'authentification OIDC.
