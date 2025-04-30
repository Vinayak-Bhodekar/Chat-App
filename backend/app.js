import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.json())

import healthCheckRoutes from "./routes/healthcheck.router.js"
//import userRoutes from "./routes/user.router.js"


app.use("/api/Healthcheck", healthCheckRoutes)
//app.use("/api/users", userRoutes)
//app.use("/api/messages",messageRoutes)

export default app