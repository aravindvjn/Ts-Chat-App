import { Router } from "express";
const router = Router();
import { verifyUser } from "../lib/functions.js";
import {
  getAllChatsByUser,
  getChatId,
  getChatsByChatId,
  setMessageAsRead,
} from "../controllers/chat.js";

// Get User details by chat_id
router.get("/user-details/:chat_id", verifyUser, getChatsByChatId);

// Get all chats by user ID, including details for user1, user2, and the last message
router.get("/user-all-chats", verifyUser, getAllChatsByUser);

//get chat id by users
router.get("/get-chat_id/:user2", verifyUser, getChatId);

// Set message as read
router.patch("/set-message-read/:message_id", verifyUser, setMessageAsRead);

export default router;
