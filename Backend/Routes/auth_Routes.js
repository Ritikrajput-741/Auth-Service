import express from "express";
import {
  confirmPassword,
  forgetPassword,
  loginUser,
  logOutUser,
  userRegister,
  verifyOtp,
  verifyToken,
} from "../Controllers/auth_Controller.js";
import { isAuth } from "../Middleware/isAuth.js";
import { userSchema, validateUser } from "../Validator/validator.js";

const routes = express.Router();

routes.post("/register", validateUser(userSchema), userRegister);
routes.post("/verify", verifyToken);
routes.post("/login", loginUser);
routes.post("/logout", isAuth, logOutUser);
routes.post("/forgetPassword", forgetPassword);
routes.post("/otpVerify/:email", verifyOtp);
routes.post("/confirm-password/:email", confirmPassword);

export default routes;
