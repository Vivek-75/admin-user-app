import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../services/nodemailer";
import dotenv from 'dotenv'

dotenv.config()


export const getUsers = async (req: Request, res: Response) => {
  try{
    console.log('getuesrs');
    
    const user = await User.find({isAdmin: false}).select('-password')
    res.status(200).send(user)
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in fetching user')
    }
  }
}


export const verifyEmail = async (req: Request, res: Response) => {
  try{
    const {email} = req.body
    // console.log(email);
    const user = await User.findOne({email})
    console.log('verifyEmail', user);
    
    if(!user)
      return res.status(404).json({message: 'user not found'})

    // const salt = await bcrypt.genSalt()
    // const hashedPassword = await bcrypt.hash(email, salt)

    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const resetToken = jwt.sign({ email: email }, process.env.JWT_SECRET)
    
    res.cookie('resetToken', resetToken, {httpOnly: true, secure: true})
   
    //send email 
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`
    const message = `Reset your password using ${url}`
    sendEmail(email, 'Reset Password', message)

    res.status(200).send('sending email...') 
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in password update')
    }
  }
}


export const updatePassword = async (req: Request, res: Response) => {
  try{
    const {resetToken, password} = req.body

    const cookie = req.cookies
    console.log('cookie', cookie);
    
    if(cookie.resetToken === undefined) return res.json({message: "no reset token found"})

    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const verified = jwt.verify(resetToken, process.env.JWT_SECRET) as JwtPayload
  
    console.log('updatePassword', verified);
    if(!verified)
      return res.status(404).json({message: 'invalid token'})

    const user = await User.findOne({email: verified.email})
    if(!user)
      return res.status(404).json({message: 'user not found'})
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    user.password = hashedPassword;
    const savedUser = await user.save()
    console.log(savedUser);

    res.clearCookie('resetToken')
    
    res.status(200).send('password updated successfully')
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in password update')
    }
  }
}