import express from 'express'
import { isAuthenticated, login, logout, register, sendVerifyOtp, verifyOtp } from '../Controllers/authController.js'
import userAuth from '../middleware/userAuth.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/send-Verify-Otp', userAuth, sendVerifyOtp)
authRoutes.post('/verify-Otp', userAuth, verifyOtp)
authRoutes.post('/is-auth', userAuth, isAuthenticated)

export default authRoutes