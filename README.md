# timoun-web

Application web full-stack pour l'association Timoun. Le frontend est en **Vue 3 + Vite**, le backend est un CMS headless **Strapi v5** avec une base de données **PostgreSQL**.

```
timoun-web/
├── timoun-front/   # Frontend Vue 3
├── timoun-back/    # Backend Strapi v5
├── docker/         # Dockerfiles + docker-compose de prod
├── db/             # docker-compose PostgreSQL seul (dev local)
└── maquette/       # Maquettes HTML/CSS de référence
```

---

## Prérequis

- [Node.js](https://nodejs.org/) >= 20 (recommandé : 22)
- [npm](https://www.npmjs.com/) >= 6
- [Docker](https://www.docker.com/) + Docker Compose (pour la prod ou la base de données locale)

---

## Développement local

### 1. Variables d'environnement

**Backend** — copier et remplir :

```bash
cp timoun-back/.env.example timoun-back/.env
```

Les clés de sécurité Strapi peuvent être générées avec :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Exemple de `.env` backend :

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="cle1,cle2,cle3,cle4"
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
```

**Frontend** — copier et remplir :

```bash
cp timoun-front/.env.example timoun-front/.env
```

```env
VITE_API_URL=http://localhost:1337
```

---

### 2. Lancer la base de données PostgreSQL

```bash
cd db
docker compose up -d
```

Cela démarre un PostgreSQL sur le port **5432** avec les identifiants par défaut (`strapi` / `strapi`, base `timoun_db`).

> Alternativement, Strapi peut fonctionner avec SQLite en développement — modifier `timoun-back/config/database.ts` en conséquence.

---

### 3. Lancer le backend (Strapi)

```bash
cd timoun-back
npm install
npm run develop
```

Strapi démarre sur **http://localhost:1337**.

- Au premier lancement, les migrations sont appliquées et les données de seed sont insérées automatiquement.
- Le panneau d'administration est accessible sur **http://localhost:1337/admin**.

---

### 4. Lancer le frontend (Vue 3)

```bash
cd timoun-front
npm install
npm run dev
```

L'application démarre sur **http://localhost:5173** (port Vite par défaut).

---

## Déploiement avec Docker

Toute la stack (PostgreSQL, Strapi, Nginx + frontend) est gérée par le `docker-compose.yml` dans le dossier `docker/`.

### 1. Configurer les variables d'environnement

```bash
cp docker/.env.example docker/.env
```

Remplir **toutes** les valeurs dans `docker/.env` :

```env
# Base de données
POSTGRES_USER=strapi
POSTGRES_PASSWORD=<mot_de_passe_fort>
POSTGRES_DB=timoun_db

# Sécurité Strapi (générer des valeurs aléatoires)
APP_KEYS=cle1base64,cle2base64,cle3base64,cle4base64
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=

# URL publique de l'API (utilisée par le build du frontend)
VITE_API_URL=https://votre-domaine.com/api
```

### 2. Construire et démarrer

```bash
cd docker
docker compose up -d --build
```

| Service    | Port exposé | Description                  |
|------------|-------------|------------------------------|
| PostgreSQL | interne     | Base de données               |
| Strapi     | 1337        | API + panneau d'administration|
| Nginx      | 80          | Frontend Vue (SPA)            |

### 3. Premier démarrage

Strapi applique les migrations et insère les données de seed automatiquement au démarrage.

Pour créer le premier compte administrateur Strapi, se connecter sur **http://votre-serveur:1337/admin**.

### 4. Arrêter la stack

```bash
cd docker
docker compose down
```

Pour supprimer les volumes (données) :

```bash
docker compose down -v
```

---

## Pages de l'application

| Route                    | Page                        |
|--------------------------|-----------------------------|
| `/`                      | Accueil                     |
| `/qui-sommes-nous`       | Qui sommes-nous             |
| `/notre-action`          | Notre action                |
| `/le-village`            | Le village                  |
| `/galerie`               | Galerie                     |
| `/articles`              | Liste des articles          |
| `/articles/:id`          | Détail d'un article         |
| `/evenements`            | Liste des événements        |
| `/evenements/:id`        | Détail d'un événement       |
| `/contact`               | Contact                     |

---

## Scripts utiles

### Frontend

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production
npm run preview   # Prévisualiser le build de production
```

### Backend

```bash
npm run develop   # Mode développement (hot reload)
npm run build     # Build du panneau d'administration
npm run start     # Mode production
npm run console   # Console Strapi interactive
npm run upgrade   # Mettre à jour Strapi
```

---

## Types de contenu Strapi

| Collection  | Description         | Accès public |
|-------------|---------------------|--------------|
| `article`   | Articles de blog    | Lecture (find, findOne) |
| `evenement` | Événements          | Lecture (find, findOne) |

Les permissions publiques sont configurées automatiquement au seed.