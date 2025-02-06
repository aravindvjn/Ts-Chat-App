import { query } from "../lib/db.js";
import { generateToken } from "../lib/functions.js";
import bcrypt from "bcryptjs";

//Rigister a new user
export const registerUser = async (req, res) => {
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

    const userCheck = await query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await query(
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
};


//Login User
export const loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await query("SELECT * FROM users WHERE username = $1", [
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
};

//change password
export const changePassword = async (req, res) => {

  try {

    const { oldpassword, newpassword } = req.body;

    const user = await query("SELECT * FROM users WHERE user_id = $1", [
      req.user.id,
    ]);

    if (user.rows.length > 0) {
      const isMatch = await bcrypt.compare(oldpassword, user.rows[0].password);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        const newPass = await query(
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
};


//Change Details
export const changeDetails = async (req, res) => {

  try {

    const { name, bio = null, profile_pic_url = null } = req.body;
    
    const results = await query(
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
};
