import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const socketAuthMiddleware = async (socket,next) => {
    try {
        const token = socket.handshake.auth.token;

        if(!token) {
            throw new ApiError(400,"Authentication token missing");
        }

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded._id).select("-password")

        if(!user) {
            return new ApiError(404,"User not found");
        }

        socket.user = user

        next()
    }

    catch(err) {
        console.log("error found",err)
        throw new ApiError(400,"Error found",err)
    }
}

export {socketAuthMiddleware}