import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username must be required'],
        unique:[true,'username must be unique']
    },
    email:{
        type:String,
        required:[true,'email must be required'],
        unique:[true,'email must be unique']
    },
    password:{
        type:String,
        required:[true,"password must be reuired"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel