import {
    handleJoinRoom,
    handleSendMessage,  
    handleTyping,
    handleStopTyping,
    handleDisconnect
} from "../controllers/socket.controller.js";

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id)

        socket.on("joinRoom", (data) => handleJoinRoom(socket,data))

        socket.on("sendMessage", (data) => handleSendMessage(io,socket,data));
        
        socket.on("typing", (data) => handleTyping(socket,data));

        socket.on("stopTyping", (data) => handleStopTyping(socket,data));

        socket.on("disconnected", () => handleDisconnect(socket));
    });
}

export {socketHandler};