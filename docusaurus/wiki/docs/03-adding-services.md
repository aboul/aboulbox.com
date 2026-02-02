# Ajouter un nouveau service Docker

Checklist :

1. Créer le service dans `docker-compose.yml`
2. Ajouter reverse_proxy dans Caddy
3. Ajouter Auth / Authelia si nécessaire
4. Ajouter Health Check dans Uptime Kuma
5. Ajouter entrée dans Docusaurus `/docs/services/mon_service.md`
6. Mettre à jour README et sidebars