import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createOrGetRoom = asyncHandler(async (req,res) => {
    const {targetUserId} = req.body
    const loggedInUsserId = req.user._id

    if(!targetUserId) {
        throw new ApiError(400,"target user id  is required")
    }

    let room = await Room.findOne({
        isGroupChat: false,
        members: {$all: [loggedInUsserId,targetUserId],$size:2},
    }).populate("members -pass")
})
const getMyRooms = asyncHandler(async (req,res) => {

})
const createGroupRoom = asyncHandler(async (req,res) => {

})
const renameGroupRoom = asyncHandler(async (req,res) => {

})
const addToGroup = asyncHandler(async (req,res) => {

})
const removeToGroup = asyncHandler(async (req,res) => {

})

