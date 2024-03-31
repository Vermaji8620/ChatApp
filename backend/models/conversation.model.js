import mongoose from "mongoose";
import { Message } from "./message.model";
import { User } from "./user.model";

const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", messageSchema);
