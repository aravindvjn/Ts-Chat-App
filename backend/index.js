import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import http from "http"; 
import { Server } from "socket.io"; 
import authRouter from "./routes/auth.js";
import friendsRouter from "./routes/friends.js";
import chatRouter from "./routes/chat.js";

dotenv.config();
const app = express();
const server = http.createServer(app); 

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST", "DELETE", "PUT"], 
    credentials: true,
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    io.emit("newMessage", message); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
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

// Root Route
app.get("/", (req, res) => {
  res.status(200).json("Hai, I am Ts Chat App API!");
});

// Routes
app.use("/auth", authRouter);
app.use("/friends", friendsRouter);
app.use("/chat", chatRouter);

// Listening
server.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});


export { io };
