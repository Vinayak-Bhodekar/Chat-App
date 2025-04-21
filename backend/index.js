import express from "express"
import dotenv from "dotenv"
import http from "http"
import connectDB from "./config/db.js"
import path from "path"

dotenv.config()
connectDB()

const app = express()

const server = http.createServer(app)
app.use(express.static(path.resolve("./public")))

app.get("/", (req,res) => {
    return res.sendFile("./public/index.html")
})

app.listen(process.env.PORT,() => {
    console.log(`the server is run on port ${process.env.PORT}`)
})