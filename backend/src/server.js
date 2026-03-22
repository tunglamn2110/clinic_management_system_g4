const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const jwtSecret = process.env.JWT_SECRET || "elysian-dev-secret";
let useInMemoryStore = false;
let memoryUsers = [];
let memoryUserId = 1;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "clinic_management",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres"
});

app.use(cors());
app.use(express.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUserTableSql = `
CREATE TABLE IF NOT EXISTS app_user (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createBookingsTableSql = `
CREATE TABLE IF NOT EXISTS bookings (
  booking_id SERIAL PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  specialist VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createServicesTableSql = `
CREATE TABLE IF NOT EXISTS services (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_money BIGINT DEFAULT 0,
  duration_minutes INTEGER DEFAULT 60,
  category VARCHAR(80),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function findUserByIdentity(email, phone) {
  if (useInMemoryStore) {
    if (email) {
      return memoryUsers.find((user) => user.email === email) || null;
    }
    return memoryUsers.find((user) => user.phone === phone) || null;
  }

  const found = email
    ? await pool.query(
        "SELECT user_id, email, phone, password_hash, is_admin FROM app_user WHERE email = $1 LIMIT 1",
        [email]
      )
    : await pool.query(
        "SELECT user_id, email, phone, password_hash, is_admin FROM app_user WHERE phone = $1 LIMIT 1",
        [phone]
      );
  return found.rowCount === 0 ? null : found.rows[0];
}

async function createUser(email, phone, passwordHash, isAdmin = false) {
  if (useInMemoryStore) {
    const user = {
      user_id: memoryUserId,
      email,
      phone,
      password_hash: passwordHash
    };
    memoryUsers.push(user);
    memoryUserId += 1;
    return user;
  }

  const inserted = await pool.query(
    "INSERT INTO app_user (email, phone, password_hash, is_admin) VALUES ($1, $2, $3, $4) RETURNING user_id, email, phone, password_hash, is_admin",
    [email, phone, passwordHash, isAdmin]
  );
  return inserted.rows[0];
}

async function listAllUsers() {
  if (useInMemoryStore) {
    return memoryUsers.map((u) => ({
      userId: u.user_id,
      email: u.email,
      phone: u.phone,
      created_at: u.created_at || null
    }));
  }

  const all = await pool.query(
    "SELECT user_id, email, phone, created_at FROM app_user ORDER BY user_id ASC"
  );
  return all.rows.map((r) => ({
    userId: r.user_id,
    email: r.email,
    phone: r.phone,
    created_at: r.created_at
  }));
}

const homepageData = {
  brand: "Elysian Skin Clinic",
  nav: ["Home", "About", "Treatment", "Auth"],
  hero: {
    titleLine1: "Science Meets Soul:",
    titleLine2: "Redefined Skincare",
    subtitle:
      "Personalized skin care solutions tailored to your skin journey. Explore the science behind visible confidence.",
    cta: "Book Consultation"
  },
  feature: {
    eyebrow: "01 / LAB + LUXURY",
    title: "The Bespoke Difference",
    description:
      "We pair diagnostics with clinical precision to deliver care plans designed for your skin profile."
  },
  values: [
    {
      title: "Data-driven",
      description: "Real skin insights power every treatment decision."
    },
    {
      title: "Personalized",
      description: "Protocols are tuned for your goals and tolerance."
    },
    {
      title: "Client-centric",
      description: "Every journey is transparent, comfortable and guided."
    }
  ],
  doctor: {
    name: "Dr. Elena Sterling, MD",
    role: "Board-certified Dermatologist",
    bio: "15+ years in clinical dermatology and aesthetic medicine."
  },
  cta: {
    title: "Ready to begin your personalized skin journey?",
    subtitle:
      "Book consultation with our clinical team and receive your tailored plan.",
    primary: "Start Your Consultation",
    secondary: "View Treatments"
  }
};

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/homepage-data", (req, res) => {
  res.status(200).json(homepageData);
});

app.post("/api/auth/signup", async (req, res) => {
  const { emailOrPhone, password, confirmPassword } = req.body || {};

  if (!emailOrPhone || !password || !confirmPassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự." });
  }

  const normalized = String(emailOrPhone).trim().toLowerCase();
  const email = emailRegex.test(normalized) ? normalized : null;
  const phone = email ? null : normalized;

  try {
    const existingUser = await findUserByIdentity(email, phone);
    if (existingUser) {
      return res.status(409).json({ message: "Tài khoản đã tồn tại." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, phone, passwordHash, false);
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, phone: user.phone, is_admin: user.is_admin || false },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const users = await listAllUsers();

    return res.status(201).json({
      message: "Đăng ký thành công.",
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        phone: user.phone,
        is_admin: user.is_admin || false
      },
      users
    });
  } catch (error) {
    return res.status(500).json({ message: "Không thể đăng ký lúc này." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { emailOrPhone, password } = req.body || {};

  if (!emailOrPhone || !password) {
    return res.status(400).json({ message: "Vui lòng nhập tài khoản và mật khẩu." });
  }

  const normalized = String(emailOrPhone).trim().toLowerCase();
  const email = emailRegex.test(normalized) ? normalized : null;
  const phone = email ? null : normalized;

  try {
    const user = await findUserByIdentity(email, phone);
    if (!user) {
      return res.status(401).json({ message: "Sai thông tin đăng nhập." });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Sai thông tin đăng nhập." });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, phone: user.phone, is_admin: user.is_admin || false },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        phone: user.phone,
        is_admin: user.is_admin || false
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Không thể đăng nhập lúc này." });
  }
});

app.get("/api/auth/users", adminOnly, async (req, res) => {
  try {
    const users = await listAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Không thể lấy danh sách người dùng." });
  }
});

app.get('/api/auth/users/:id', adminOnly, async (req, res) => {
  const id = Number(req.params.id || 0);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    const q = await pool.query('SELECT user_id, email, phone, full_name, created_at, is_admin FROM app_user WHERE user_id = $1 LIMIT 1', [id]);
    if (q.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    const r = q.rows[0];
    return res.status(200).json({ user: { user_id: r.user_id, email: r.email, phone: r.phone, full_name: r.full_name, created_at: r.created_at, is_admin: r.is_admin } });
  } catch (e) {
    return res.status(500).json({ message: 'Could not fetch user' });
  }
});

app.put('/api/auth/users/:id', adminOnly, async (req, res) => {
  const id = Number(req.params.id || 0);
  const { full_name, email, phone, is_admin } = req.body || {};
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    const updated = await pool.query(
      'UPDATE app_user SET full_name = $1, email = $2, phone = $3, is_admin = $4 WHERE user_id = $5 RETURNING user_id, email, phone, full_name, created_at, is_admin',
      [full_name || null, email || null, phone || null, is_admin ? true : false, id]
    );
    if (updated.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    const r = updated.rows[0];
    return res.status(200).json({ user: { user_id: r.user_id, email: r.email, phone: r.phone, full_name: r.full_name, created_at: r.created_at, is_admin: r.is_admin } });
  } catch (e) {
    return res.status(500).json({ message: 'Could not update user' });
  }
});

async function startServer() {
  try {
    await pool.query(createUserTableSql);
    await pool.query(createBookingsTableSql);
    await pool.query(createServicesTableSql);

    // make sure app_user has is_admin column
    await pool.query("ALTER TABLE app_user ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false");
    // make sure app_user has full_name column for profile
    await pool.query("ALTER TABLE app_user ADD COLUMN IF NOT EXISTS full_name VARCHAR(255)");
    // make sure bookings has canceled column
    await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS canceled BOOLEAN DEFAULT false");
  } catch (error) {
    useInMemoryStore = true;
    memoryUsers = [];
    memoryUserId = 1;
    console.warn(`Database unavailable, switching to in-memory auth store: ${error.message}`);
  }

  // Seed admin user if not present
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elysian.local';
    const adminPass = process.env.ADMIN_PASSWORD || '123';
    const found = await pool.query('SELECT user_id FROM app_user WHERE email = $1 LIMIT 1', [adminEmail]);
    if (found.rowCount === 0) {
      const hash = await bcrypt.hash(adminPass, 10);
      await pool.query(
        'INSERT INTO app_user (email, phone, password_hash, is_admin) VALUES ($1,$2,$3,$4)',
        [adminEmail, null, hash, true]
      );
      console.log(`Seeded admin user: ${adminEmail}`);
    } else {
      console.log('Admin user exists.');
    }
  } catch (seedErr) {
    console.warn('Could not seed admin user', seedErr.message);
  }

  app.listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`);
  });
}

