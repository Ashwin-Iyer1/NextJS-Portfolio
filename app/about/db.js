const { Pool } = require("pg");

require("dotenv").config();

// Prefer DATABASE_URL (Heroku sets it; Vercel/Neon use it too).
// Fall back to the discrete lowercase vars for backward compatibility.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Use true in production with proper certificates
      },
    })
  : new Pool({
      user: process.env.user,
      host: process.env.host,
      database: process.env.dbname,
      password: process.env.password,
      port: "5432",
      ssl: {
        rejectUnauthorized: false, // Use true in production with proper certificates
      },
    });

module.exports = pool;
