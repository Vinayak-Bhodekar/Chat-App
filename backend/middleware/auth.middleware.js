import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import {ApiError} from '../utils/apiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';


const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("authorization")?.replace("Bearer ","")

    if(!token) {
        throw new ApiError(401,"Unauthorized! Please login to access this resource.")
    }

    try {
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password")

        if(!user) {
            throw new ApiError(401,"Unauthorized! Please login to access this resource.")
        }

        req.user = user

        next()


    } catch (error) {
        throw new ApiError(401,"Unauthorized! Please login to access this resource.")
    }
})


export {verifyToken}