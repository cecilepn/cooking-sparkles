import express from 'express'
import {
  createComment,
  getCommentsByArticle,
  getApprovedComments,
  deleteCommentsByArticle,
  getCommentStats
} from '../controllers/commentController.js'
import { protect, restrictToAdmin } from '../middleware/authorization.js'
import { antiSpamComment } from '../middleware/antiSpam.js'

const router = express.Router({ mergeParams: true })

// Public routes
router.get('/', getCommentsByArticle)
router.get('/approved', getApprovedComments)
router.get('/stats', getCommentStats)

// Protected routes
router.post('/', protect, antiSpamComment, createComment)
router.delete('/', protect, restrictToAdmin, deleteCommentsByArticle)

export default router
