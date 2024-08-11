import { Conversation } from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        let conversation = await Conversation.findOne({
            participents: { $all: [senderId, receiverId] }
        });
        //establish the conversation if not started yet
        conversation = await Conversation.create({
            participents: [senderId, receiverId]
        });
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);
        // implement socket.io for realtime data transfer
        return res.status(201).json({
            succes: true,
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.find({
            participents: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            return res.status(200).json({
                success: true
            })
        }
    } catch (error) {
        console.log(error);

    }
}