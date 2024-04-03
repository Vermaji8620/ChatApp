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
import path from "path";
const PORT = process.env.PORT || 5000;
app.use(express.json());
import mongoose from "mongoose";

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users/", userRoutes);

// express.static is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, "/my-project/dist")));

// niche wala code is for production...
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-project", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => console.log("error is", error))
  .then(() => {
    server.listen(PORT, () => console.log("server is up and running"));
  });
