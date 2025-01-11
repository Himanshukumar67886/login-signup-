import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USER, // Use environment variables for security
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 5432, // Default port is 5432
});

export const query = (text, params) => pool.query(text, params);
