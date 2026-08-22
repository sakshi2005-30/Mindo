import { Link } from "../models/link.model.js";
import { Content } from "../models/content.model.js";
import type { Request,Response } from "express";
import crypto from "crypto"
const generateHash=(length=10):string=>{
    const h=crypto.randomBytes(length).toString("hex").slice(0,10);
    return h;
}
export const shareBrain=async(req:Request,res:Response):Promise<void>=>{
    try{
        const userId=req.userId;
        if(!userId){
            res.status(401).json({message:"Unauthorized user"});
            return;
        }
        const {share}=req.query;
        if(share){
            const link=await Link.findOne({userId});
            if(link){
                res.status(200).json({
                    message:"Share link already exists",
                    hash:link.hash
                })
                return;
            }
            const hash=generateHash(10);
            const createLink=await Link.create({userId,hash});
            res.status(201).json({
                message:"Share link generated successfully",
                hash
            })
        }
        else{
            const delLink=await Link.deleteOne({userId}).exec();
            res.status(200).json({
                message:"Share link removed successfully"
            })
        }
    }
    catch(error){
        console.log("Error in generating sharelink",error);
        res.status(500).json({
            message:"Internal server error"
        }) 
    }
}
