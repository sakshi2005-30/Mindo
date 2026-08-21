import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectToDB=async():Promise<void>=>{
    const mongoUri=process.env.DATABASE_URI;
    if(!mongoUri){
        throw new Error("Database url is not declared in the .env file")
    }
    try{
        await mongoose.connect(mongoUri);
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Error occured in connecting database:",error);
        process.exit(1);
    }
}
