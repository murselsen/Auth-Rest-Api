import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();

import db from "../models/db.js";
const createToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Name, Username, Email and password are required." });
  }
  const [data] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  console.log("Data fetched from database:", data);
  res.status(200).json({ message: "Data fetched successfully", data });
};

export const register = async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userID = nanoid();
    const insertCmd = await (
      await db
    ).execute(
      "INSERT INTO users (name, username, email, password) VALUES ( ?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );
    const [result] = insertCmd;

    const token = createToken(result.insertId);
    res.json({ insertCmd, result, token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Kayıt başarısız", details: err.message });
  }
};
