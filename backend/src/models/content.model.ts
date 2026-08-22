import {Schema,Document,model,Types} from "mongoose";
export type ContentType="twitter"|"youtube"|"link";
export interface IContent extends Document{
    title:string,
    description?:string,
    tags:string[],
    link:string,
    contentType:ContentType,
    userId:Types.ObjectId,
    createdAt:Date,
    updatedAt:Date
}
export const contentSchema=new Schema<IContent>({
    title:{
        type:String,
       required:[true,"title is required"],
        trim:true
    },
    description:{
        type:String,
        default:"",
        trim:true
    },
    link:{
        type:String,
        required:[true,"link is required"],
        trim:true
    },
    contentType:{
        type:String,
        enum:["twitter","youtube","link"],
        default:"link"
    },
    tags:[{
        type:String,
        trim:true,
        lowercase:true
    }],
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{timestamps:true});
contentSchema.index({userId:1,tags:1});
contentSchema.index({title:1,description:1});
export const Content=model<IContent>("Content",contentSchema);