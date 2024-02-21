import ChatroomModel from '../models/chatroom.js';
import asyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';

// Get List of Chatrooms
const chatroomList = asyncHandler(async (req, res, next) => {
    const allChatrooms = await ChatroomModel.find({})
        .populate("participants")
        .exec();
    res.send(allChatrooms);
});

// Get Chatroom
const getChatroom = asyncHandler(async (req, res, next) => {
    const chatroom = await ChatroomModel.findById(req.params.id)
        .populate("participants")
        .populate("messages")
        .exec();
    if (chatroom === null) {
        const err = new Error("Chatroom not found");
        err.status = 404;
        return next(err); 
    }
    res.send(chatroom);
});

// Create Chatroom
const createChatroom = asyncHandler(async (req, res, next) => {
    const chatroom = new ChatroomModel({
            participants: [req.body.user1, req.body.user2],
            messages: [],
        });
    await chatroom.save();
    res.send(chatroom);
});

// Update Chatroom
const updateChatroom = asyncHandler(async (req, res, next) => {
    const updatedChatroom = await ChatroomModel.findByIdAndUpdate(req.params.id, {$push: {"messages": req.body.newMessage}});
    res.send(updatedChatroom);
});

const deleteChatroom = asyncHandler(async (req, res, next) => {
    const deletedChatroom = await ChatroomModel.findByIdAndDelete(req.params.id);
    res.send(deletedChatroom);
});

export {
    chatroomList,
    createChatroom,
    getChatroom,
    updateChatroom,
    deleteChatroom
};