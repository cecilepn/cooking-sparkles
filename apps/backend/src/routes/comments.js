import express from 'express'
import {
  createComment,
  getCommentsByArticle,
  getApprovedComments,
  deleteCommentsByArticle,
  getCommentStats
} from '../controllers/commentController.js'
import { protect } from '../middleware/protect.js'
import { restrictToAdmin } from '../middleware/authorization.js'

const router = express.Router({ mergeParams: true })

// Public: list comments for article
router.get('/', getCommentsByArticle)

// Get only approved comments
router.get('/approved', getApprovedComments)

// Stats for article
router.get('/stats', getCommentStats)

// Protected: create comment (must be logged in)
router.post('/', protect, createComment)

// Protected & admin-only: delete all comments for an article
router.delete('/', protect, restrictToAdmin, deleteCommentsByArticle)

export default router
