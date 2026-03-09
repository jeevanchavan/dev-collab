import express from 'express'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser())

import authRouter from './routes/auth.route.js';
import problemRouter from './routes/problem.route.js';
app.use("/api/auth",authRouter)
app.use("/api/problems",problemRouter)

export default app;