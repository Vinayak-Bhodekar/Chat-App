/*import {saveSocketId, removesocketId,getUserByDocketId} from "../controllers/user.controller.js"
import {saveMessage,getMessages} from "../controllers/message.controller.js"


const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected", socket.id)

        socket.on("register", async (username) => {
            await saveSocketId(username,socket.id)

            console.log(`${username} registered with socket id ${socket.id}`)
        })

        socket.on("join-room", (roomName) => {
            socket.join(roomName) 
            console.log(`socket ${socket.id} joined room ${roomId}`)
        })

        socket.on("send-message", async ({room,senderId,content}) => {
            const message = await saveMessage(room,senderId,content)
            io.to(room).emit("receive-message",message)
        })

        socket.on("disconnect",async () => {
            console.log("A user disconnected:",socket.id)

            await removesocketId(socket.id)
        })
    })
}*/