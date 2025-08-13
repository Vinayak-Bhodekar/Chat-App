import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import OTPGenerator from "../utils/OTPGenerator.js";
import sendOTP from "../utils/sendEmails.js";


let otpStore = {};

const generateAccessAndRefreshToken = async (userId) => {

    try {
        const user = await User.findOne({_id:userId})
    
        if(!user) {
            throw new ApiError(404,"User not found")
        }
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}

    } catch (error) {

        console.log("error in generating access and refresh token",error)
        throw new ApiError(500,"Internal server error")
    }
}

const registerUser = asyncHandler(async (req,res) => {
    console.log("register user")
    const {userName,password,email,firstName,lastName} = req.body

    if([userName,password,email,firstName,lastName].some((field) => field?.trim() === "")) {
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [
            {userName: userName},
            {email: email}
        ]
    })
    
    console.log(existingUser)

    if(existingUser) {
        throw new ApiError(400,"User already exists")
    }

    try {
        const user = await User.create({
            userName:userName,
            password:password,
            email:email,
            firstName:firstName,
            lastName:lastName 
        })
    
        if(!user) {
            throw new ApiError(400,"User not created")
        }

        res
        .status(201)
        .json(new ApiResponse(201,"User created successfully",user))

    } catch (error) {
        console.log("error in register",error)
        throw new ApiError(501,"Internal server error")
    }

})

const logInUser = asyncHandler(async (req,res) => {

    const {identity,password} = req.body

    if(!identity || !password) {
        throw new ApiError(400,"Email and password are required")
    }

    const user = await User.findOne({
        $or:[{email:identity},{userName:identity}]
    }).select("+password")

    if(!user) {
        throw new ApiError(401,"Invalid email or password")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect) {
        throw new ApiError(401,"Invalid credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave:false})

    const option = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production"
    }

    return res.status(200)
    .cookie("refreshToken",refreshToken,option)
    .cookie("accessToken",accessToken,option)
    .json(new ApiResponse(200,"User logged in successfully",user))

})

const logOutUser = asyncHandler(async (req,res) => {
    
    const user = req?.user._id
    
    await User.findByIdAndUpdate(
        user,
        {
            $set: {
                refreshToken: null,
                socketId: null
            }
        },
    {new:true}
    )

    const option = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production"
    }

    res
    .status(200)
    .cookie("refreshToken",null,option)
    .cookie("accessToken",null,option)
    .json(new ApiResponse(200,"User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req,res) => {
    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    

    if(!incommingRefreshToken) {
        throw new ApiError(401,"Unauthorized access")
    }

    try {
        
        const decodedToken = jwt.verify(incommingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken.id).select("+refreshToken")

        if(!user) {
            throw new ApiError(401,"Unauthorized access")
        }

        if(user.refreshToken !== incommingRefreshToken) {
            throw new ApiError(401,"Unauthorized access")
        }
        const {accessToken} = await generateAccessAndRefreshToken(user._id)
        
        const option = {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production"
        }

        res
        .status(200)
        .cookie("accessToken",accessToken,option)
        .json(new ApiResponse(200,"Access token refreshed successfully"))

    } catch (error) {
        throw new ApiError(401,"Unauthorized access",error)
    }
})

const changePasssword = asyncHandler(async (req,res) => {
    const {oldPassword,newPassword} = req.body

    if(!oldPassword || !newPassword) {
        throw new ApiError(400,"All fields are required")
    }

    try {
        const user = await User.findById(req.user._id).select("+password")
    
        if(!user) {
            throw new ApiError(404,"User not found")
        }
    
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
        console.log("isPasswordCorrect",isPasswordCorrect)
    
        if(!isPasswordCorrect) {
            throw new ApiError(401,"Invalid credential")
        }
    
        user.password = newPassword
    
        await user.save({validateBeforeSave:false})
    
        res.status(200).json(new ApiResponse(200,"Password changed successfully"))
    } catch (error) {
        console.log("error in changing password",error)
        throw new ApiError(500,"Internal server error")
    }
})

const getLoggedInUser = asyncHandler(async (req,res) => {
    const userId = req.user._id

    if(!userId) {
        throw new ApiError(404,"User not found")
    }

    try {
        const user = await User.findById(userId)
        
        if(!user) {
            throw new ApiError(400,"User not found")
        }
    
        res
        .status(200)
        .json(new ApiResponse(200,"user found",user))
    } catch (error) {
        console.log("no user found, error:-",error)
        throw new ApiError(404,"User Not found")
    }
})

const OTPsender = asyncHandler(async (req,res) => {

    const userId = req.user._id
    
    

    if(!userId) {
        throw new ApiError(404,"User not found")
    }

    try {

        const user = await User.findById(userId)

        if(!user) {
            throw new ApiError(400, "User not found in DB")
        }

        if (user.isVarified) {
            throw new ApiResponse(200,"User Email is already verified")
        }

        const otp = OTPGenerator()
        otpStore[user.email] = {otp, expires: Date.now()+5*60*1000}
        console.log(user.email)
        await sendOTP(user.email,otp)

        res
        .status(200)
        .json(new ApiResponse(200,"OTP is sent to Email successfully"))


        
    } catch (error) {
        console.log("Cant Send OTP",error)
        throw new ApiError(400,"Cant Send OTP",error)
    }
})

const OTPVerification = asyncHandler( async (req,res) => {
    console.log("hello")
    console.log(req.body);


    const {otp} = req.body;


    console.log(data)

    const userId = req.user._id

    if(!userId) {
        throw new ApiError(404,"User not found")
    }

    if(!otp) {
        throw new ApiError(400,"OTP is required for Verification")
    }

    try {
        const user = await User.findById(userId);

        if(!user) {
            throw new ApiError(400, "User not found in DB")
        }

        if(otp !== otpStore[email].otp) {
            throw new ApiError(401, "Invalid OTP")
        }
        else {
            if(otpStore[email].expires > Date.now()){
                user.isVarified = true
                await user.save({validateBeforeSave:false})
                res
                .status(200)
                .json(new ApiResponse(200,"Successfully verified", user))
            }
        }

    } catch (error) {
        throw new ApiError(400,"Error in Verification email",error)
    }
})

export {
    registerUser,
    logInUser,
    logOutUser,
    refreshAccessToken,
    changePasssword,
    getLoggedInUser,
    OTPsender,
    OTPVerification
}