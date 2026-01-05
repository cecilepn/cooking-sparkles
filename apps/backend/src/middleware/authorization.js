import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Check the user is logged
export const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token)
    return res.status(401).json({ message: 'Vous devez être connecté' })

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
    const doc = await Model.findById(req.params.id).select('user')
    if (!doc) {
      return res.status(404).json({ message: 'Article non trouvé' })
    }
    const ownerId = doc.user._id?.toString() || doc.user.toString()
    if (ownerId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Vous n’êtes pas autorisé' })
    }
    next()
  }
}

// Restrict actions to admin
export const restrictToAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Seulement les admin' })
  }
  next()
}
