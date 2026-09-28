import express from "express"
import { signIn, signout, signUp, getMe } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post(["/signUp", "/signup"], signUp)
authRouter.post(["/signIn", "/signin"], signIn)
authRouter.get(["/signout", "/signOut"], signout)
authRouter.get("/me", getMe)

export default authRouter