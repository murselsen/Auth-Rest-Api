import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "auth",
  password: "murselsen",
  database: "library",
});

if (!db) {
  console.error("Database connection failed");
} else {
  console.log("Database connection established successfully");
}

export default db;
