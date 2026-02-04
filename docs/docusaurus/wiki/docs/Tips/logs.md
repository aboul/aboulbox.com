# 🔍 Cheatsheet `jq` – Logs Caddy & Authelia

Ce document liste les commandes `jq` les plus utiles pour analyser rapidement les logs **JSON** de **Caddy** et **Authelia** depuis le terminal.

---

## 📦 Pré-requis

```bash
sudo apt install jq
```

---

## 🧭 Caddy – `/var/log/caddy/access.json`

### 🔹 Afficher toutes les requêtes HTTP

```bash
jq '.' /var/log/caddy/access.json
```

### 🔹 Filtrer les erreurs HTTP (4xx / 5xx)

```bash
jq 'select(.status >= 400)' /var/log/caddy/access.json
```

### 🔹 Voir uniquement les 401 / 403 (auth / accès refusé)

```bash
jq 'select(.status == 401 or .status == 403)' /var/log/caddy/access.json
```

### 🔹 IPs qui génèrent le plus d’erreurs

```bash
jq -r 'select(.status >= 400) | .request.remote_ip' /var/log/caddy/access.json \
| sort | uniq -c | sort -nr | head
```

### 🔹 Voir les requêtes lentes (> 1 seconde)

```bash
jq 'select(.duration > 1)' /var/log/caddy/access.json
```

### 🔹 Voir les routes les plus appelées

```bash
jq -r '.request.uri' /var/log/caddy/access.json \
| sort | uniq -c | sort -nr | head
```

### 🔹 Suivre les logs en temps réel

```bash
tail -f /var/log/caddy/access.json | jq '.status'
```

### 🔹 Voir les requêtes vers Authelia uniquement

```bash
jq 'select(.request.uri | contains("/api/authz"))' /var/log/caddy/access.json
```

---

## 🔐 Authelia – `/var/log/authelia/authelia.json`

### 🔹 Afficher tous les logs

```bash
jq '.' /var/log/authelia/authelia.json
```

### 🔹 Voir uniquement les erreurs

```bash
jq 'select(.level == "error")' /var/log/authelia/authelia.json
```

### 🔹 Voir les tentatives d’authentification échouées

```bash
jq 'select(.msg | contains("Authentication failed"))' /var/log/authelia/authelia.json
```

### 🔹 Voir les échecs MFA / second facteur

```bash
jq 'select(.msg | contains("Second factor"))' /var/log/authelia/authelia.json
```

### 🔹 Voir les erreurs OIDC

```bash
jq 'select(.msg | contains("OIDC"))' /var/log/authelia/authelia.json
```

### 🔹 Voir les erreurs par utilisateur

```bash
jq -r 'select(.level=="error") | .message' /var/log/authelia/authelia.json \
| sort | uniq -c | sort -nr
```

### 🔹 Suivre les logs Authelia en temps réel

```bash
tail -f /var/log/authelia/authelia.json | jq '.message'
```

---

## 🧠 Combinaisons utiles

### 🔹 Logs récents (dernières 100 lignes)

```bash
tail -n 100 /var/log/caddy/access.json | jq '.'
```

### 🔹 IP + route + status (Caddy)

```bash
jq -r '[.request.remote_ip, .request.uri, .status] | @tsv' /var/log/caddy/access.json
```

### 🔹 Tentatives d’auth par IP (Authelia)

```bash
jq -r 'select(.msg | contains("Authentication")) | .remote_ip' /var/log/authelia/authelia.json \
| sort | uniq -c | sort -nr
```

---

## 💡 Astuce bonus

```bash
jq '.' | less
```
