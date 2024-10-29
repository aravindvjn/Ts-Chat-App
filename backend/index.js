import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import authRouter from "./routes/auth.js";
import friendsRouter from "./routes/friends.js";
import chatRouter from "./routes/chat.js";
dotenv.config();
const app = express();
//port
const PORT = process.env.PORT | 3000;

//Data Base Connection
const { Client } = pkg;
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));
//MiddleWares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Root Route
app.get("/", (req, res) => {
  res.status(200).json("Hai, I am Ts Chat App API!");
});

//Routes
app.use("/auth", authRouter);
app.use("/friends", friendsRouter);
app.use("/chat", chatRouter);

//Listening
app.listen(PORT, () => {
  console.log(`Server Listening to PORT ${PORT}`);
});
