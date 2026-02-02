# Gestion des secrets et configuration

- Secrets stockés dans `.env` ou fichiers séparés
- Ne jamais mettre de secrets en clair dans le repo public
- Exemple placeholder Authelia:

```yaml
identity_providers:
  oidc:
    clients:
      - id: "immich"
        secret_file: "/run/secrets/immich_oidc_secret"
```