import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database Connection using Pool
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err.stack);
    process.exit(1); 
  }
})();


export const query = (queryText, params) => pool.query(queryText, params);