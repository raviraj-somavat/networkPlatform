import express from 'express' 
import dotev from 'dotenv'
import connectDB from'./config/db.js'
dotev.config()
const app=express()

let port =process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(port,()=>{
    connectDB();
    console.log(`server is running`)
    
})