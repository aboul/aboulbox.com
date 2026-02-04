# Vue d'ensemble de la stack

## Services
- **[Caddy](Services/caddy)** : reverse proxy, TLS et routage des sous-domaines
- **[Authelia](Services/authelia)** : authentification OIDC, reverse_auth
  - **[DB Authelia](Services/database)** : base de données Postgres pour Authelia
  - **[Redis Authelia](Services/redis)** : redis pour Authelia
- **[Webite](Services/website)** : site web principal (framework Astro)
- **[Umami](Services/umami)** : analytics pour site web principtal
- **[Backend](Services/backend)** : endpoint pour formulaire de contact (expressJS)
- **[Directus](Services/directus)** : CMS / backend
- **[Immich](Services/immich)** : service photos
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
      "fontSize": "38px"
    },
    "flowchart": {
      "curve": "linear"
    }
  }}%%
  %% ===== User =====
  User["Utilisateur&nbsp;/&nbsp;Clients"]

  %% ===== Proxy =====
  PROXY["Caddy<br/>Reverse&nbsp;Proxy<br/>TLS&nbsp;/&nbsp;Routing"]

  User --> PROXY

  %% ===== Auth =====
  subgraph AUTH["Auth&nbsp;&&nbsp;OIDC"]
    Authelia["Authelia<br/>(OIDC&nbsp;/&nbsp;Forward&nbsp;Auth)"]
    AutheliaRedis["Redis<br/>(Sessions)"]
    AutheliaDB["PostgreSQL"]
  end

  PROXY <-- "forward_auth" --> AUTH

  %% ===== Applications =====
  subgraph APPS["Applications"]
    subgraph Padding[" "]
      Website["Website<br/>(Astro)"]
      Backend["Backend<br/>(ExpressJS)"]
      Immich["Immich"]
      Directus["Directus<br/>(Admin)"]
      Navidrome["Navidrome<br/>(Music)"]
      Umami["Umami<br/>(Analytics)"]
      Docusaurus["Docusaurus<br/>(Docs)"]
      Homepage["Homepage<br/>(Dashboard)"]
      Glances["Glances"]
    end
  end

  %% ===== Data Layer =====
  subgraph DATA["Data Layer"]
    subgraph PaddingDataLayer[" "]
      Redis["Redis"]
      subgraph DBS["Databases"]
        subgraph PaddingDatabase[" "]
        DB_Immich["immich"]
        DB_Umami["umami"]
        DB_Main["backend<br/> "]
        end 
      end
      Postgres["PostgreSQL<br/>(single service)"]
    end
  end

  %% ===== Flows =====


  PROXY --> APPS

  Authelia --> AutheliaRedis
  Authelia --> AutheliaDB

  AUTH <-- "OIDC" --> Immich
  AUTH <-- "OIDC" --> Directus

  Immich --> DB_Immich
  Immich --> Redis
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
  classDef padding fill:none,stroke:none;
  classDef monitoring fill:#8E7CC3,stroke:#000,color:#fff;

  class User user
  class PROXY proxy
  class Authelia auth
  class AutheliaRedis infra
  class AutheliaDB infra
  class Website app
  class Backend app
  class Immich media
  class ImmichApp app
  class ImmichRedis infra
  class Directus app
  class Navidrome media
  class Umami analytics
  class Docusaurus doc
  class Homepage app
  class Postgres infra
  class DB_Immich,DB_Umami,DB_Main db
  class Glances monitoring
  class Redis infra
  class Padding padding
  class PaddingDataLayer padding
  class PaddingDatabase padding

```