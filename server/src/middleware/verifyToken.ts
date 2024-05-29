import express, { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const verifyToken = (req: Request, res: Response, next: NextFunction)=>{
  try{
    const cookie = req.cookies
    console.log('verifyToken', cookie.token)
    if(cookie.token === undefined) return res.json({message: "no cookie found", auth: false})
    
    const token = cookie.token
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret required', auth: false})
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    
    if(!verified) return res.json({message: "invalid token", auth: false})
    
    console.log('Token verified');

    next()
  }
  catch{(err: unknown) => {
      console.log(err);
      res.status(500).json({message: err, auth: false})
    }
  }
} 