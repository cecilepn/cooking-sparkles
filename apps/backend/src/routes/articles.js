import express from 'express'
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  publishArticle
} from '../controllers/articleController.js'
import commentRoutes from './comments.js'
import { protect } from '../middleware/protect.js'
import { restrictToAdmin } from '../middleware/authorization.js'

const router = express.Router()

// Public routes
router.get('/published', getPublishedArticles)
router.get('/', getAllArticles)
router.get('/:id', getArticleById)

// Protected routes
router.post('/', protect, createArticle)

// PUT, DELETE, PATCH require owner or admin
router.put('/:id', protect, restrictToAdmin, updateArticle)
router.delete('/:id', protect, restrictToAdmin, deleteArticle)
router.patch('/:id/publish', protect, restrictToAdmin, publishArticle)

// Nested comments
router.use('/:articleId/comments', commentRoutes)

export default router
