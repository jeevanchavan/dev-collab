import problemModel from "../models/problem.model.js"

// create problem
export const createProblem = async (req,res) =>{
    try {
        const problem = await problemModel.create(req.body)
        return res.status(201).json({
            message:"Problem created successfully",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

// get all problems
export const getAllProblems = async (req,res)=>{
    try {
        const problems = await problemModel.find()
        return res.status(200).json({
            message:"All problems fetched successfully",
            problems
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

// get specific problem
export const getProblem = async (req,res)=>{
    try {
        const problem = await problemModel.findOne(req.params.id)
        return res.status(200).json({
            message:"Problem fetched successfully",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}