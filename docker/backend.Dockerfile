FROM node:22.12.0

# Créer dossier app
WORKDIR /app

# Installer pnpm globalement
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copier uniquement le manifest pour réduire le cache
COPY package.json pnpm-lock.yaml ./

# Installer les deps backend
RUN pnpm install

# Copier le code source
COPY . .

# Exposer le port du backend
EXPOSE 5000

# Lancer le serveur (modifie si tu uses nodemon)
CMD ["pnpm", "dev"]