import { Pool } from "pg";


// Configure the database connection
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10),
  });

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate the inputs
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Check if the user exists
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid email " }),
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Directly compare the entered password with the stored password (plain text comparison)
    if (password !== user.password) {
      return new Response(
        JSON.stringify({ message: "Invalid password" }),
        { status: 401 }
      );
    }

    // Generate a session or token (e.g., JWT token) - this is optional
    // For simplicity, we'll just return a success message
    return new Response(
      JSON.stringify({ message: "Login successful", token: "dummy-token" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during login" }),
      { status: 500 }
    );
  }
}
