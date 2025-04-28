import mongoose ,{Schema} from "mongoose";

export interface Message {
    content:string;
    createdAt:Date
}

export interface User {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    isVerified:boolean;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    message:Message[]
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true , 
        default:Date.now
    }

})

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,"Please fill a valid email address"]

    },
    password:{
        type:String,
        required:[true , "Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true , "VerifyCode is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true , "VerifyCodeExpiry is required"]
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , UserSchema) 
export default UserModel;