import genToken from "../config/token.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
export const signUp=async(req,res)=>{
    try{
        let {firstName,lastName,email,userName,password}=req.body
        let exist_email=await User.findOne({email})
        if(exist_email) 
            return res.status(400).json({msg:"E-mail already exist"})
        let exist_userName=await User.findOne({userName})
        if(exist_userName)
            return res.status(400).json({msg:"UserName already exist"}) 
        let hashPassword=await bcrypt.hash(password,12)
        const user= await User.create({
            firstName,
            lastName,
            email,
            userName,
            password:hashPassword
        })
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:process.env.NODE_ENV==="production"
        })
       return res.status(201).json({msg:"User is created"})

        

    }catch(error){
      return  res.status(500).json({msg:error})
    }
}
export const signIn=async(req,res)=>{
    try{
        let {email,password}=req.body
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"user doesnot exist"})
        }
        
        let isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.status(400).json({msg:"inncorrect password"})
        }
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENV==='production'
        })
        return res.status(200).json({msg:"user logedIn"})
    }
    catch(error){
        res.status(500).json({msg:"signIn error"})
        console.log(error)
    }
}
export const signout=async(res,req)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({msg:"loged out successfully"})
    } catch (error) {
        res.status(500).json({msg:"error while signout"})
        
    }
}