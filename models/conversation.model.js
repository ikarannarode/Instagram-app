import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

export const Conversation = mongoose.model("Conversation", conversationSchema);