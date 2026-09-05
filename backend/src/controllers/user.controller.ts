import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import cookie from "cookie-parser";
import type {Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction, // Required when sameSite is "none"
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 24 * 60 * 60 * 1000,
};
const generateToken=(id:string,res:Response):string=>{
    const secret=process.env.JWT_SECRET;
    if(!secret){
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    const token=jwt.sign({userId:id},secret,{expiresIn:"7d"});
    res.cookie("token",token,COOKIE_OPTIONS);
    return token;
}
export const signup=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
           res.status(400).json({
                message:"All fields are required"
            })
            return;
        }
        const existingUser=await User.findOne({username});
        if(existingUser){
            res.status(409).json({
                message:"User already exists please signin"
            })
            return;
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            username,email,password:hashPassword
        });
        generateToken(newUser._id.toString(),res);
        res.status(201).json({
            message:"User registered sucessfully",
            user:{
                id:newUser._id,
                username,
                email
            }
        });
    }
    catch(error){
        console.log("Error in registering user",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const signin=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            res.status(400).json({
                message:"All fields are requried"
            });
            return;
        }
        const existingUser=await User.findOne({username});
        if(!existingUser ){
            res.status(401).json({
                message:"Invalid credintials"
            })
            return;
        }
        const comparePassword=await bcrypt.compare(password,existingUser.password);
        if(!comparePassword){
              res.status(401).json({
                message:"Invalid credintials"
            })
            return;
        }
        const token=generateToken(existingUser._id.toString(),res);
        res.status(200).json({
            message:"User logged in successfully",
            token,
            user:{
                id:existingUser._id,
                username,
                email:existingUser.email
            }
        })
    }
    catch(error){
        console.error("Error in signin controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logout=async(req:Request,res:Response):Promise<void>=>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            message:"User logged out successfully"
        })
    }
    catch(error){
        console.log("Error in logging out user",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const me=async(req:Request,res:Response):Promise<void>=>{
    try{
       const id=req.userId;
       if(!id){
        res.status(400).json({
            message:"User should be authenticated"
        });
        return;
       }
       const user=await User.findById(id);
       if(!user){
        res.status(400).json({
            message:"No such user present"
        });
        return;
       }
       res.status(200).json({
        user:user
       })

    }
    catch(error){
        console.log("Error in getting user",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}