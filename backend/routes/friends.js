import { Router } from "express";
import { verifyUser } from "./auth.js";
const router = Router();
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
  .then(() => console.log("Connected to the database at friends"))
  .catch((err) => console.error("Connection error", err.stack));

//Search Friends
router.get("/search-user", async (req, res) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    return res.status(400).send("Please provide a search query.");
  }

  try {
    const result = await client.query(
      "SELECT user_id, username, name, profile_pic_url, bio,created_at FROM users WHERE name ILIKE $1 OR username ILIKE $1",
      [`%${searchQuery}%`]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(201).json({ message: "No users Found." });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Server error");
  }
});

//Get new n users
router.get("/all-friends/:n", verifyUser, async (req, res) => {
  try {
    const { n } = req.params;
    const results = await client.query(
      "SELECT user_id, username, name, profile_pic_url, bio FROM users WHERE user_id != $1 ORDER BY created_at DESC LIMIT $2",
      [req.user.id, n]
    );
    if (results.rows.length > 0) {
      res.status(201).json(results.rows);
    } else {
      res.status(401).json({ message: "Failed to Load." });
    }
  } catch (err) {
    console.error("Error in getting all user data.");
    res.status(500).json({ message: "Server error" });
  }
});

//get user by id
router.get("/single-user/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      "SELECT user_id, username, name, profile_pic_url, bio,created_at FROM users WHERE user_id = $1",
      [id]
    );
    if (results.rows.length > 0) {
      res.status(201).json(results.rows);
    } else {
      res.status(401).json({ message: "Failed to Load." });
    }
  } catch (err) {
    console.error("Error in getting all user data.");
    res.status(500).json({ message: "Server error" });
  }
});

//sending friend req
router.post("/send-friend-request", verifyUser, async (req, res) => {
  const { receiver_id } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1, $2) ON CONFLICT (sender_id, receiver_id) DO NOTHING RETURNING *",
      [req.user.id, receiver_id]
    );

    if (result.rows.length > 0) {
      res.status(201).json({ message: "Friend request sent." });
    } else {
      res.status(409).json({ message: "Friend request already exists." });
    }
  } catch (err) {
    console.error("Error sending friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//accept friend request
router.post("/friend-request/:request_id", verifyUser, async (req, res) => {
  const request_id = req.params.request_id;
  try {
    const result = await client.query(
      "SELECT sender_id, receiver_id FROM friend_requests WHERE request_id = $1 AND receiver_id = $2 ;",
      [request_id, req.user.id]
    );

    if (result.rows.length > 0) {
      const { sender_id, receiver_id } = result.rows[0];
      await client.query(
        "DELETE FROM friend_requests WHERE request_id = $1 AND receiver_id = $2 ;",
        [request_id, req.user.id]
      );

      const user1_id = sender_id < receiver_id ? sender_id : receiver_id;
      const user2_id = sender_id > receiver_id ? sender_id : receiver_id;

      const chatResult = await client.query(
        "INSERT INTO chats (user1_id, user2_id) VALUES ($1, $2) RETURNING chat_id;",
        [user1_id, user2_id]
      );

      if (chatResult.rows.length > 0) {
        res.status(200).json({
          message: "Friend request accepted and chat created.",
          chat: chatResult.rows[0],
        });
      } else {
        res.status(400).json({ message: "Failed to create chat." });
      }
    } else {
      res.status(404).json({
        message:
          "Friend request not found or you are not authorized to accept it.",
      });
    }
  } catch (err) {
    console.error("Error in accepting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//Remove a friend
router.delete("/remove-friend/:chat_id", verifyUser, async (req, res) => {
  const chat_id = req.params.chat_id;
  try {
    await client.query(
      "DELETE FROM messages WHERE chat_id = $1 AND (sender_id=$2 OR receiver_id=$2)",
      [chat_id, req.user.id]
    );

    const result = await client.query(
      "DELETE FROM chats WHERE chat_id = $1 AND (user1_id = $2 OR user2_id = $2)",
      [chat_id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Chat not found or not authorized." });
    }

    res.status(200).json({ message: "Removed Friend." });
  } catch (err) {
    console.error("Error Removing:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//rejecting friend request
router.delete("/friend-request/:request_id", verifyUser, async (req, res) => {
  const request_id = req.params.request_id;
  try {
    await client.query(
      "DELETE FROM friend_requests WHERE request_id = $1 AND (sender_id = $2 OR receiver_id = $2);",
      [request_id, req.user.id]
    );

    res.status(200).json({ message: "Friend request rejected." });
  } catch (err) {
    console.error("Error rejecting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all friend request
router.get("/pending-requests", verifyUser, async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await client.query(
      `
      SELECT fr.*, u.username, u.name, u.profile_pic_url
      FROM friend_requests fr
      JOIN users u ON fr.sender_id = u.user_id
      WHERE fr.receiver_id = $1 AND fr.status = 'pending'
      `,
      [user_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(201).json({ message: "No pending requests." });
    }
  } catch (err) {
    console.error("Error fetching pending requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Friend status
router.get("/friend-status/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const checkFriend = await client.query(
      "SELECT * FROM chats WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
      [user_id, id]
    );
    if (checkFriend.rows.length > 0) {
      return res.status(200).json({ status: "Friend" });
    }

    const checkRequest = await client.query(
      "SELECT * FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2 AND status = 'pending') OR (sender_id = $2 AND receiver_id = $1 AND status = 'pending')",
      [user_id, id]
    );
    if (checkRequest.rows.length > 0) {
      const request = checkRequest.rows[0];
      if (request.sender_id === user_id) {
        return res.status(200).json({ status: "Requested" });
      } else {
        return res
          .status(200)
          .json({ status: "Request", payload: request.request_id });
      }
    }
    return res.status(200).json({ status: "Stranger" });
  } catch (err) {
    console.error("Error in getting friends status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
