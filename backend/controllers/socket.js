import { query } from "../lib/db.js";

export const socketConnection =  (socket) => {

    console.log("A user connected");
    const user_id = socket.user.id;
  
    // Fetch last 30 messages
    socket.on("fetch-messages" + user_id, async (chat_id) => {

      try {

        const result = await query(
          "SELECT * FROM messages WHERE chat_id = $1 AND (sender_id = $2 OR receiver_id = $2) ORDER BY sent_at DESC LIMIT 30;",
          [chat_id, user_id]
        );
        const messages = result.rows.reverse();
        socket.emit("last-30-messages" + user_id, messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
      
    });
  
    // Send new message
    socket.on("send-message" + user_id, async (data) => {
      const { chat_id, receiver_id, message } = data;
  
      try {
        const result = await query(
          "INSERT INTO messages (chat_id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *;",
          [chat_id, user_id, receiver_id, message]
        );
  
        io.emit("new-message" + chat_id, result.rows[0]);
      } catch (err) {
        console.error("Error inserting message:", err);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  }