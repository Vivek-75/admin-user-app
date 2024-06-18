import express from 'express'
import { getAdminId, getAllUsers, getUsers, updatePassword, verifyEmail, getUserById } from '../controllers/user'
import { verifyAdmin } from '../middleware/verifyAdmin'

const router = express.Router()

router.get('/:adminId', verifyAdmin, getUsers)
router.get('/all/:adminId', verifyAdmin, getAllUsers)
router.post('/adminId', getAdminId)
router.post('/single/:id', getUserById)

router.post('/updatepassword', updatePassword)
router.post('/verifyemail', verifyEmail)


export default router