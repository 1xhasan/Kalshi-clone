import { pool } from "./db";
import fs from "fs";
import path from "path";

export async function initDB() {
  const schemaPath = path.join(__dirname, "../db/schema.sql");
  const schemaSQL = fs.readFileSync(schemaPath, "utf8");
  await pool.query(schemaSQL);
  console.log("Database schema ensured.");
}
