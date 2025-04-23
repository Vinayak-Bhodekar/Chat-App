import monggose, { Schema } from 'mongoose';    

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
})

export const Room = mongoose.model("Room", roomSchema)
