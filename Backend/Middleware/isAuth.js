import jwt from "jsonwebtoken";
import { User } from "../Model/auth_Schema.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: `Token is missing or Invalid`,
      });
    }

    const token = await authHeader.split(" ")[1];


    let decoded;
    try {
      decoded = await jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: `Token is Expired, try new One`,
        });
      }

      return res.status(401).json({
        success: false,
        message: `Token verification failed`,
      });
    }


    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }


    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server error ${error} ${error.message}`,
    });
  }
};
