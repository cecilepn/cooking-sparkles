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

const router = express.Router()

/**
 * @route   GET /api/articles/publies
 * @desc    Récupérer uniquement les articles publiés
 * @access  Public
 */
router.get('/publies', getPublishedArticles)

/**
 * @route   GET /api/articles
 * @desc    Récupérer tous les articles
 * @access  Public
 */
router.get('/', getAllArticles)

/**
 * @route   POST /api/articles
 * @desc    Créer un nouvel article
 * @access  Public (sera protégé plus tard)
 */
router.post('/', createArticle)

/**
 * @route   GET /api/articles/:id
 * @desc    Récupérer un article par son ID
 * @access  Public
 */
router.get('/:id', getArticleById)

/**
 * @route   PUT /api/articles/:id
 * @desc    Mettre à jour un article complet
 * @access  Public (sera protégé plus tard)
 */
router.put('/:id', updateArticle)

/**
 * @route   DELETE /api/articles/:id
 * @desc    Supprimer un article
 * @access  Public (sera protégé plus tard)
 */
router.delete('/:id', deleteArticle)

/**
 * @route   PATCH /api/articles/:id/publier
 * @desc    Publier un article
 * @access  Public (sera protégé plus tard)
 */
router.patch('/:id/publier', publishArticle)

// Pour gérer les commentaires liés à un article (à activer plus tard)
// import commentRoutes from './comments.js';
// router.use('/:articleId/comments', commentRoutes);

export default router
