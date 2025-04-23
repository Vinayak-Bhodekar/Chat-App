import mongoose from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
    userName : {
        type: String,
        required: true,
        unique: true
        },
    password : {
        type: String,
        required: true,
        },
    email : {
        type: String,
        required: true,
        unique: true
        },
    firstName : {
        type: String,
        required: true,
        },      
    lastName : {    
        type: String,
        required: true,
        },
    socketId: {
        type:String,
        }   
    },
    {
        timestamps:true
    })

export const User = mongoose.model("User",userSchema)