---
description: Site web principal
---

# Website

- URL: `https://{$SERVER_NAME}`
- Auth: `Public`
- Framework: `Astro`
- Docker volume: voir ci-dessous

## Fonctionnement

Au démarrage de la stack, le service `website` build les sources dans un volume partagé avec `Caddy`.

`Caddy` sert le site en static depuis ce volume (`file_server`).

```caddy
https://{$SERVER_NAME} {
  import main-log
  import security
  import static
  encode zstd gzip

  # Handle API requests
  handle /api* {
    reverse_proxy backend:3001
  }

  root * /srv/site/current
  try_files {path} {path}.html

  handle /404* {
    root * /srv/site/current
    file_server {
      status 404
    }
  }

  handle {
    file_server {
      hide .*
    }
  }

  handle_errors {
    @404 {
      expression {http.error.status_code} == 404
    }
    rewrite @404 /404.html
    file_server
  }
}
```

## Subtilité

J'ai développé un [plugin vite/astro](https://github.com/aboul/vite-plugin-rolling-release) qui fait un roulement de release à chaque build.
Le dossier de build change à chaque fois avec le `timestamp` courant, ce qui donne :

- build dans le dossier `/dest/release_<current_timestamp>`
- crée un symlink de `/dest/current` vers le nouveau build
- Caddy sert toujours `/dest/current`

### Pourquoi ?

- Ça me permets de revenir en arrière en change le symlink.
- Je garde quelques releases sous le coude
- Pas de downtime (pour l'instant c'est pas vraiment le cas puisque je redémarre systématique Caddy)
