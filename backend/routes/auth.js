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

//Check username status
router.post("/check-username-status", async (req, res) => {
  try {
    const { username } = req.body;
    const results = await client.query(
      "SELECT  user_id FROM users WHERE username=$1",
      [username]
    );
    if (results.rows.length > 0) {
      res.status(200).json({ message: "User already exists" });
    } else {
      res.status(201).json({ message: "Good to go." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server issue." });
  }
});

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
    const check = /^[a-z0-9_]{7,}$/;
    if (!check.test(username)) {
      return res.status(400).json({
        message:
          "The username must contain only lowercase letters, numbers, and underscores, and be more than 6 characters long.",
      });
    }
    const userCheck = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await client.query(
      "INSERT INTO users (name, username, password, bio, profile_pic_url) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
      [name, username, hashedPassword, bio, profile_pic_url]
    );

    const token = generateToken(newUser.rows[0].user_id);

    res.status(201).json({
      token,
      username: newUser.rows[0].username,
      bio: newUser.rows[0].bio,
      created_at: newUser.rows[0].created_at,
      profile_pic_url: newUser.rows[0].profile_pic_url,
      user_id: newUser.rows[0].user_id,
      name: newUser.rows[0].name,
    });
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
      return res.status(400).json({ message: "Invalid username." });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = generateToken(user.rows[0].user_id);

    res.status(200).json({
      token,
      username: user.rows[0].username,
      bio: user.rows[0].bio,
      created_at: user.rows[0].created_at,
      profile_pic_url: user.rows[0].profile_pic_url,
      user_id: user.rows[0].user_id,
      name: user.rows[0].name,
    });
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
router.get("/user-data", verifyUser, async (req, res) => {
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
      console.log("Invalid token", err);
    } else {
      socket.user = decoded;
      next();
    }
  });
};
//Change user name
router.post("/change-mypass", verifyUser, async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const user = await client.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.id,
    ]);
    if (user.rows.length > 0) {
      const isMatch = await bcrypt.compare(oldpassword, user.rows[0].password);
      if (isMatch) {
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const newPass = await client.query(
          "UPDATE users SET password = $1 WHERE user_id = $2 RETURNING user_id",
          [hashedPassword, req.user.id]
        );
        if (newPass.rows.length > 0) {
          res.status(200).json({ message: "Successfully updated password." });
        } else {
          res.status(201).json({ message: "Failed to update password." });
        }
      } else {
        res.status(202).json({ message: "Incorrect Old Password." });
      }
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (err) {
    console.error("Error in updating password.", err);
    res.status(500).json({ message: "Server issue." });
  }
});
//update Profile
router.post("/change-details", verifyUser, async (req, res) => {
  try {
    const { name, bio = null, profile_pic_url = null } = req.body;
    const results = await client.query(
      " UPDATE users SET name = $1, bio = $2, profile_pic_url = $3 WHERE user_id = $4 RETURNING *",
      [name, bio, profile_pic_url, req.user.id]
    );
    if (results.rows.length > 0) {
      res.status(200).json({ message: "Profile Updated Successfully." });
    } else {
      res.status(400).json({ message: "Failed to update profile." });
    }
  } catch (err) {
    console.error("Error in updating Profile.");
    res.status(500).json({ message: "Server issue." });
  }
});
export default router;
