Quick steps to run Postgres and export users

1) Start Postgres (uses Docker Compose):

```bash
cd backend
npm run db:up
```

This runs a local Postgres on port 5432 with DB `clinic_management` (user `postgres` / password `postgres`). Data is persisted to `backend/postgres-data`.

2) (Optional) Import schema if first run:

```bash
PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -d clinic_management -f ../database/schema.sql
```

3) Start backend server:

```bash
npm install
npm start
```

4) Register a test user (will be saved to DB if connection works):

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"emailOrPhone":"test@example.com","password":"secret1","confirmPassword":"secret1"}'
```

5) Export users to files (JSON + SQL):

```bash
npm run export:users
# results in backend/exports/users_<timestamp>.json and users_<timestamp>.sql
```

6) Stop Postgres when done:

```bash
npm run db:down
```

If you prefer not to use Docker, install Postgres locally (Postgres.app or Homebrew) and follow the `psql` commands above.
