# Projet full-stack MERN structuré en **monorepo** avec :

- `apps/backend` → API Node.js / Express
- `apps/frontend` → Frontend React (Vite)
- `docker/` → Configuration Docker & Docker Compose

Le projet peut être lancé **avec Docker** ou **sans Docker (localement)**.

## Prérequis

### Avec Docker (recommandé)

- Docker
- Docker Compose (inclus avec Docker Desktop)

Vérification :

```bash
docker -v
docker compose version
```

### Sans Docker (local)

- Node.js ≥ 18
- npm ou pnpm
- MongoDB installé localement

Vérification :

```bash
node -v
npm -v
mongod --version
```

---

## 🐳 Lancer le projet avec Docker

Depuis le dossier `docker/` :

```bash
docker compose up --build
```

Accès aux services :

- Frontend → [http://localhost:5173](http://localhost:5173)
- Backend → [http://localhost:5001](http://localhost:5001)
- MongoDB → localhost:27017

Arrêter les conteneurs :

```bash
docker compose down
```

---

## Logs utiles (Docker)

```bash
docker logs mern-frontend
docker logs mern-backend
docker logs mern-mongo
```

---

## Lancer le projet sans Docker (local)

### Démarrer MongoDB

```bash
mongod
```

---

### Lancer le backend

```bash
cd apps/backend
npm install      # ou pnpm install
npm run dev      # ou pnpm dev
```

API accessible sur :

```text
http://localhost:5001
```

---

### Lancer le frontend

```bash
cd apps/frontend
npm install      # ou pnpm install
npm run dev      # ou pnpm dev
```

Frontend accessible sur :

```
http://localhost:5173
```

---

## Variables d’environnement

### Backend

Créer `apps/backend/.env` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern
```

---

### Frontend

Créer `apps/frontend/.env` :

```env
VITE_API_URL=http://localhost:5001
```

---

## Notes importantes

### Docker & Vite

- Vite doit écouter sur `0.0.0.0` pour fonctionner dans Docker
- Le projet est configuré avec `vite --host`

### Communication Frontend → Backend

- En mode **local** :

  ```env
  VITE_API_URL=http://localhost:5001
  ```

- En mode **Docker** :

  ```env
  VITE_API_URL=http://backend:5000
  ```

## Stack technique

- MongoDB
- Express
- React (Vite)
- Node.js
- Docker & Docker Compose
