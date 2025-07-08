import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { Room } from "../models/room.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";



const sendMessage = async (req, res) => {
  const {content,roomId} = req.body;
  if(!content || !roomId) {
    throw new ApiError(400,"Message and roomId are required")
  }

  const message = await Message.create({
    sender: req.user._id,
    content,
    room:roomId
  });

  await Room.findByIdAndUpdate(
    roomId,
    {
      lastMessage: message._id,
  })

  res
  .status(201)
  .json(new ApiResponse(201,"Message Sent",message))
}

const getMessagesForRoom = async (req, res) => {
  const {roomId} = req.params

  if(!roomId) {
    throw new ApiError(400,"roomId is required");
  }

  try {
    const messages = await Message.find({room: roomId})
  
    if(!messages || messages.length === 0) {
      return res.status(404).json(new ApiResponse(404,"No messages found for this room"));
    }
  
    res
    .status(200)
    .json(new ApiResponse(200,"Message retrieve successfully", messages));
    
  } catch (error) {
    console.log("error in getMessagesForRoom:", error);
  }
}

const deleteMessage = async (req, res) => {
  const {messageId} = req.params

  if(!messageId) {
    throw new ApiError(400,"messageId is required")
  }

  try {
    const message = await Message.findByIdAndDelete(messageId);
  
    if(!message) {
      throw new ApiError(404,"Message not found");
    }
  
    res
    .status(200)
    .json(new ApiResponse(200,"Message deleted successfully", message));
    
  } catch (error) {
    console.log("error in deleteMessage:", error);
    throw new ApiError(500, "Internal Server Error");
  }
}

const editMessage = async (req, res) => {
  const {messageId} = req.params;
  const {newContent} = req.body;

  if(!messageId || !newContent) {
    throw new ApiError(400,"messageId and newContent are required");
  }

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      {content: newContent},
      {new: true}
    )
  
    if(!message) {
      throw new ApiError(404,"Message not found");
    }
  
    // Update the lastMessage field in the Room model
    await Room.findByIdAndUpdate(
      message.room,
      {
        lastMessage: message._id
      }
    )
  
    res
    .status(200)
    .json(new ApiResponse(200, "Message updated successfully", message));
  
  } catch (error) {
    console.log("error in editmessage:", error);
    throw new ApiError(500, "Internal Server Error");
  }
}

const getMessageById = async (req, res) => {
  const {messageId} = req.params

  if(!messageId) {
    throw new ApiError(400,"messageId is reuired")
  }

  try {
    const message = await Message.findById(messageId)
  
    if(!message) {
      throw new ApiError(404,"Message not found");
    }
  
    res
    .status(200)
    .json(new ApiResponse(200,"Message retrieved successfully", message));
    
  } catch (error) {
    console.log("error in getMessageById:", error);
    throw new ApiError(500, "Internal Server Error");
  }
}

const markMessagesAsRead = asyncHandler(async (req, res) => {

  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "roomId is required");
  }

  try {
    const result = await Message.updateMany(
      { room: roomId, isRead: false }, 
      { $set: { isRead: true } }       
    );

    if (result.modifiedCount === 0) {
      throw new ApiError(404, "No unread messages found for this room");
    }

    res.status(200).json(
      new ApiResponse(200, result, "Messages marked as read successfully")
    );
  } catch (error) {
    console.log("Error in markMessagesAsRead:", error);

    if (error instanceof mongoose.Error) {
      throw new ApiError(500, "Database Error");
    } else {
      throw new ApiError(500, "Internal Server Error1");
    }
  }
});

const getUnreadCount = async (req, res) => {
  const {roomId} = req.params;

  if(!roomId) {
    throw new ApiError(400, "roomId is required");
  }
  try {
    
    const unreadCount = await Message.countDocuments(
      {
        room: roomId,
        isRead: false
      }
    )
  
    res
    .status(200)
    .json(new ApiResponse(200, "Unread messages count retrieved successfully", unreadCount));
    
  } catch (error) {

    console.log("error in getUnreadCount:", error);
    throw new ApiError(500, "Internal Server Error");
    
  }
}

const reactToMessage = async (req, res) => {
  const {messageId} = req.params
  const {reaction} = req.body

  if(!messageId || !reaction) {
    throw new ApiError(400,"messageId and reaction are required");
  }
  try {
    
    const message = await Message.findById(messageId);
  
    if(!message) {
      throw new ApiError(404,"Message not found");
    }
  
    // Check if the user has already reacted to the message
  
    const existingReaction = message.reactions.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
  
    if(existingReaction) {
      existingReaction.reaction = reaction
    }
    else {
      message.reactions.push({
        user: req.user._id,
        reaction:reaction
      })
    }
  
    await message.save({validateBeforeSave: false});
  
    res
    .status(200)
    .json(new ApiResponse(200, "Reaction added successfully", message));
      
  } catch (error) {
    console.log("error in reactToMessage:", error);
    throw new ApiError(500, "Internal Server Error");
  }
}

const uploadMediaMessage = async (req, res) => {
  // Handle media upload logic here
}   

const pinMessage = async (req, res) => {
  // Handle pinning message logic here
  const {messageId} = req.params;

  if(!messageId) {
    throw new ApiError(400,"messageId is required");
  }
  try {
    
    const message = await Message.findById(messageId);
  
    if(!message) {
      throw new ApiError(404,"Message not found")
    }
  
    message.isPinned = !message.isPinned;
  
    await message.save({validateBeforeSave: false});
  
    res
    .status(200)
    .json(new ApiResponse(200, "Message pin status updated successfully", message));
    
  } catch (error) {
    console.log("error in pinMessage:", error);
    throw new ApiError(500, "Internal Server Error");
  }
}


export {
  sendMessage,
  getMessagesForRoom,
  deleteMessage,
  editMessage,
  getMessageById,
  markMessagesAsRead,
  getUnreadCount,
  reactToMessage,
  uploadMediaMessage,
  pinMessage,
};
