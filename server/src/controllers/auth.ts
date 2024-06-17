import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
    const {email, password, isAdmin}: IUser = req.body
    console.log('login');
    let user: IUser | IAdmin | null;
    // let user
    if(isAdmin){
      user = await Admin.findOne({email});
    }
    else{
      user = await User.findOne({email})
    }
    if(!user) return res.status(404).json({message: 'user not found'})
    if(!isAdmin && user.disabled) return res.status(403).json({message: 'user is disabled'})
      
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
