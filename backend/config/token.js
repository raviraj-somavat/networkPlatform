import jwt from "jsonwebtoken"

const genToken=(userId)=>{
    try {
        let token= jwt.sign({userId},process.env.JWT_SEC,{expiresIn:"7d"})
        return token;
    } catch (error) {
        console.log(error)
    }
}
export default genToken