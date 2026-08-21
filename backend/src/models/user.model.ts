import {Schema,model,Document} from "mongoose";
export interface IUser extends Document{
    username:string,
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date
};

const userSchema=new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,"minimum requried length is 3"],
        maxlength:[30,"maximum allowed length is 30"],
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
       
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please valid email address"]
    },
    password:{
        type:String,
        required:true,
         minlength:[6,"minimum password length should be 6"]
    }
},{timestamps:true});
export const User=model<IUser>("User",userSchema);