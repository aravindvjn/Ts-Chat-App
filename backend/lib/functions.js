import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "1h" });
};


//Verify User
export const verifyUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

//Verify Socket Token
export const verifyToken = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token", err);
    } else {
      socket.user = decoded;
      next();
    }
  });
};