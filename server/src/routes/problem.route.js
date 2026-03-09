import express from 'express'
import { createProblem, getAllProblems, getProblem } from '../controllers/problem.controller.js'

const problemRouter = express.Router()

problemRouter.post("/",createProblem)
problemRouter.get("/",getAllProblems)
problemRouter.get("/:problemId",getProblem)

export default problemRouter