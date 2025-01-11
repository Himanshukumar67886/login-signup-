import { NextResponse } from "next/server";
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER, // Use the actual environment variable
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT, 10), // Parse the port as a number
});

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  console.log("Database Password:", process.env.DATABASE_PASSWORD); // Debug the password

  try {
    // Check if email already exists
    const checkEmailQuery = "SELECT 1 FROM users WHERE email = $1";
    const emailExists = await pool.query(checkEmailQuery, [email]);

    if (emailExists.rowCount > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Insert user if email doesn't exist
    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    const values = [name, email, password];

    await pool.query(query, values);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting user:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
