import express, { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const verifyAuth = (req: Request, res: Response)=>{
  try{
    const cookie = req.cookies
    if(cookie.token === undefined) return res.json({message: "no cookie found", auth: false})
    
    const token = cookie.token
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret required', auth: false})
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    delete verified.user.password;
    console.log('middleware', verified.user);
    
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