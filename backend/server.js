import dotenv from "dotenv"
import http from "http"
import connectDB from "./config/db.js"
import { Server } from "socket.io"
import {app} from "./app.js"
//import {socketHandler} from "./sockets/chat.js"

dotenv.config()
connectDB()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
})

//socketHandler(io)

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})