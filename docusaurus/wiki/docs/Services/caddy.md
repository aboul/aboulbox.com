---
description: Reverse Proxy
---

# Caddy

## Rôle dans la stack

Caddy est le **reverse proxy central** de la stack. Il est responsable de :

- l'exposition des services via des sous-domaines
- la gestion automatique des certificats TLS
- le routage HTTP/HTTPS
- l'intégration avec **Authelia** pour l'authentification (forward-auth)
- certaines règles de sécurité de base (headers, robots, etc.)

Il constitue le **point d'entrée unique** vers tous les services exposés publiquement.

---

## Position dans l'architecture

```
Internet
   │
   ▼
Caddy (TLS, routing)
   │
   ├─► Authelia (auth / authorization)
   └─► Services internes (Umami, Directus, Immich, Docusaurus, etc.)
```

Tous les services HTTP passent **obligatoirement** par Caddy.

---

## Responsabilités principales

### Reverse Proxy

Caddy route les requêtes entrantes vers les bons services Docker en fonction du nom de domaine :

- `example.com` → site principal (Astro)
- `wiki.example.com` → Docusaurus
- `photo.example.com` → Immich
- `admin.example.com` → Directus
- etc.

Chaque service est accessible uniquement via son sous-domaine.

---

### TLS automatique

Caddy gère automatiquement :

- la génération des certificats TLS
- le renouvellement
- le stockage

Aucune gestion manuelle de certificats n'est nécessaire côté services.

---

### Authentification avec Authelia

Pour les services protégés, Caddy utilise le module **forward_auth** vers Authelia via un snippet Caddy:

```caddy
(secure) {
  forward_auth {args[0]} authelia:9091 {
    uri /api/authz/forward-auth
    copy_headers Remote-User Remote-Groups Remote-Name Remote-Email
  }
}

https://home.{$SERVER_NAME} {
  import secure * # Securise tout le sous-domaine
  ...
}
```

Cela permet :

- l'authentification centralisée (OIDC / session)
- la gestion fine des accès par service
- l'exclusion de certaines routes publiques (ex: `/script.js` pour Umami)

---

### Gestion des routes publiques

Certaines routes doivent rester accessibles sans authentification (ex: assets, endpoints publics).

Exemple :

```caddy
https://umami.{$SERVER_NAME} {
  @needAuth not {
    path <path1> <path2>
  }
  import secure @needAuth # Bypass certaines routes qui ont besoin d'un accès public
  ...

  reverse_proxy <service>:<post>
}
```

Ce mécanisme est utilisé notamment pour :

- Umami (`/script.js`, `/api/send`)
- Webhooks publics
- endpoints techniques

---

### Sécurité et bonnes pratiques

Caddy applique également :

- des headers HTTP communs
- des règles `no-robots` pour les services internes
- une séparation stricte entre services publics et privés

Ces règles sont factorisées via des snippets importés :

```caddy
import main
import no-robots
```

---

## Intégration Docker

### Réseau

Caddy est connecté au réseau Docker `proxy-network`, partagé avec les services exposés.

Cela permet :

- un routage interne par nom de service Docker
- aucune exposition directe des ports internes

---

### Ports exposés

Caddy est le seul service exposant (hors `db` pour des questions de debug) :

- `80` (HTTP)
- `443` (HTTPS)

Tous les autres services restent isolés du réseau externe.

---

## Avantages de ce setup

- Un seul point d'entrée
- TLS automatique et fiable
- Authentification centralisée
- Stack lisible et maintenable
- Très faible complexité côté services

---

## Points d'attention

- Toute erreur dans le `Caddyfile` peut impacter plusieurs services
- Caddy est un composant critique (single point of failure)
- Les règles d'authentification doivent être testées avec soin

---

## Améliorations possibles

- Ajout de rate limiting
- Monitoring spécifique de Caddy (metrics)
- Logs centralisés
- Backups du storage TLS

---

## Résumé

Caddy est la **colonne vertébrale HTTP** de la stack.

Il simplifie fortement :

- la sécurité
- la gestion TLS
- l'exposition des services

Tout en restant léger, lisible et très bien intégré à Docker et Authelia.

## Caddyfile – Conventions du repository

Cette stack utilise une organisation stricte du **Caddyfile** afin de rester lisible, maintenable et cohérente entre les environnements (dev / prod).

### Principes généraux

- **Un sous-domaine = un bloc Caddy**
- Les règles communes sont **factorisées via des snippets** (`import`)
- L’authentification Authelia est **opt‑in** (activée uniquement là où nécessaire)
- Le Caddyfile est pensé pour être **lisible dans un repo public** (pas de secrets en dur)

---

### Structure globale

```caddyfile
{
  {$CADDY_GLOBAL_OPTIONS}
}

# Snippets partagés
(main) {
  # headers communs
}

(no-robots) {
  header X-Robots-Tag "noindex, nofollow"
}

(authelia-auth) {
  forward_auth authelia:9091 {
    uri /api/authz/forward-auth
    copy_headers Remote-User Remote-Groups Remote-Name Remote-Email
  }
}
```

---

### Convention par service

Chaque service suit ce pattern :

```caddyfile
https://service.{$SERVER_NAME} {
  import main

  # Auth (si nécessaire)
  import authelia-auth <path>

  reverse_proxy <service>:<port>
}
```
