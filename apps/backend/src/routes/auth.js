import express from 'express'
import {
  signup,
  login,
  updateMe,
  deleteMe
} from '../controllers/authController.js'
import { protect, restrictToAdmin } from '../middleware/authorization.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

// Test route protected
router.get('/me', protect, (req, res) => {
  res.status(200).json({ success: true, data: req.user })
})

// Modifier son profil / mot de passe
router.put('/me', protect, updateMe)

// Supprimer son compte
router.delete('/me', protect, deleteMe)

// GET /api/users - Get all users (admin only)
router.get('/admin', protect, restrictToAdmin, async (req, res) => {
  const users = await User.find().select('-password')
  res.status(200).json({ success: true, data: users })
})

export default router
