import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { login, register } from "./controllers/authControllers.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.json({ message: "Welcome to the API!" });
});

app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
