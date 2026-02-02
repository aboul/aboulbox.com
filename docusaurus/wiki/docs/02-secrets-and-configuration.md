# Gestion des secrets et configuration

- Secrets stockés dans `.env` ou fichiers séparés
- Ne jamais mettre de secrets en clair dans le repo public
- Exemple placeholder Authelia:

```yaml
totp:
  issuer: '{{ env "SERVER_NAME" }}' # Config venant du fichier .env
identity_providers:
  oidc:
    clients:
      - client_secret: '{{ secret "/secrets/OIDC_DIRECTUS_CLIENT_SECRET" }}' # Config venant d'un fichier au chemin spécifié
```
