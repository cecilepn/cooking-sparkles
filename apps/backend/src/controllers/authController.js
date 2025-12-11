import User from '../models/User.js'
import { catchAsync } from '../middleware/errorHandler.js'
import AppError from '../utils/AppError.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Signup
export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const newUser = await User.create({ name, email, password, role })

  const token = newUser.createJWT()

  res.status(201).json({ success: true, token, data: { user: newUser } })
})

// Login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = user.createJWT()

  res.status(200).json({ success: true, token, data: { user } })
})

// Update
export const updateMe = catchAsync(async (req, res, next) => {
  const allowedFields = ['name', 'email', 'password']
  const updates = {}

  for (let key of allowedFields) {
    if (req.body[key]) updates[key] = req.body[key]
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 12)
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: updatedUser })
})

// Delete
export const deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user._id)

  if (!deletedUser) {
    return next(new AppError('User not found', 404))
  }
  res.status(200).json({ success: true, message: 'User deleted successfully' })
})
