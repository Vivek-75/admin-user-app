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
        { from: senderId, to: receiverId },
        { from: receiverId, to: senderId }
      ]
    }).select('from to message')

    console.log(chat);
    res.status(200).json(chat)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err})
  }
}


export const createChat = async (req: Request, res: Response) => {
  try{
    const {senderId, receiverId, text} = req.body

    if(!senderId || !receiverId || !text) 
      return res.status(400).json({message: 'did not get senderId, receiverId and text'})

    const chat = new Chat({
      from: senderId,
      to: receiverId,
      message: text,
    })
    const savedChat = await chat.save()

    res.status(200).json(savedChat)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err})
  }
}