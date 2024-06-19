import express, { Request, Response } from 'express'
import Chat from '../model/Chat'
import User from '../model/User'
import { IUser } from '../interface'
import { io } from '../index'
import { getReceiverSocketId } from '../index'


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
    
    console.log('getChat');
    // console.log(chat);
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

    if(!savedChat){
      return res.status(400).json('unable to save chat in database')
    }

    const receiverSocketId = getReceiverSocketId(receiverId)
    // const newChat = {
    //   ...chat,
    //   _id: receiverSocketId + Math.random()
    // }
    if(receiverSocketId)
      io.to(receiverSocketId).emit('newMessage', savedChat)

    res.status(200).json(savedChat)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err})
  }
}