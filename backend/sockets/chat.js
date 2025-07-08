const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.group("New client connected:", socket.id)

        socket.on("joinRoom", ({roomId,userId}) => {
            socket.join(roomId);
            console.log(`${userId} joined room: ${roomId}`)
            socket.to(roomId).emit("userJoined",{userId})
        })

        socket.on("sendMessage", ({roomId,senderId,text}) => {
            const message = {
                senderId,
                text,
                createdAt: new Date()
            }

            io.to(roomId).emit("newMessage",message)
        });
        
        socket.on("typing", ({roomId,userId}) => {
            socket.to(roomId).emit("userTyping",{userId})
        });

        socket.on("disconnected", () => {
            console.log("Client disconnected:", socket.id)
        });
    });
}

export {socketHandler};