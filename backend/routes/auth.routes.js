import express from "express"
import { signIn, signout, signUp } from "../controllers/auth.controllers.js"

const authRouter=express.Router()
authRouter.post("/signUp",signUp)
authRouter.post('/signIn',signIn)
authRouter.get('/signout',signout)

export default authRouter