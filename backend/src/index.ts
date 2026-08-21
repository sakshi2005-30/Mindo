import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRoutes);
const PORT:number=Number(process.env.PORT) || 3000;
const startServer=async():Promise<void>=>{
    try{
        await connectToDB();
        app.listen(PORT,()=>{
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    }
    catch(error){
        console.log("Error in starting server",error);
        process.exit();
    }
}
startServer();
