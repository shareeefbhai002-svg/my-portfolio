import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
const app = express()
const PORT = process.env.PORT || 5000;
//middlewares
app.use(cors({
  origin: 'localost:5173'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongodb connection function
connectDB();


//routes
app.get("/", (req, res) => {
  res.send("APi is running completeldy fine")
})
  
app.use("/api/auth" , authRouter)

if(process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
  console.log("serever runnning at port 3k")
})
}
export default app;


 