import express from 'express'
import {
  createComment,
  getCommentsByArticle,
  getApprovedComments,
  getCommentById,
  updateComment,
  deleteComment,
  approveComment,
  reportComment,
  deleteCommentsByArticle,
  getCommentStats,
  getAllComments
} from '../controllers/commentController.js'
import { protect, restrictToAdmin } from '../middleware/authorization.js'
import { antiSpamComment } from '../middleware/antiSpam.js'

const router = express.Router({ mergeParams: true })

// Public
router.get('/', getCommentsByArticle)
router.get('/approved', getApprovedComments)
router.get('/stats', getCommentStats)

// Admin
router.get('/all', protect, restrictToAdmin, getAllComments)

// User / Owner
router.post('/', protect, antiSpamComment, createComment)
router.get('/:id', getCommentById)
router.put('/:id', protect, updateComment)
router.delete('/:id', protect, deleteComment)

// Admin moderation
router.patch('/:id/approve', protect, restrictToAdmin, approveComment)

// Authenticated users
router.patch('/:id/report', protect, reportComment)

// Admin bulk delete
router.delete('/', protect, restrictToAdmin, deleteCommentsByArticle)

export default router
