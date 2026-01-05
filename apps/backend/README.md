# Cooking Sparkles – Documentation de l’API

## URL de base

```
http://localhost:5000/api
```

---

## Authentification

Certaines routes sont protégées et nécessitent un token JWT.

Le token doit être envoyé dans le header :

```
Authorization: Bearer <token>
```

---

## Routes Authentification

### POST /auth/signup

Créer un compte utilisateur.

### POST /auth/login

Connexion de l’utilisateur et génération d’un token JWT.

### GET /auth/me

Récupérer les informations de l’utilisateur connecté.

### PUT /auth/me

Mettre à jour le profil de l’utilisateur.

### DELETE /auth/me

Supprimer son compte.

### GET /auth/admin (admin)

Récupérer la liste de tous les utilisateurs.

---

## Routes Articles

### GET /articles

Récupérer tous les articles.

### GET /articles/published

Récupérer uniquement les articles publiés (public).

### GET /articles/:id

Récupérer un article par son identifiant.

### GET /articles/me

Récupérer les articles de l’utilisateur connecté.

### POST /articles

Créer un nouvel article.

### PUT /articles/:id (propriétaire ou admin)

Modifier un article.

### DELETE /articles/:id (propriétaire ou admin)

Supprimer un article.

### PATCH /articles/:id/publish

Publier un article.

### PATCH /articles/:id/unpublish

Dépublier un article.

---

## Routes Commentaires (par article)

### GET /articles/:articleId/comments

Récupérer tous les commentaires d’un article.

### GET /articles/:articleId/comments/approved

Récupérer uniquement les commentaires approuvés.

### POST /articles/:articleId/comments

Ajouter un commentaire à un article.

### DELETE /articles/:articleId/comments (admin)

Supprimer tous les commentaires liés à un article.

---

## Routes Commentaires (standalone)

### GET /comments (admin)

Récupérer tous les commentaires.

### GET /comments/:id

Récupérer un commentaire par son ID.

### PUT /comments/:id (propriétaire)

Modifier un commentaire.

### DELETE /comments/:id (propriétaire)

Supprimer un commentaire.

### PATCH /comments/:id/approved (admin)

Approuver un commentaire.

### PATCH /comments/:id/report

Signaler un commentaire.
