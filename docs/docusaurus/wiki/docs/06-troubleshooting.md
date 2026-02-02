# Dépannage

## Erreurs courantes

### Authelia / OIDC
- `redirect_uri` mismatch → vérifier clients OIDC
- `User does not exist` → créer l’utilisateur ou activer auto-registration

### Directus
- `INVALID_CREDENTIALS` → email OIDC ne correspond pas à un user existant
- `/admin/login` loop → vérifier `AUTH_PROVIDERS` et `redirect_uri`

### Immich
- Problèmes de certificat → vérifier NODE_TLS_REJECT_UNAUTHORIZED en dev

### Navidrome
- `ND_EXTAUTH_TRUSTEDSOURCES` pour IP correcte