import express from 'express'
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  publishArticle,
  getMyArticles,
  unpublishArticle
} from '../controllers/articleController.js'
import commentRoutes from './comments.js'
import { protect, restrictToOwner } from '../middleware/authorization.js'
import Article from '../models/Article.js'

const router = express.Router()

// Protected routes
router.get('/me', protect, getMyArticles)
router.post('/', protect, createArticle)
router.patch('/:id/publish', protect, publishArticle)
router.patch('/:id/unpublish', protect, unpublishArticle)

// Public routes
router.get('/published', getPublishedArticles)
router.get('/', getAllArticles)
router.get('/:id', getArticleById)

// PUT, DELETE, PATCH require owner or admin
router.put('/:id', protect, restrictToOwner(Article), updateArticle)
router.delete('/:id', protect, restrictToOwner(Article), deleteArticle)

// Nested comments
router.use('/:articleId/comments', commentRoutes)

export default router
