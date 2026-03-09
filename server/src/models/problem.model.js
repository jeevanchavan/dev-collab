import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title must be required"]
    },
    difficulty:{
        type:String,
        Enum:["Easy","Medium","Hard"]
    },
    description:{
        type:String,
        required:true
    },
    starterCode:{
        javascript:String,
        python:String,
        java:String
    },
    testCases:[
        {
            input:String,
            output:String
        }
    ]
},{timestamps:true})

const problemModel = mongoose.model("problems",problemSchema)

export default problemModel;