startServer();

// Bookings endpoints
app.post('/api/bookings', async (req, res) => {
  const { serviceName, specialist, fullName, phone, scheduledAt } = req.body || {};
  if (!serviceName || !fullName || !phone || !scheduledAt) {
    return res.status(400).json({ message: 'Missing booking fields.' });
  }

  try {
    const inserted = await pool.query(
      'INSERT INTO bookings (service_name, specialist, full_name, phone, scheduled_at) VALUES ($1,$2,$3,$4,$5) RETURNING booking_id, service_name, specialist, full_name, phone, scheduled_at, created_at',
      [serviceName, specialist || null, fullName, phone, scheduledAt]
    );
    return res.status(201).json({ booking: inserted.rows[0] });
  } catch (err) {
    console.error('booking create error', err.message);
    return res.status(500).json({ message: 'Could not create booking.' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const all = await pool.query('SELECT booking_id, service_name, specialist, full_name, phone, scheduled_at, created_at FROM bookings ORDER BY booking_id DESC');
    return res.status(200).json({ bookings: all.rows });
  } catch (err) {
    return res.status(500).json({ message: 'Could not fetch bookings.' });
  }
});

function verifyTokenFromHeader(req) {
  const auth = req.headers && (req.headers.authorization || req.headers.Authorization);
  if (!auth) return null;
  const m = String(auth).match(/^Bearer (.+)$/i);
  if (!m) return null;
  const token = m[1];
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    return null;
  }
}

// express middleware for admin-protected routes
function adminOnly(req, res, next) {
  const payload = verifyTokenFromHeader(req);
  if (!payload || !payload.is_admin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  // attach payload for downstream handlers
  req.admin = payload;
  next();
}

// legacy helper used in some handlers
function requireAdmin(req, res) {
  const payload = verifyTokenFromHeader(req);
  if (!payload || !payload.is_admin) {
    res.status(403).json({ message: 'Admin access required' });
    return null;
  }
  return payload;
}

// Cancel booking (admin)
app.patch('/api/bookings/:id/cancel', async (req, res) => {
  const payload = requireAdmin(req, res);
  if (!payload) return;
  const id = Number(req.params.id || 0);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    await pool.query('UPDATE bookings SET canceled = true WHERE booking_id = $1', [id]);
    return res.status(200).json({ message: 'Canceled' });
  } catch (e) {
    return res.status(500).json({ message: 'Could not cancel' });
  }
});

// Services endpoints
app.get('/api/services', async (req, res) => {
  try {
    const all = await pool.query('SELECT service_id, name, description, price_money, duration_minutes, category, image_url, created_at FROM services ORDER BY service_id ASC');
    return res.status(200).json({ services: all.rows });
  } catch (e) {
    return res.status(500).json({ message: 'Could not fetch services' });
  }
});

app.post('/api/services', async (req, res) => {
  const payload = requireAdmin(req, res);
  if (!payload) return;
  const { name, description, price_money, duration_minutes, category, image_url } = req.body || {};
  if (!name) return res.status(400).json({ message: 'Missing name' });
  try {
    const inserted = await pool.query(
      'INSERT INTO services (name, description, price_money, duration_minutes, category, image_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING service_id, name, description, price_money, duration_minutes, category, image_url, created_at',
      [name, description || null, Number(price_money || 0), Number(duration_minutes || 60), category || null, image_url || null]
    );
    return res.status(201).json({ service: inserted.rows[0] });
  } catch (e) {
    return res.status(500).json({ message: 'Could not create service' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  const payload = requireAdmin(req, res);
  if (!payload) return;
  const id = Number(req.params.id || 0);
  const { name, description, price_money, duration_minutes, category, image_url } = req.body || {};
  if (!id || !name) return res.status(400).json({ message: 'Invalid data' });
  try {
    const updated = await pool.query(
      'UPDATE services SET name=$1, description=$2, price_money=$3, duration_minutes=$4, category=$5, image_url=$6 WHERE service_id=$7 RETURNING service_id, name, description, price_money, duration_minutes, category, image_url, created_at',
      [name, description || null, Number(price_money || 0), Number(duration_minutes || 60), category || null, image_url || null, id]
    );
    return res.status(200).json({ service: updated.rows[0] });
  } catch (e) {
    return res.status(500).json({ message: 'Could not update' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  const payload = requireAdmin(req, res);
  if (!payload) return;
  const id = Number(req.params.id || 0);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    await pool.query('DELETE FROM services WHERE service_id = $1', [id]);
    return res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json({ message: 'Could not delete' });
  }
});

// Admin summary
app.get('/api/admin/summary', async (req, res) => {
  const payload = requireAdmin(req, res);
  if (!payload) return;
  try {
    const users = await pool.query('SELECT COUNT(*)::int as count FROM app_user');
    const bookings = await pool.query('SELECT COUNT(*)::int as count FROM bookings');
    const today = await pool.query("SELECT COUNT(*)::int as count FROM bookings WHERE date(scheduled_at) = current_date");
    return res.status(200).json({ totalUsers: users.rows[0].count, totalBookings: bookings.rows[0].count, bookingsToday: today.rows[0].count });
  } catch (e) {
    return res.status(500).json({ message: 'Could not load summary' });
  }
});
