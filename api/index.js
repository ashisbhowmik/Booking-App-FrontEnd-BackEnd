import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import hotelsRoutes from "./routes/hotels.js";
import roomsRoutes from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8000;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connection successfull !");
  } catch (e) {
    console.log(e);
  }
};

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

/// middlelayers to handle errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMesssage = err.message || "Something Went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMesssage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log("Connected with backend..");
});
