import express from 'express' 
import dotev from 'dotenv'
import connectDB from'./config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
dotev.config()
const app=express()
let port =process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser(                  ))
app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(port,async()=>{
    await connectDB();
    console.log(`server is running`)
    
})