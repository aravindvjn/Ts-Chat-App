import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

//Database
const { Client } = pkg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client
  .connect()
  .then(() => console.log("Connected to the database at auth"))
  .catch((err) => console.error("Connection error", err.stack));
//Generate Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "1h" });
};
// Register route
router.post("/register", async (req, res) => {
  const {
    name,
    username,
    password,
    bio = null,
    profile_pic_url = null,
  } = req.body;
  try {
    const userCheck = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      console.log("User already exists");
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await client.query(
      "INSERT INTO users (name, username, password, bio, profile_pic_url) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
      [name, username, hashedPassword, bio, profile_pic_url]
    );

    const token = generateToken(newUser.rows[0].user_id);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await client.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user.rows[0].user_id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Verify User
export const verifyUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

//get user
router.get("/user-data",verifyUser, async (req, res) => {
  try {
    const response = await client.query(
      "SELECT username, user_id, bio, created_at, profile_pic_url, name FROM users WHERE user_id = $1",
      [req.user.id]
    );
    res.status(200).json(response.rows[0]);
  } catch (err) {
    console.log("Error in getting user data", err);
  }
});
//Middle Ware
export const verifyToken = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token");
    } else {
      socket.user = decoded;
      next();
    }
  });
};


export default router;
