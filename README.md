# Projet full-stack MERN structuré en **monorepo** avec :

- `apps/backend` → API Node.js / Express
- `apps/frontend` → Frontend React (Vite)
- `docker/` → Configuration Docker & Docker Compose

Le projet doit être lancé **avec Docker**

## Prérequis

- Docker Desktop
- Docker Compose
- MongoDB Compass

Vérification :

```bash
docker -v
docker compose version
```

## Lancer le projet

Depuis le dossier `docker/` :

```bash
docker compose up --build
```

Accès aux services :

- Frontend → [http://localhost:5173](http://localhost:5173)
- Backend → [http://localhost:5001](http://localhost:5001)
- MongoDB → URI mongodb://localhost:27017/cooking-sparkles

Arrêter les conteneurs :

```bash
docker compose down
```

## Stack technique

- MongoDB
- Express
- React (Vite)
- Node.js
- Docker & Docker Compose
- Tailwind.css
