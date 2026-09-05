import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import { connectToDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import contentRoutes from "./routes/content.routes.js"
import linkRoutes from "./routes/link.routes.js"
import cookieParser from "cookie-parser";
const app=express();
const rawFrontendUrl = process.env.FRONTEND_URL || "";
const cleanFrontendUrl = rawFrontendUrl.replace(/\/$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  cleanFrontendUrl,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/content",contentRoutes);
app.use("/api/v1/brain",linkRoutes)
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
