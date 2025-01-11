import { query } from "../../../utils/lib/db";

export async function GET(req) {
  try {
    const result = await query("SELECT NOW()", []);
    return new Response(JSON.stringify({ success: true, time: result.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: "Database connection failed" }), {
      status: 500,
    });
  }
}
