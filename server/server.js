import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDb from "./Lib/db.js"
import UserRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()

app.use(cors()) 
app.use(express.json())

app.use("/api",UserRoutes)

connectDb()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`); 
})