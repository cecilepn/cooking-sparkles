import Comment from '../models/Comment.js'
import Article from '../models/Article.js'
import AppError from '../utils/AppError.js'
import { catchAsync } from '../middleware/errorHandler.js'

/* Create comment */
export const createComment = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const comment = await Comment.create({
    contenu: req.body.contenu,
    auteur: req.body.auteur,
    email: req.body.email,
    article: articleId
  })

  res.status(201).json({
    success: true,
    message: 'Commentaire créé avec succès',
    data: comment
  })
})

/* Read comment */
export const getCommentsByArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const comments = await Comment.find({ article: articleId }).sort({
    createdAt: -1
  })

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  })
})

export const getApprovedComments = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const comments = await Comment.findApprouvesByArticle(articleId)

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  })
})

export const getCommentById = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  res.status(200).json({ success: true, data: comment })
})

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().sort({ createdAt: -1 })
  res
    .status(200)
    .json({ success: true, count: comments.length, data: comments })
})

/* Update comment */
export const updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { contenu: req.body.contenu },
    { new: true, runValidators: true }
  )
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  res
    .status(200)
    .json({ success: true, message: 'Commentaire mis à jour', data: comment })
})

export const approveComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  await comment.approuver()
  res
    .status(200)
    .json({ success: true, message: 'Commentaire approuvé', data: comment })
})

export const reportComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  await comment.signaler()
  res
    .status(200)
    .json({ success: true, message: 'Commentaire signalé', data: comment })
})

/* Delete comment */
export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  res
    .status(200)
    .json({ success: true, message: 'Commentaire supprimé', data: comment })
})

export const deleteCommentsByArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const result = await Comment.deleteMany({ article: articleId })

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} commentaire(s) supprimé(s)`,
    deletedCount: result.deletedCount
  })
})

/* Stats */
export const getCommentStats = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const total = await Comment.countByArticle(articleId)
  const approuves = await Comment.countDocuments({
    article: articleId,
    approuve: true
  })
  const enAttente = await Comment.countDocuments({
    article: articleId,
    approuve: false
  })
  const signales = await Comment.countDocuments({
    article: articleId,
    signale: true
  })

  res.status(200).json({
    success: true,
    data: { total, approuves, enAttente, signales }
  })
})
