import { query } from "../lib/db.js";


//Check user status
export const checkUser = async (req, res) => {
    try {

      const { username } = req.body;
      
      const results = await query(
        "SELECT  user_id FROM users WHERE username=$1",
        [username]
      );
      if (results.rows.length > 0) {
        res.status(200).json({ message: "User already exists" });
      } else {
        res.status(201).json({ message: "Good to go." });
      }

    } catch (err) {
      res.status(500).json({ message: "Server issue." });
    }
  };
  

//Get User Data
export const getUserData =  async (req, res) => {

  try {

    const response = await query(
      "SELECT username, user_id, bio, created_at, profile_pic_url, name FROM users WHERE user_id = $1",
      [req.user.id]
    );

    if (response.rows.length > 0) {
      res.status(200).json(response.rows[0]);
    }
    
  } catch (err) {
    console.log("Error in getting user data", err);
  }
}