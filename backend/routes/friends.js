import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
import { verifyUser } from "../lib/functions.js";
import {
  acceptFriendRequest,
  getAllFriendRequests,
  getFriendStatus,
  getNewUsers,
  getSingleUser,
  rejectingFriendRequest,
  removeFriend,
  searchUser,
  sendFriendRequest,
} from "../controllers/friends.js";
dotenv.config();


//Search Friends
router.get("/search-user", searchUser);


//Get new n users
router.get("/all-friends/:n", verifyUser, getNewUsers);


//get user by id
router.get("/single-user/:id", verifyUser, getSingleUser);


//sending friend req
router.post("/send-friend-request", verifyUser, sendFriendRequest);


//accept friend request
router.post("/friend-request/:request_id", verifyUser, acceptFriendRequest);


//Remove a friend
router.delete("/remove-friend/:chat_id", verifyUser, removeFriend);


//rejecting friend request
router.delete(
  "/friend-request/:request_id",
  verifyUser,
  rejectingFriendRequest
);


//Get all friend request
router.get("/pending-requests", verifyUser, getAllFriendRequests);


//Friend status
router.get("/friend-status/:id", verifyUser, getFriendStatus);


export default router;
