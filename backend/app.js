import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

import healthCheckRoutes from "./routes/healthcheck.router.js"
import userRoutes from "./routes/user.router.js"



app.use("/api/Healthcheck", healthCheckRoutes)
app.use("/api/Users", userRoutes)

//app.use("/api/messages",messageRoutes)

export default app