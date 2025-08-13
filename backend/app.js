import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
  origin: "http://localhost:5173", // exact frontend origin
  credentials: true                // allow cookies/credentials
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import { errorHandler } from './middleware/error.middleware.js';

import healthCheckRoutes from "./routes/healthcheck.router.js"
import userRoutes from "./routes/user.router.js"
import roomRoutes from "./routes/room.router.js"
import messageRoutes from "./routes/message.router.js"



app.use("/api/Healthcheck", healthCheckRoutes)
app.use("/api/Users", userRoutes)
app.use("/api/Rooms", roomRoutes)
app.use("/api/Messages", messageRoutes)


app.use(errorHandler)

//app.use("/api/messages",messageRoutes)

export {app}