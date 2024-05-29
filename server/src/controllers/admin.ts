import {Response, Request} from 'express'
import User from '../model/User';
import { IUser, IInvitedUser } from '../interface';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { sendEmail } from '../services/nodemailer';

dotenv.config()


export const deleteUsers = async (req: Request, res: Response) =>{
  try{
    const {id: userId} = req.params;
    console.log(userId);
    const user = await User.findByIdAndDelete(userId)
    
    if(!user)
      return res.status(404).json({message: 'user not found'})
    console.log(user);
    res.status(200).send('user deleted')
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in deleting user')
    }
  }
}


export const disableUsers = async (req: Request, res: Response) =>{
  try{
    const {id: userId} = req.params;
    const user = await User.findById(userId)

    if(!user)
      return res.status(404).json({message: 'user not found'})
    user.disabled = true;
    const disableUsers = await user.save()
    console.log(disableUsers);
    res.status(200).send('user disabled')
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in disable user')
    }
  }
}


export const createUserAndInvite = async (req: Request, res: Response) =>{
  try{
    const {name, email}:IInvitedUser = req.body
    
    const user = await User.findOne({email})
    if(user)  return res.status(409).json({message: 'User already exists'})
    
    
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const invitationToken = jwt.sign({ name: name, email: email }, process.env.JWT_SECRET)
    
    res.cookie('invitationToken', invitationToken, {httpOnly: true, secure: true})
    
    //send email 
    const url = `${process.env.FRONTEND_URL}/invite/setPassword/${invitationToken}`
    const message = `Your username: ${name} , Your email: ${email} , Set password to join ${url}`
    sendEmail(email, 'This is an invitation', message)
    
    res.status(201).json('sending invitation email')
  }
  catch(err: unknown){
    console.log(err);
    res.status(500).json({message: 'error in sending email by admin'});
  }
}


export const invitaionSetPassword = async (req: Request, res: Response) => {
  try{
    const {invitationToken, password} = req.body

    const cookie = req.cookies
    console.log('cookie', cookie);
    
    if(cookie.invitationToken === undefined) return res.json({message: "no invite token found"})

    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret type error'})
    const verified = jwt.verify(invitationToken, process.env.JWT_SECRET) as JwtPayload
    console.log('updatePassword', verified);
    if(!verified)
      return res.status(400).json({message: 'getting request from invalid url'})

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User ({
      name: verified.name,
      email: verified.email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    console.log(savedUser);

    res.clearCookie('invitationToken')
    
    res.status(200).send('password updated successfully')
  }
  catch{
    (err:unknown) => {
      console.log(err)
      res.status(500).send('error in setting password')
    }
  }
}


export const sendInvitation = async (req: Request, res: Response) => {
  try{
    const {email} = req.params

    //send invitaion again

    res.send(200).json({message: 'invitation send by admin'});
  }
  catch(err: unknown)  {
    console.log(err);
    res.status(500).json({message: 'error in sending invitation again'});
  }

}