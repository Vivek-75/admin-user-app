import express from 'express'
import { getUsers, updatePassword, verifyEmail } from '../controllers/user'
import { verifyAdmin } from '../middleware/verifyAdmin'

const router = express.Router()

router.get('/all', verifyAdmin, getUsers)

router.post('/updatepassword', updatePassword)
router.post('/verifyemail', verifyEmail)


export default router