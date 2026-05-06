import pg from "pg";
import "dotenv/config"; // Shortcut to load env vars immediately

const { Pool } = pg;

// 1. Validate the connection string
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from environment variables.");
}

// 2. Configure the Pool
// We use a singleton instance so we don't accidentally open hundreds of connections
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase/Cloud providers require SSL for security
  ssl: {
    rejectUnauthorized: false, 
  },
});

// 3. Add an event listener for basic logging
db.on("connect", () => {
  console.log("✅ Database connected successfully");
});

db.on("error", (err) => {
  console.error("❌ Unexpected error on idle database client", err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);