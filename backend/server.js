import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
const PORT = process.env.PORT || 5000;
app.use(express.json());
import mongoose from "mongoose";

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => console.log("error is", error))
  .then(() => {
    app.listen(PORT, () => console.log("server is up and running"));
  });
