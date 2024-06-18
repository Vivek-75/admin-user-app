import express from 'express'
import { login, logout, register, verifyAuth} from '../controllers/auth'



const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verifyAuth', verifyAuth)


export default router