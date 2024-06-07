import express from 'express'
import { getAdminId, getAllUsers, getUsers, updatePassword, verifyEmail } from '../controllers/user'
import { verifyAdmin } from '../middleware/verifyAdmin'

const router = express.Router()

router.get('/:adminId', verifyAdmin, getUsers)
router.get('/all/:adminId', verifyAdmin, getAllUsers)
router.post('/adminId', getAdminId)

router.post('/updatepassword', updatePassword)
router.post('/verifyemail', verifyEmail)


export default router