import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import http from "http";
import { Server } from "socket.io";
import authRouter ,{ verifyToken } from "./routes/auth.js";
import friendsRouter from "./routes/friends.js";
import chatRouter from "./routes/chat.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

// Port
const PORT = process.env.PORT || 3000;

// Database Connection
const { Client } = pkg;
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

// MiddleWares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
io.use(verifyToken);
// Root Route
app.get("/", (req, res) => {
  res.status(200).json("Hai, I am Ts Chat App API!");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");
  // Fetch last 30 messages
  const user_id = socket.user.id;
  socket.on("fetch-messages"+user_id, async (chat_id) => {
    try {
      const result = await client.query(
        "SELECT * FROM messages WHERE chat_id = $1 AND (sender_id = $2 OR receiver_id = $2) ORDER BY sent_at DESC LIMIT 30;",
        [chat_id, user_id]
      );
      const messages = result.rows.reverse(); 
      socket.emit("last-30-messages"+user_id, messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  });

  // Send new message
  socket.on("send-message"+user_id, async (data) => {
    const { chat_id, receiver_id, message } = data;

    try {
      const result = await client.query(
        "INSERT INTO messages (chat_id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *;",
        [chat_id,user_id  , receiver_id, message]
      );

      io.emit("new-message"+user_id, result.rows[0]); // Emit to all clients in the chat
    } catch (err) {
      console.error("Error inserting message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes
app.use("/auth", authRouter);
app.use("/friends", friendsRouter);
app.use("/chat", chatRouter);

// Listening
server.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
