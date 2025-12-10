import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'

export const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return next(new AppError('User no longer exists', 401))
    req.user = user
    next()
  } catch (err) {
    return next(new AppError('Invalid token', 401))
  }
}
