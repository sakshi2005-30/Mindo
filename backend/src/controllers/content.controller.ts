import {Content} from "../models/content.model.js";
import type {Request,Response} from "express";

export const createContent=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {title,description,link,contentType,tags}=req.body;
        const userId=req.userId;
        if(!title || !link){
            res.status(400).json({
                message:"Title and link are required"
            })
            return;
        }
        if(!userId){
            res.status(401).json({
                message:"Unauthorized user"
            });
            return;
        }
        const newContent=await Content.create({
            title,
            description:description||"",
            link,
            contentType:contentType||"link",
            tags:Array.isArray(tags)?tags:[],
            userId
        })
        res.status(201).json({
            message:"Content added successfully",
            content:newContent
        })
    }
    catch(error){
        console.log("Error in adding content",error);
        res.status(500).json({
            message:"Internal server error"
        })

    }
}