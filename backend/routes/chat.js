import { Router } from "express";
const router = Router();
import { client } from "../index.js";

router.post("/create-chat", async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;
    const results = await client.query(
      "INSERT INTO chats (user1_id, user2_id) VALUES ($1,$2) RETURNING chat_id",
      [user1_id, user2_id]
    );
    if (results.rows.length > 0) {
      console.log("results", results.rows);
      res.status(200).json({ message: "Created Chat." });
    } else {
      res.status(400).json({ message: "Failed to create Chat." });
    }
  } catch (err) {
    console.error("Error in Creating chat.");
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
