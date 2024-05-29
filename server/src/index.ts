import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from  'bcrypt'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user'
import { verifyAuth } from './middleware/verifyAuth'
import { sendEmail } from './services/nodemailer'

dotenv.config()

const app = express()
app.use(cookies())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

if(typeof process.env.MONGO_URI === 'string'){
  mongoose.connect(process.env.MONGO_URI).then((
  ) => {
    console.log('connected to db');
  }).catch((err) => {
    console.log(err);
  })
}


app.get('/', (req, res) => {
  res.json({message : "hello"})
})

// app.get('/nm', async (req, res) => {
//   try{
//     await sendEmail()
//     res.json({message : "hello"})
//   }
//   catch(err){
//     res.status(500).send(err)
//   }
// })

app.use('/auth', authRoutes)
app.post('/verifyAuth', verifyAuth)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


app.listen(8080, ()=>{
  console.log('backend -> http://localhost:3000');
})