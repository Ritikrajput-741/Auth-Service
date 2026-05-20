import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./Database/db.js";
import authRoutes from "./Routes/auth_Routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://auth-service-rose.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

//api's
app.use("/api/v1/auth", authRoutes);

//server number
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at Localhost✅ : ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
