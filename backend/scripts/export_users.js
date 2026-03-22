const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'clinic_management',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

async function exportUsers() {
  try {
    const res = await pool.query('SELECT user_id, email, phone, created_at FROM app_user ORDER BY user_id');
    const rows = res.rows || [];

    const outDir = path.join(__dirname, '..', 'exports');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // JSON export
    const jsonPath = path.join(outDir, `users_${Date.now()}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2), 'utf8');

    // SQL insert export (safe: uses literal escaping)
    const sqlPath = path.join(outDir, `users_${Date.now()}.sql`);
    const inserts = rows.map(r => {
      const email = r.email ? r.email.replace(/'/g, "''") : null;
      const phone = r.phone ? r.phone.replace(/'/g, "''") : null;
      const created = r.created_at ? `'${r.created_at.toISOString()}'` : 'DEFAULT';
      return `INSERT INTO app_user (user_id, email, phone, created_at) VALUES (${r.user_id}, ${email ? `'${email}'` : 'NULL'}, ${phone ? `'${phone}'` : 'NULL'}, ${created});`;
    }).join('\n');
    const header = '-- users export\nSET session_replication_role = replica;\n';
    const footer = '\nSET session_replication_role = DEFAULT;\n';
    fs.writeFileSync(sqlPath, header + inserts + footer, 'utf8');

    console.log('Exported', rows.length, 'users to:');
    console.log('  -', jsonPath);
    console.log('  -', sqlPath);
    await pool.end();
  } catch (err) {
    console.error('Failed to export users:', err.message || err);
    process.exitCode = 2;
  }
}

exportUsers();
