import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();

import db from "../models/db.js";

// Helper function to create standardized API responses
const createResponse = (
  success,
  statusCode,
  message,
  data = null,
  error = null
) => {
  return {
    success,
    statusCode,
    message,
    data,
    error,
    timestamp: new Date().toISOString(),
  };
};

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
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            400,
            "Email and password are required.",
            null,
            "Missing required fields"
          )
        );
    }

    // Fetch user from database
    const [data] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (data.length === 0) {
      return res
        .status(404)
        .json(
          createResponse(
            false,
            404,
            "User not found. Please register.",
            null,
            "User does not exist"
          )
        );
    }

    // Verify password
    const user = data[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json(
          createResponse(
            false,
            401,
            "Invalid credentials.",
            null,
            "Password is incorrect"
          )
        );
    }

    // Create token
    const token = createToken(user.id);

    // Prepare user data (exclude password)
    const userData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      auth: user.auth,
      token,
    };

    res
      .status(200)
      .json(createResponse(true, 200, "Login successful.", userData));
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json(
        createResponse(false, 500, "Internal server error.", null, err.message)
      );
  }
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Input validation
    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            400,
            "All fields are required.",
            null,
            "Missing required fields: name, username, email, password"
          )
        );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            400,
            "Invalid email format.",
            null,
            "Please provide a valid email address"
          )
        );
    }

    // Password strength validation
    if (password.length < 6) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            400,
            "Password too weak.",
            null,
            "Password must be at least 6 characters long"
          )
        );
    }

    // Check if user already exists
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json(
          createResponse(
            false,
            409,
            "User already exists.",
            null,
            "Email or username is already registered"
          )
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    const [result] = await db.execute(
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );

    // Create token
    const token = createToken(result.insertId);

    // Prepare response data
    const userData = {
      id: result.insertId,
      name,
      username,
      email,
      auth: 0,
      token,
    };

    res
      .status(201)
      .json(
        createResponse(true, 201, "User registered successfully.", userData)
      );
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json(
        createResponse(false, 500, "Internal server error.", null, err.message)
      );
  }
};
