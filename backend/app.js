import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.json())

import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

app.use("/api/users", userRoutes)
app.use("/api/messages",messageRoutes)

export default app