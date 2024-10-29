import { Router } from "express";
const router = Router();

router.get("/all-friends", async (req, res) => {
  try {
    res
      .status(200)
      .json([
        {
          id: 100002,
          username: "aravind",
          name: "Aravind Vijayan",
          time: "12:30pm",
          msg: "Hai How are you.",
        },
      ]);
  } catch (err) {
    console.error("Error in Loggin in");
  }
});

export default router;
