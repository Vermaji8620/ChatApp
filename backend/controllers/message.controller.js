import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    // nothing just renamed the id of the receiver
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    console.log("aa");
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    console.log("cc");

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    console.log("fsfsdhfdshf");

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.save();
    }
    console.log(conversation);

    console.log("dd");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messageall = conversation.messages;

    res.status(201).json(messageall);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
