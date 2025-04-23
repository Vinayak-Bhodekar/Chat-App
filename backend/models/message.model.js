import mongoose, {Schema} from "mongoose"

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    },
    {
        timestamps:true
    }
)

export const Message = mongoose.model("Message",messageSchema)