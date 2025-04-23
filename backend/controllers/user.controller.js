import User from "../models/user.model.js";

const saveSocketId = async (userName, socketId) => {
    try {
        const user = await User.findOne({userName})

        if(user) {
            user
        }
    }
}