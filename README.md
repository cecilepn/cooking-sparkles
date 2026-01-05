# A PROPOS

Cooking sparkles est un blog de recettes de cuisine. Il s'agit d'un projet étudiant dans le cadre du module FRAMEWORK JS encadré par M.ADDI Mostapha-Bachir à l'ECV de PARIS.

# Projet full-stack MERN structuré en **monorepo** avec :

- `apps/backend` → API Node.js / Express
- `apps/frontend` → Frontend React (Vite)
- `docker/` → Configuration Docker & Docker Compose

Le projet doit être lancé **avec Docker**

## Prérequis

- Cloner le repo : https://github.com/cecilepn/cooking-sparkles.git
- Docker Desktop : https://docs.docker.com/desktop/setup/install/mac-install/
- Docker Compose : https://docs.docker.com/compose/install
- MongoDB Compass : https://www.mongodb.com/try/download/compass

Vérification :

```bash
docker -v
docker compose version
```

- fichiers .env à jour

## Lancer le projet

Depuis le dossier `docker/` :

```bash
cd docker
docker compose up --build
```

Accès aux services :

- Frontend → [http://localhost:5173](http://localhost:5173)
- Backend → [http://localhost:5000](http://localhost:5000)
- MongoDB → depuis MongoDB compass, URI mongodb://localhost:27017/cooking-sparkles

Arrêter les conteneurs :

```bash
cd docker
ctrl c ou cmd c
docker compose down
```

## Stack technique

- MongoDB
- Express
- React (Vite)
- Node.js
- Docker & Docker Compose
- Tailwind.css

## Cas possible d'erreurs :

- S'assurer d'avoir les fichiers .env dans les dossiers suivants : docker/, apps/backend/, apps/frontend/

- Si le FRONTEND rencontre l'erreur suivante : "cannot replace to directory /var/lib/docker/overlay2...."
  => S'assurer de bien supprimer les apps/frontend/node_modules

- Si au moment du docker build, l'erreur suivante :

```bash
[dotenv@17.2.3] injecting env (0) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`

MongoDB deconnected

Error connection to MongoDB :

Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"

[nodemon] app crashed - waiting for file changes before starting...
```

=> Absence du fichier docker/.env
