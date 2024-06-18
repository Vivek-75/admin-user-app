import express, { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/User'

dotenv.config()


export const verifyToken = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const cookie = req.cookies
    console.log('verifyToken', cookie.token)
    if(cookie.token === undefined) 
      return next(new Error("no cookie found"))
    
    const token = cookie.token
    if(typeof process.env.JWT_SECRET !== 'string') 
      return next(new Error('jwt secret required'))
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    
    if(!verified.user.isAdmin){
      const checkUser = await User.findById(verified.user._id)
      if(!checkUser){
        return next(new Error('user disabled or deleted'))
      }
    }

    if(!verified) 
      return next(new Error("invalid token"))
    
    console.log('Token verified');

    next()
  }
  catch{(err: unknown) => {
      console.log(err);
      res.status(500).json({message: err, auth: false})
    }
  }
} 