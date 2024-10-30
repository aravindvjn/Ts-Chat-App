import { Router } from "express";
const router = Router();
import pkg from "pg";
import dotenv from "dotenv";
import { verifyUser } from "./auth.js";
dotenv.config();

//Database
const { Client } = pkg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client
  .connect()
  .then(() => console.log("Connected to the database at chat"))
  .catch((err) => console.error("Connection error", err.stack));

// //create a chat
// router.post("/create-chat", verifyUser, async (req, res) => {
//   try {
//     const { otherUser } = req.body;
//     const [user1_id, user2_id] =
//       req.user.id > user1_id
//         ? [otherUser, req.user.id]
//         : [req.user.id, otherUser];
//     const results = await client.query(
//       "INSERT INTO chats (user1_id, user2_id) VALUES ($1,$2) RETURNING chat_id",
//       [user1_id, user2_id]
//     );
//     if (results.rows.length > 0) {
//       console.log("results", results.rows);
//       res.status(200).json({ message: "Created Chat." });
//     } else {
//       res.status(400).json({ message: "Failed to create Chat." });
//     }
//   } catch (err) {
//     console.error("Error in Creating chat.");
//     res.status(500).json({ message: "Server error" });
//   }
// });

//Get User details by chat_id
router.get("/user-details/:chat_id", verifyUser, async (req, res) => {
  const { chat_id } = req.params;
  const user_id = req.user.id;

  try {
    const results = await client.query(
      `
      SELECT 
        u.user_id, 
        u.username, 
        u.name, 
        u.profile_pic_url 
      FROM chats c
      JOIN users u ON 
        (u.user_id = c.user1_id OR u.user_id = c.user2_id)
      WHERE c.chat_id = $1 AND u.user_id != $2
      `,
      [chat_id, user_id]
    );

    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]); 
    } else {
      res.status(404).json({ message: "User details not found for this chat." });
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

    const results = await client.query(
      `
      SELECT 
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
        COALESCE(m.sent_at, NULL) AS last_message_time
      FROM chats c
      JOIN users u1 ON c.user1_id = u1.user_id
      JOIN users u2 ON c.user2_id = u2.user_id
      LEFT JOIN (
        SELECT DISTINCT ON (chat_id) 
          chat_id, 
          content, 
          sent_at 
        FROM messages 
        WHERE chat_id IS NOT NULL 
        ORDER BY chat_id, sent_at DESC
      ) m ON c.chat_id = m.chat_id
      WHERE (c.user1_id = $1 OR c.user2_id = $1)
      GROUP BY c.chat_id, friend_id, friend_username, friend_name, friend_profile_pic, m.content, m.sent_at
      `,
      [userId]
    );

    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(404).json({ message: "No chats found for this user." });
    }
  } catch (err) {
    console.error("Error in fetching chats:", err);
    res.status(500).json({ message: "Server error" });
  }
});



//get last 30 messages 
router.get("/last-30-messages/:chat_id", verifyUser, async (req, res) => {
  const chat_id = req.params.chat_id;
  const user_id = req.user.id;
  try {
    const result = await client.query(
      "SELECT * FROM messages WHERE chat_id = $1 AND (sender_id = $2 OR receiver_id = $2) ORDER BY sent_at DESC LIMIT 30;",
      [chat_id, user_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows.reverse()); 
    } else {
      res.status(404).json({ message: "No messages found." });
    }
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//send messages
router.post('/send-message', verifyUser, async (req, res) => {
  const { receiver_id, content,chat_id } = req.body;
  const sender_id = req.user.id; 

  if (!receiver_id || !content) {
    return res.status(400).json({ message: 'Receiver ID and content are required.' });
  }

  try {
    const result = await client.query(
      "INSERT INTO messages (sender_id, receiver_id, content,chat_id) VALUES ($1, $2, $3,$4) RETURNING message_id",
      [sender_id, receiver_id, content,chat_id]
    );

    if (result.rows.length > 0) {
      res.status(201).json({
        message: "Message sent successfully.",
        messageDetails: result.rows[0],
      });
    } else {
      res.status(400).json({ message: "Failed to send message." });
    }
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
