import AppError from '../utils/AppError.js'

/**
 * Middleware: restreint aux admins
 */
export const restrictToAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Admin access required', 403))
  }
  next()
}

/**
 * Middleware factory: restreint au propriétaire du document (Model) ou admin
 * - Model: Mongoose model
 * - idParam (optionnel): param name containing id (default 'id')
 *
 * Fallbacks:
 * - si doc.user existe → compare ObjectId
 * - sinon si doc.email existe → compare emails
 * - sinon si doc.author existe → compare names
 */
export const restrictToOwnerOrAdmin = (Model, idParam = 'id') => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params[idParam])
      if (!doc) return next(new AppError('Resource not found', 404))

      // allow admin
      if (req.user && req.user.role === 'admin') return next()

      // if no user authenticated
      if (!req.user) {
        return next(new AppError('Authentication required', 401))
      }

      // If model stores a reference to user
      if (doc.user) {
        if (doc.user.toString() === req.user._id.toString()) return next()
      } else if (doc.email && req.user.email) {
        if (doc.email.toLowerCase() === req.user.email.toLowerCase())
          return next()
      } else if (doc.author && req.user.name) {
        if (doc.author === req.user.name) return next()
      }

      return next(
        new AppError('You are not allowed to perform this action', 403)
      )
    } catch (err) {
      return next(err)
    }
  }
}
