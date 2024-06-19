import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/User';
import { IAdmin, IUser } from '../interface';
import Admin from '../model/Admin';

dotenv.config()

export const register = async (req: Request, res: Response) => {
  try{
    const {name, email, password, isAdmin}:IUser = req.body
    
    const user = await User.findOne({email})
    if(user)  return res.status(409).json({message: 'Email registered as user'})

    const admin = await Admin.findOne({email})
    if(admin)  return res.status(409).json({message: 'Admin already exists'})
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new Admin ({
      name,
      email,
      password:  hashedPassword,
    })
    const savedUser = await newUser.save()
    savedUser.password = ''

    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET)
    res.cookie('token', token, {httpOnly: true, secure: true})
    console.log(savedUser);

    const returnUser = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin
    }
    
    res.status(201).json(returnUser)
  }
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: 'error in registering user'})
    }
  }
}

export async function login (req: Request, res: Response){
  try{
    let {email, password, isAdmin}: IUser = req.body
    console.log('login');
    let user: IUser | IAdmin | null;
    
    const admin = await Admin.findOne({email});
    if(!admin){
      const anyUser = await User.findOne({email})
      if(!anyUser) 
        return res.status(404).json({message: 'user not found'})
      if(anyUser.disabled) 
        return res.status(403).json({message: 'user is disabled'})
      
      user = anyUser
      isAdmin = false
    }
    else{
      user = admin
    }
    
    if(user.password){
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(401).json({message: 'incorrect password'})
    }    
    user.password = ''

    console.log(user);
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const token = jwt.sign({ user }, process.env.JWT_SECRET)
    res.cookie('token', token, {httpOnly: true, secure: true})
    
    const returnUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
    
    res.status(200).json(returnUser)
  }
  catch{(err: unknown) => {
    console.log(err);
    res.status(500).json({message: err})
  }}
}

export const logout = (req: Request, res: Response)=>{
  try{
    console.log(req.cookies)
    res.clearCookie('token')
    res.status(200).json({message: 'user logged out'})
  } 
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: err})
    }
  }
}


export const verifyAuth = async (req: Request, res: Response)=>{
  try{
    const cookie = req.cookies
    if(cookie.token === undefined) return res.json({message: "no cookie found", auth: false})
    
    const token = cookie.token
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret required', auth: false})
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    delete verified.user.password;
    console.log('middleware', verified.user);

    if(!verified.user.isAdmin){
      const checkUser = await User.findById(verified.user._id)
      if(!checkUser){
        return res.json({message: "user deleted or disabled", auth: false})
      }
    }
    
    if(!verified) return res.json({message: "invalid token", auth: false})
    const user = {
      _id: verified.user._id,
      name: verified.user.name,
      email: verified.user.email,
      isAdmin: verified.user.isAdmin
    }
    
    res.status(200).json(user)
  }
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: err, auth: false})
    }
  }
} 