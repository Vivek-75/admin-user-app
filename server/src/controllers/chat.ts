import express, { Request, Response } from 'express'
import Chat from '../model/Chat'
import User from '../model/User'
import { IUser } from '../interface'



export const getChat = async (req: Request, res: Response) => {
  try{
    const {senderId, receiverId} = req.body

    if(!senderId || !receiverId ) 
      return res.status(400).json({message: 'did not get senderId or receiverId'})

    const chat = await Chat.find({
      $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId }
      ]
    }).select('senderId receiverId message')

    console.log(chat);
    res.status(200).send(chat)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err})
  }
}


export const createChat = async (req: Request, res: Response) => {
  try{
    // let {senderId, receiverId} = req.params
    const {senderId, receiverId, text} = req.body

    // if(receiverId === 'myAdmin'){
    //   const user:IUser | null = await User.findById(senderId)
    //   if(!user)
    //     return res.status(404).json({message: 'receiver not found'})
    //   console.log(user);
    //   receiverId = user.adminId || ''
    // }

    if(!senderId || !receiverId || !text) 
      return res.status(400).json({message: 'did not get senderId, receiverId and text'})

    const chat = new Chat({
      senderId,
      receiverId,
      message: text,
    })
    const savedChat = await chat.save()

    res.status(200).send(savedChat)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err})
  }
}