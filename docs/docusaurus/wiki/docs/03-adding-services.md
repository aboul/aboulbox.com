# Ajouter un nouveau service Docker

Checklist :

1. Créer le service `service_name` dans `docker-compose.yml`
2. Ajouter reverse_proxy dans Caddy
3. Ajouter Auth / Authelia si nécessaire
4. Ajouter entrée dans Docusaurus `/docs/services/service_name.md`
5. Mettre à jour `Stack Overview` avec le lien vers la doc du service
6. Ajouter la stack dans Komodo 

## Ajouter la stack dans Komodo : 

Format des noms de stacks : `<env>_<service_type>_<service_name>` 
  - `<env>` : `dev | prod`
  - `<service_type>` : `apps | infra | docs`