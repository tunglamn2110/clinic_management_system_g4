# Production deploy (local)

This project includes a production-ready Docker Compose configuration to run the frontend, backend and a Postgres database with an nginx reverse proxy.

Quick start (from repository root):

```bash
# copy or edit environment values as needed
cp .env.prod .env

# build and start services (detached)
docker compose -f docker-compose.prod.yml up --build -d

# view logs
docker compose -f docker-compose.prod.yml logs -f

# stop
docker compose -f docker-compose.prod.yml down
```

Notes:
- Frontend is served through an nginx reverse proxy on host port 80.
- API requests under `/api/*` are proxied to the backend service on port 4000.
- Configure sensitive values (e.g. `JWT_SECRET`, `DB_PASSWORD`) before starting in production.
- The seeded admin account is controlled by `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Troubleshooting:
- If the backend is not healthy, inspect `docker compose -f docker-compose.prod.yml logs backend`.
- For DB schema issues, ensure the DB volume has correct permissions and the `db` service can initialize.
