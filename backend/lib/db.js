import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database Connection using Pool
const { Pool } = pkg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));