import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Vérifie que l'utilisateur est connecté
export const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) return res.status(401).json({ message: 'You have to be logged' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    if (!req.user) throw new Error('User not found')
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalide token' })
  }
}

// Restrict actions to the owner of a resource
export const restrictToOwner = Model => {
  return async (req, res, next) => {
    const doc = await Model.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Doc not found' })
    if (
      doc.user?.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non authorized' })
    }
    next()
  }
}

// Restrict actions to admin
export const restrictToAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin' })
  }
  next()
}
