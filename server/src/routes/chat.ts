import express from 'express'
import { getChat, createChat } from '../controllers/chat'


const router = express.Router()


router.post('/getChat', getChat)

router.post('/createChat', createChat)


export default router