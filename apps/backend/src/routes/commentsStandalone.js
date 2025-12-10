import express from 'express'
import {
  getCommentById,
  getAllComments,
  updateComment,
  approveComment,
  reportComment,
  deleteComment
} from '../controllers/commentController.js'
import { protect } from '../middleware/protect.js'
import {
  restrictToAdmin,
  restrictToOwnerOrAdmin
} from '../middleware/authorization.js'
import Comment from '../models/Comment.js'

const router = express.Router()

// GET all comments (admin only)
router.get('/', protect, restrictToAdmin, getAllComments)

// CRUD by comment ID
router
  .route('/:id')
  .get(getCommentById) // public
  // update: owner or admin
  .put(protect, restrictToOwnerOrAdmin(Comment, 'id'), updateComment)
  // delete: owner or admin
  .delete(protect, restrictToOwnerOrAdmin(Comment, 'id'), deleteComment)

// Approve: admin only
router.patch('/:id/approved', protect, restrictToAdmin, approveComment)
// Report: any logged-in user can report
router.patch('/:id/report', protect, reportComment)

export default router
