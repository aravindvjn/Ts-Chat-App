import { Router } from "express";
const router = Router();
import pkg from "pg";
import dotenv from "dotenv";
import { verifyUser } from "./auth.js";

dotenv.config();

// Database
const { Pool } = pkg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

// Get User details by chat_id
router.get("/user-details/:chat_id", verifyUser, async (req, res) => {
  const { chat_id } = req.params;
  const user_id = req.user.id;

  try {
    const results = await pool.query(
      `SELECT 
        u.user_id, 
        u.username, 
        u.name, 
        u.profile_pic_url 
      FROM chats c
      JOIN users u ON 
        (u.user_id = c.user1_id OR u.user_id = c.user2_id)
      WHERE c.chat_id = $1 AND u.user_id != $2`,
      [chat_id, user_id]
    );

    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]);
    } else {
      res
        .status(404)
        .json({ message: "User details not found for this chat." });
    }
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all chats by user ID, including details for user1, user2, and the last message
router.get("/user-all-chats", verifyUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await pool.query(
      `SELECT 
        c.chat_id, 
        CASE 
          WHEN c.user1_id = $1 THEN c.user2_id 
          ELSE c.user1_id 
        END AS friend_id,
        CASE 
          WHEN c.user1_id = $1 THEN u2.username 
          ELSE u1.username 
        END AS friend_username,
        CASE 
          WHEN c.user1_id = $1 THEN u2.name 
          ELSE u1.name 
        END AS friend_name,
        CASE 
          WHEN c.user1_id = $1 THEN u2.profile_pic_url 
          ELSE u1.profile_pic_url 
        END AS friend_profile_pic,
        COALESCE(m.content, NULL) AS last_message,
        COALESCE(m.sent_at AT TIME ZONE 'UTC', NULL) AS last_message_time,
        COALESCE(m.message_id, NULL) AS last_message_id, 
        COALESCE(m.sender_id, NULL) AS last_message_sender_id, 
        COALESCE(m.is_read, false) AS last_message_is_read
      FROM chats c
      JOIN users u1 ON c.user1_id = u1.user_id
      JOIN users u2 ON c.user2_id = u2.user_id
      LEFT JOIN (
        SELECT DISTINCT ON (chat_id) 
          chat_id, 
          content, 
          sent_at, 
          message_id, -- Select message ID
          sender_id, -- Select sender ID
          is_read -- Select is_read status
        FROM messages 
        WHERE chat_id IS NOT NULL 
        ORDER BY chat_id, sent_at DESC
      ) m ON c.chat_id = m.chat_id
      WHERE (c.user1_id = $1 OR c.user2_id = $1)
      ORDER BY last_message_time DESC NULLS LAST, c.chat_id DESC`,
      [userId]
    );

    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(201).json({ message: "Add New Friends." });
    }
  } catch (err) {
    console.error("Error in fetching chats:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//get chat id by users
router.get("/get-chat_id/:user2", verifyUser, async (req, res) => {
  try {
    const { user2 } = req.params;
    const chat_id =await  pool.query(
      "SELECT chat_id FROM chats WHERE (user1_id=$1 AND user2_id =$2) OR (user1_id=$2 AND user2_id =$1)",
      [req.user.id, user2]
    );
    if (chat_id.rows.length > 0) {
      res.status(200).json({ chat_id: chat_id.rows[0] });
    } else {
      res.status(400).json({ message: "Something Went Wrong." });
    }
  } catch (err) {
    console.error("Error in Fetching chat id");
  }
});
// Set message as read
router.patch("/set-message-read/:message_id", verifyUser, async (req, res) => {
  const { message_id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE messages SET is_read = TRUE WHERE message_id = $1 AND receiver_id = $2 RETURNING *",
      [message_id, user_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Message marked as read successfully.",
        updatedMessage: result.rows[0],
      });
    } else {
      res.status(201).json({ message: "Message not found or already read." });
    }
  } catch (err) {
    console.error("Error marking message as read:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
