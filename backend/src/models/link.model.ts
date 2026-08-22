import {model,Schema,Document,Types} from "mongoose"

export interface ILink{
    hash:string,
    userId:Types.ObjectId
}
const linkSchema=new Schema<ILink>({
    hash:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
        unique:true
    }
})
export const Link=model<ILink>("Link",linkSchema);