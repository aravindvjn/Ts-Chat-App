import { pool } from "../lib/db.js";

//get Chats by Chat Id
export const getChatsByChatId = async (req, res) => {
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
};
