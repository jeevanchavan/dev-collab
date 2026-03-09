import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req,res)=>{
    const {username,email,password} = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
    )

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            createdAt:user.createdAt
        }
    })
}

export const loginUser = async (req,res)=>{
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordVaild = await bcrypt.compare(password,user.password)

    if(!isPasswordVaild){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"user loggedIn successfully",
        user:{
            id:user._id,
            email:user.email,
            username:user.username,
            createdAt:user.createdAt
        }
    })
}

export const getMeUser = async (req,res)=>{
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    return res.status(200).json({
        message:"user fetched successfully",
        user
    })

}

export const logoutUser = async (req,res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"token not provided"
        })
    }

    res.clearCookie("token");

    return res.status(200).json({
        message:"user logged out successfully"
    })
}

