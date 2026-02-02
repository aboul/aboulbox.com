# Authelia

- Authentification centralisée
- URL: https://auth.{$SERVER_NAME}
- OIDC providers: Immich, Directus, etc.
- Configuration:
  - Secrets via `.env` / fichiers secrets
  - TLS via Caddy
- Logs: `/var/log/authelia/`