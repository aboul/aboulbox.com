# Déploiement

J'utilise Komodo à la fois pour mon environnement de développement et mon environnement de production pour plus de simplicité et pour pouvoir tester ma stack en local facilement.
Prenons la stack prod sur Komodo :

- 1 Repos : aboul/aboulbox.com
- 1 Service = 1 Stack
- 1 Procédure pour la prod

## Production

### Push --\> Github Webhooks --\> Komodo

Chaque push sur mon repo github déclenche une procédure Komodo.

```mermaid

flowchart TD

  %% ===== Github Event =====
  subgraph EVENT["Développement"]
    A@{ shape: rounded, label: "Git Push<br />(branch main)" }
  end

  %% ===== Github Webhook =====
  webhook(["Github Webhook"])

  %% ===== Komodo =====
  subgraph KOMODO["Komodo"]
    direction LR
    PROCEDURE
    STACK
  end

  %% ===== Procedure =====
  push(["Pull Repositiry"])
  redeploy(["Redeploy docker stack"])
  redeploy2(["Redeploy docker Caddy"])
  subgraph PROCEDURE["Procédure"]
    direction TB
    push --> redeploy --> redeploy2
    redeploy --> STACK
    redeploy2 --> STACK
  end

  %% ===== Stacks =====
  compose(["docker compose files"])
  env(["Create .env file"])
  build(["Build / Start stack"])
  subgraph STACK["Stack"]
    direction TB
    compose --> build
    env --> build
  end

  %% ===== Flows =====
  EVENT --> webhook --> KOMODO
```
