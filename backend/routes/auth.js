import { Router } from "express";
const router = Router();
import { changeDetails, changePassword, loginUser, registerUser } from "../controllers/auth.js";
import { verifyUser } from "../lib/functions.js";
import { checkUser, getUserData } from "../controllers/user.js";

//Generate Token

//Check username status
router.post("/check-username-status",checkUser);

// Register route
router.post("/register",registerUser);

// Login route
router.post("/login",loginUser);

//get user
router.get("/user-data", verifyUser,getUserData);
//Middle Ware

//Change user name
router.post("/change-mypass", verifyUser,changePassword );

//update Profile
router.post("/change-details", verifyUser,changeDetails);

export default router;
