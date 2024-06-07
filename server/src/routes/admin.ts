import express from 'express'
import { createUserAndInvite, deleteUsers, disableUsers, getPendingUsers, invitaionSetPassword, sendInvitation } from '../controllers/admin'
import { verifyAdmin } from '../middleware/verifyAdmin'


const router = express.Router()

router.get('/pendingusers/:adminId', getPendingUsers)

router.delete('/delete/:id', verifyAdmin, deleteUsers)
router.patch('/disable/:id', verifyAdmin, disableUsers)

router.post('/createuserandinvite', verifyAdmin, createUserAndInvite)
router.post('/invite/setpassword', verifyAdmin, invitaionSetPassword)
router.post('/reinvite/:userId', verifyAdmin, sendInvitation)


export default router