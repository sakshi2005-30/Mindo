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
        types:Schema.Types.ObjectId,
        required:true,
        ref:"user",
        unique:true
    }
})
export const Link=model<ILink>("Link",linkSchema);