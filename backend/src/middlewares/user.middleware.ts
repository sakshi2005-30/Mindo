import jwt from "jsonwebtoken";
import type {Request,Response,NextFunction} from "express";

interface JwtPayload{
    userId:string;
}
export const userMiddleware=(req:Request,res:Response,next:NextFunction):void=>{
    try{
        const token=req.cookies?.token;
        if(!token){
            res.status(201).json({
                message:"You are not authenticated"
            })
            return;
        }
        const secret=process.env.JWT_SECRET;
        if(!secret){
           throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded=jwt.verify(token,secret) as JwtPayload;
        req.userId=decoded.userId;
        next();
    }
    catch(error){
        res.status(403).json({
             message:"Invalid or expired token"
        })
    }
};