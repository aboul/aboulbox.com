# Authelia

- Authentification centralisée
- URL: `https://auth.{$SERVER_NAME}`
- OIDC clients: Immich, Directus
- Configuration:
  - Variables d'environnement via `.env`
  - Clés / Certificats / Secrets via fichiers secrets montés en volume depuis le serveur
  - TLS via Caddy
- Logs: `/var/log/authelia/`
