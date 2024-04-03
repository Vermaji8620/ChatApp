import express from "express";
import { app, server } from "./socket/socket.js";
import cookieParser from "cookie-parser";
// const app = express();
app.use(cookieParser());
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
const PORT = process.env.PORT || 5000;
app.use(express.json());
import mongoose from "mongoose";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users/", userRoutes);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => console.log("error is", error))
  .then(() => {
    server.listen(PORT, () => console.log("server is up and running"));
  });
