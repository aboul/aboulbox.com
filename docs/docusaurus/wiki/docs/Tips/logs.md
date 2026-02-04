# 🔍 Cheatsheet `jq` – Logs Caddy & Authelia

Ce document liste les commandes `jq` les plus utiles pour analyser rapidement les logs **JSON** de **Caddy** et **Authelia** depuis le terminal.

---

## 📦 Pré-requis

```bash
sudo apt install jq
```

---

## 🧭 Caddy – `/var/log/caddy/access.log`

### 🔹 Afficher toutes les requêtes HTTP

```bash
jq '.' /var/log/caddy/access.log
```

### 🔹 Filtrer les erreurs HTTP (4xx / 5xx)

```bash
jq 'select(.status >= 400)' /var/log/caddy/access.log
```

### 🔹 Voir uniquement les 401 / 403 (auth / accès refusé)

```bash
jq 'select(.status == 401 or .status == 403)' /var/log/caddy/access.log
```

### 🔹 IPs qui génèrent le plus d’erreurs

```bash
jq -r 'select(.status >= 400) | .request.remote_ip' /var/log/caddy/access.log \
| sort | uniq -c | sort -nr | head
```

### 🔹 Voir les requêtes lentes (> 1 seconde)

```bash
jq 'select(.duration > 1)' /var/log/caddy/access.log
```

### 🔹 Voir les routes les plus appelées

```bash
jq -r '.request.uri' /var/log/caddy/access.log \
| sort | uniq -c | sort -nr | head
```

### 🔹 Suivre les logs en temps réel

```bash
tail -f /var/log/caddy/access.log | jq '.status'
```

### 🔹 Voir les requêtes vers Authelia uniquement

```bash
jq 'select(.request.uri | contains("/api/authz"))' /var/log/caddy/access.log
```

---

## 🔐 Authelia – `/var/log/authelia/authelia.log`

### 🔹 Afficher tous les logs

```bash
jq '.' /var/log/authelia/authelia.log
```

### 🔹 Voir uniquement les erreurs

```bash
jq 'select(.level == "error")' /var/log/authelia/authelia.log
```


### 🔹 Voir les tentatives d’authentification échouées

```bash
jq 'select(.message | contains("Authentication failed"))' /var/log/authelia/authelia.log
```

### 🔹 Voir les échecs MFA / second facteur

```bash
jq 'select(.message | contains("Second factor"))' /var/log/authelia/authelia.log
```

### 🔹 Voir les erreurs OIDC

```bash
jq 'select(.message | contains("OIDC"))' /var/log/authelia/authelia.log
```

### 🔹 Voir les erreurs par utilisateur

```bash
jq -r 'select(.level=="error") | .message' /var/log/authelia/authelia.log \
| sort | uniq -c | sort -nr
```

### 🔹 Suivre les logs Authelia en temps réel

```bash
tail -f /var/log/authelia/authelia.log | jq '.message'
```

---

## 🧠 Combinaisons utiles

### 🔹 Logs récents (dernières 100 lignes)

```bash
tail -n 100 /var/log/caddy/access.log | jq '.'
```


### 🔹 IP + route + status (Caddy)

```bash
jq -r '[.request.remote_ip, .request.uri, .status] | @tsv' /var/log/caddy/access.log
```


### 🔹 Tentatives d’auth par IP (Authelia)

```bash
jq -r 'select(.message | contains("Authentication")) | .remote_ip' /var/log/authelia/authelia.log \
| sort | uniq -c | sort -nr
```

---

## 💡 Astuce bonus

```bash
jq '.' | less
```
