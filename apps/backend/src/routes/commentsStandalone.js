import express from 'express'
import {
  getCommentById,
  getAllComments,
  updateComment,
  approveComment,
  reportComment,
  deleteComment
} from '../controllers/commentController.js'
import {
  protect,
  restrictToOwner,
  restrictToAdmin
} from '../middleware/authorization.js'
import Comment from '../models/Comment.js'

const router = express.Router()

// GET all comments (admin only)
router.get('/', protect, restrictToAdmin, getAllComments)

// CRUD by comment ID
router
  .route('/:id')
  .get(getCommentById) // public
  .put(protect, restrictToOwner(Comment), updateComment)
  .delete(protect, restrictToOwner(Comment), deleteComment)

// Specific actions
router.patch('/:id/approved', protect, restrictToAdmin, approveComment) // admin only
router.patch('/:id/report', protect, reportComment) // any logged-in user

export default router
