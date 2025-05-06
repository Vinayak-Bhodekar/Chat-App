import mongoose, {Schema} from "mongoose"

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required: true
    },
    content: {
        type: String,
        trim:true,
        required: true
    }
    },
    {
        timestamps:true
    }
)

export const Message = mongoose.model("Message",messageSchema)