

const handleJoinRoom = (socket, {roomId, userId}) => {
  socket.join(roomId)
  console.log(`${userId} joined room: ${roomId}`)
  socket.to(roomId).emit("userJoined", {userId})
}

const handleSendMessage = (io,socket, {roomId,senderId,text}) => {
  const message = {
    senderId,
    text,
    createdAt: new Date()
  }

  io.to(roomId).emit("newMessage", message)
}

const handleTyping = (socket, {roomId,userId}) => {
  socket.to(roomId).emit("userTyping", {userId})
}

const handleStopTyping = (socket, {roomId,userId}) => {
  socket.to(roomId).emit("userStoppedTyping", {userId})
}

const handleDisconnect = (socket) => {
  console.log("Client disconnected:", socket.id)
}

export {
  handleJoinRoom,
  handleSendMessage,
  handleTyping,
  handleStopTyping,
  handleDisconnect
};