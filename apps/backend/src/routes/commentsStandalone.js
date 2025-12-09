import express from 'express'
import {
  getCommentById,
  getAllComments,
  updateComment,
  approveComment,
  reportComment,
  deleteComment
} from '../controllers/commentController.js'

const router = express.Router()

/**
 * STANDALONE COMMENT ROUTES
 *
 * These routes allow direct access to a comment by its ID,
 * without going through the article.
 *
 * Mount in server.js with:
 * app.use('/api/comments', commentsStandaloneRouter);
 */

// ============================================
// GENERAL ROUTES
// ============================================

// GET /api/comments
// List all comments (admin)
router.get('/', getAllComments)

// ============================================
// ROUTES BY ID
// ============================================

// GET /api/comments/:id       - Get a comment
// PUT /api/comments/:id       - Update a comment
// DELETE /api/comments/:id    - Delete a comment
router
  .route('/:id')
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment)

// ============================================
// SPECIFIC ACTIONS
// ============================================

// PATCH /api/comments/:id/approved  - Approve a comment
router.patch('/:id/approved', approveComment)

// PATCH /api/comments/:id/report   - Report a comment
router.patch('/:id/report', reportComment)

export default router
