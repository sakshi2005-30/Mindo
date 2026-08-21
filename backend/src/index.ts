import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/db.js";

const app=express();
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
