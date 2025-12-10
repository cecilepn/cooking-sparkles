import express from 'express'
import {
  createComment,
  getCommentsByArticle,
  getApprovedComments,
  deleteCommentsByArticle,
  getCommentStats
} from '../controllers/commentController.js'
import { protect, restrictToAdmin } from '../middleware/authorization.js'

const router = express.Router({ mergeParams: true })

// Public routes
router.get('/', getCommentsByArticle)
router.get('/approved', getApprovedComments)
router.get('/stats', getCommentStats)

// Protected routes
router.post('/', protect, createComment)
router.delete('/', protect, restrictToAdmin, deleteCommentsByArticle)

export default router
