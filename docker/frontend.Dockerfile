FROM node:22.12.0

WORKDIR /app

# Installer pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copier uniquement les manifests
COPY package.json pnpm-lock.yaml ./

# Installer deps
RUN pnpm install

# Copier le reste du projet
COPY . .

# Port par défaut de Vite
EXPOSE 5173

# Lancer Vite en mode dev
CMD ["pnpm", "dev", "--host"]
