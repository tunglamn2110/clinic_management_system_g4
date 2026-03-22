## Backend API

### Setup

1. Cài dependencies:

```bash
npm install
```

2. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

3. Cập nhật thông tin PostgreSQL trong `.env`.

4. Chạy server:

```bash
npm run dev
```

### API

- `GET /api/health`
- `GET /api/homepage-data`
- `POST /api/auth/signup`
- `POST /api/auth/login`
