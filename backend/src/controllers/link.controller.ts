import { Link } from "../models/link.model.js";
import { Content } from "../models/content.model.js";
import type { Request,Response } from "express";
import crypto from "crypto"
import { User } from "../models/user.model.js";
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
        const {share}=req.body;
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
export const getPublicBrain=async(req:Request,res:Response):Promise<void>=>{
    try{
       const {sharelink}=req.params;
       if(!sharelink){
        res.status(400).json({
            message:"sharelink is required "
        })
        return;
       }
       const link=await Link.findOne({hash:sharelink});
       if(!link){
        res.status(404).json({message:"Invalid sharelink"});
        return;
       }
       const user=await User.findOne({_id:link.userId}).select("username email").exec();
       const content=await Content.find({userId:link.userId}).exec();
       res.status(200).json({
        message:"Public share content fetched sucessfully",
        user,
        content:content
       })
    }
    catch(error){
        console.log("Error in public share brain",error);
        res.status(500).json({
            message:"Internal server error"
        }) 
    }
}