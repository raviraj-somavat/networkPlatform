import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

// CORS configuration to allow credentials and requests from Vite frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('API is running')
})

app.listen(port, async () => {
  await connectDB()
  console.log(`Server is running on port ${port}`)
})