import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRouter from "./routes/auth.js";
import friendsRouter from "./routes/friends.js";
import chatRouter from "./routes/chat.js";
import serverless from "serverless-http";
import { verifyToken } from "./lib/functions.js";
import { socketConnection } from "./controllers/socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

// Port
const PORT = process.env.PORT || 8000;

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
io.use(verifyToken);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json("Hai, I am Ts Chat App API!");
});

// Socket.IO connection
io.on("connection", socketConnection);

// Routes
app.use("/auth", authRouter);
app.use("/friends", friendsRouter);
app.use("/chat", chatRouter);

// Listening
server.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
export const handler = serverless(app);
