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

## Déploiement Docker (stack locale, sans TLS)

Pour tester la stack complète en local (front + Strapi + Postgres) sans certificats TLS :

```bash
cp docker/.env.example docker/.env
# Remplir les secrets dans docker/.env (cf section ci-dessous)
cd docker
docker compose up -d --build
```

| Service    | Port exposé | Description                  |
|------------|-------------|------------------------------|
| Caddy      | -           | Pas utilisé en local         |
| PostgreSQL | interne     | Base de données              |
| Strapi     | 1337        | API + panneau d'admin        |
| Nginx      | 80          | Frontend Vue (SPA)           |

Variables `docker/.env` minimales pour le local :

```env
POSTGRES_USER=strapi
POSTGRES_PASSWORD=<mot_de_passe>
POSTGRES_DB=timoun_db
APP_KEYS=cle1,cle2,cle3,cle4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
VITE_API_URL=http://localhost:1337
CORS_ORIGINS=http://localhost
```

Pour générer les secrets : `openssl rand -base64 32`.

Premier admin Strapi : `http://localhost:1337/admin`.

---

## Déploiement en production (avec TLS et reverse-proxy)

La prod utilise un overlay `docker-compose.prod.yml` qui ajoute **Caddy** en frontal :

- TLS automatique via Let's Encrypt
- Reverse-proxy : `/api`, `/admin`, `/uploads`, `/_health`… → Strapi ; le reste → SPA Vue
- Front et Strapi ne sont **plus exposés sur l'hôte** : seuls les ports 80 et 443 (Caddy) sont ouverts vers l'extérieur

### Prérequis serveur

- VPS avec Docker + Docker Compose (≥ 2 GB RAM, 4-6 GB recommandés pour le build admin Strapi)
- Un nom de domaine pointant (A/AAAA) vers l'IP du VPS
- Firewall fermé sauf `22`, `80`, `443` (ex. `ufw allow 22,80,443/tcp`)

### Étapes

```bash
git clone <repo>
cd timoun-web

# Configurer les secrets et le domaine
cp docker/.env.example docker/.env
# Editer docker/.env :
#   - regenerer TOUS les secrets (openssl rand -base64 32)
#   - POSTGRES_PASSWORD = mot de passe fort
#   - CORS_ORIGINS=https://votre-domaine.fr
#   - VITE_API_URL=   (vide -> URLs relatives, meme domaine)
#   - DOMAIN=votre-domaine.fr
#   - ACME_EMAIL=admin@votre-domaine.fr

cd docker
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Caddy obtient automatiquement un certificat Let's Encrypt au premier démarrage (peut prendre 30s-1min). Les renouvellements sont automatiques.

### Premier admin Strapi en prod

Aller sur `https://votre-domaine.fr/admin` et créer le compte administrateur.

### Mise à jour du site en prod

```bash
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### Activer HSTS

Une fois certain que le TLS marche depuis ~1 semaine, décommenter la ligne `header Strict-Transport-Security ...` dans `docker/Caddyfile` et relancer Caddy. **Ne pas activer HSTS avant** : si le cert pose problème, les navigateurs refuseront toute connexion HTTP pendant 1 an.

### Sauvegardes

Cron quotidien recommandé sur l'hôte :

```bash
0 3 * * * docker exec timoun_postgres pg_dump -U strapi timoun_db | gzip > /backup/timoun-$(date +\%F).sql.gz
```

Puis synchroniser `/backup/` vers du stockage distant (S3, Backblaze B2, rsync sur un autre serveur).

### Arrêt / nettoyage

```bash
cd docker
docker compose -f docker-compose.yml -f docker-compose.prod.yml down       # arrete
docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v    # arrete + SUPPRIME les donnees (DB, uploads)
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