# Vue d'ensemble de la stack

## Services
- **[Caddy](Services/caddy)** : reverse proxy, TLS et routage des sous-domaines
- **[Authelia](Services/authelia)** : authentification OIDC, reverse_auth
  - **[DB Authelia](Services/database.md)** : base de données Postgres pour Authelia
  - **[Redis Authelia](Services/redis)** : redis pour Authelia
- **[Webite](Services/website)** : site web principal (framework Astro)
- **[Umami](Services/umami)** : analytics pour site web principtal
- **[Backend](Services/backend)** : endpoint pour formulaire de contact (expressJS)
- **[Directus](Services/directusd)** : CMS / backend
- **[Immich](Services/immmich)** : service photos
  - **[Redis](Services/redis)** : pour Immich
- **[Navidrome](Services/navidrome)** : musique
- **[Docusaurus](Services/docusaurus)** : documentation
- **[Homepage](Services/homepage)** : dashboard d'accueil
- **[Glances](Services/glances)** : monitoring simple
- **[Database](Services/database)** : base de donnée Postgres pour Umami, Immich, Directus / Backend

## Schéma réseau

```mermaid 
flowchart TD
  %%{init: {
    "themeVariables": {
      "fontSize": "32px"
    }
  }}%%
  %% ===== User =====
  User["Utilisateur / Clients"]

  %% ===== Edge =====
  subgraph EDGE["Edge"]
    Caddy["Caddy<br/>Reverse Proxy<br/>TLS / Routing"]
  end

  %% ===== Auth =====
  subgraph AUTH["Auth & Identity"]
    Authelia["Authelia<br/>(OIDC / Forward Auth)"]
    AutheliaRedis["Redis<br/>(Sessions)"]
    AutheliaDB["PostgreSQL"]
  end

  %% ===== Applications =====
  subgraph APPS["Applications"]
    Website["Website<br/>(Astro)"]
    Backend["Backend<br/>(ExpressJS)"]
    Immich["Immich<br/>(Photos)"]
    Directus["Directus<br/>(CMS / Admin)"]
    Navidrome["Navidrome<br/>(Music)"]
    Umami["Umami<br/>(Analytics)"]
    Docusaurus["Docusaurus<br/>(Docs)"]
    Homepage["Homepage<br/>(Dashboard)"]
    Glances["Glances"]
  end

  %% ===== Data Layer =====
  subgraph DATA["Data Layer"]
    Postgres["PostgreSQL<br/>(single service)"]

    subgraph DBS["Databases"]
      DB_Immich["immich"]
      DB_Umami["umami"]
      DB_Main["backend<br/>(directus + backend)"]
    end
  end

  %% ===== Flows =====
  User --> EDGE

  EDGE <-- "forward_auth" --> AUTH
  EDGE --> APPS

  Authelia --> AutheliaRedis
  Authelia --> AutheliaDB

  AUTH <-- "OIDC" --> Immich
  AUTH <-- "OIDC" --> Directus

  Immich --> DB_Immich
  Directus --> DB_Main
  Backend --> DB_Main
  Umami --> DB_Umami

  DB_Immich --> Postgres
  DB_Umami --> Postgres
  DB_Main --> Postgres

  %% ===== Styles =====
  classDef user fill:#F6B26B,stroke:#000,color:#000;
  classDef proxy fill:#FFD966,stroke:#000,color:#000;
  classDef auth fill:#6FA8DC,stroke:#000,color:#000;
  classDef app fill:#93C47D,stroke:#000,color:#000;
  classDef media fill:#E06666,stroke:#000,color:#fff;
  classDef doc fill:#C27BA0,stroke:#000,color:#fff;
  classDef analytics fill:#8E7CC3,stroke:#000,color:#fff;
  classDef infra fill:#999999,stroke:#000,color:#fff;
  classDef db fill:#444444,stroke:#000,color:#fff;

  class User user
  class Caddy proxy
  class Authelia auth
  class AutheliaRedis infra
  class AutheliaDB infra
  class Website app
  class Backend app
  class Immich media
  class Directus app
  class Navidrome media
  class Umami analytics
  class Docusaurus doc
  class Homepage app
  class Postgres infra
  class DB_Immich,DB_Umami,DB_Main db
  class Glances infra

```