import express, { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const verifyAdmin = (req: Request, res: Response, next: NextFunction)=>{
  try{
    const cookie = req.cookies
    if (!cookie.token) 
      return next(new Error('No cookie found'));

    const token = cookie.token;
    if (typeof process.env.JWT_SECRET !== 'string') 
      return next(new Error('JWT secret required'));
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    delete verified.user.password;
    console.log('middleware', verified.user);
    
    if(!verified) 
      return next(new Error('Invalid token'));

    if(!verified.user.isAdmin) 
      return next(new Error('You are not admin'));
    
    console.log('you are admin');

    next()
  }
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: err, auth: false})
    }
  }
} 