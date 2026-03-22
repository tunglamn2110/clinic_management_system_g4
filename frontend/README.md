## Frontend Next.js

### Setup

1. Cài dependencies:

```bash
npm install
```

2. Tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

Biến `API_BASE_URL` dùng cho proxy auth server-side, có thể để `http://localhost:4000`.

3. Chạy development server:

```bash
npm run dev
```

### Routes

- `/` trang chủ
- `/login` đăng nhập
- `/signup` đăng ký
