import express from 'express'
import {
  createComment,
  getCommentsByArticle,
  getApprovedComments,
  getCommentById,
  getAllComments,
  updateComment,
  approveComment,
  reportComment,
  deleteComment,
  deleteCommentsByArticle,
  getCommentStats
} from '../controllers/commentController.js'

// Create router with mergeParams to access parent route params
const router = express.Router({ mergeParams: true })

/**
 * COMMENT ROUTES
 *
 * Two types of routes:
 * 1. Nested routes: /api/articles/:articleId/comments
 * 2. Direct routes: /api/comments/:id
 */

// ============================================
// NESTED ROUTES (inside articles)
// ============================================
// These routes are mounted from articles.js with:
// router.use('/:articleId/comments', commentRoutes);

// GET: List comments of an article
// POST: Create a new comment for the article
// DELETE: Delete all comments of an article
router
  .route('/')
  .get(getCommentsByArticle)
  .post(createComment)
  .delete(deleteCommentsByArticle)

// GET: List approved comments of an article
router.get('/approved', getApprovedComments)

// GET: Get comment stats for an article
router.get('/stats', getCommentStats)

// ============================================
// DIRECT ROUTES (for a specific comment)
// ============================================
// These routes are mounted directly in server.js
// router.use('/api/comments', commentRoutes);

export default router
