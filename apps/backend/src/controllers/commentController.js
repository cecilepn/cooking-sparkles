import Comment from '../models/Comment.js'
import Article from '../models/Article.js'
import AppError from '../utils/AppError.js'
import { catchAsync } from '../middleware/errorHandler.js'

/* Create comment
   - Expects authenticated user (route uses protect).
   - If req.user exists, author/email/user are set from it to avoid usurpation.
*/
export const createComment = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const commentData = {
    content: req.body.content,
    article: articleId
  }

  // If user is authenticated, prefer user data
  if (req.user) {
    commentData.user = req.user._id
    commentData.author = req.user.name || req.body.author || 'Unknown'
    commentData.email = req.user.email || req.body.email || ''
  } else {
    // fallback (shouldn't happen if route is protected)
    commentData.author = req.body.author
    commentData.email = req.body.email
  }

  const comment = await Comment.create(commentData)

  // populate article minimal info for response
  await comment
    .populate({ path: 'article', select: 'title author' })
    .execPopulate?.() // for older mongoose
  // modern mongoose: populate returns a promise on query; but when populating doc, execPopulate may be undefined
  // safe attempt above; if not defined, next line:
  try {
    await comment.populate?.({ path: 'article', select: 'title author' })
  } catch (e) {
    // ignore populate errors
  }

  res.status(201).json({
    success: true,
    message: 'Commentaire créé avec succès',
    data: comment
  })
})

/* Read comments for article */
export const getCommentsByArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const comments = await Comment.find({ article: articleId })
    .sort({ createdAt: -1 })
    .select('-__v')

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  })
})

/* Get only approved comments */
export const getApprovedComments = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article non trouvé', 404))

  const comments = await Comment.findApprovedByArticle(articleId)

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

/* Update comment (author or admin) */
export const updateComment = catchAsync(async (req, res, next) => {
  const allowedUpdates = { content: req.body.content }
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    allowedUpdates,
    {
      new: true,
      runValidators: true
    }
  )
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  res
    .status(200)
    .json({ success: true, message: 'Commentaire mis à jour', data: comment })
})

export const approveComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  await comment.approve()
  res
    .status(200)
    .json({ success: true, message: 'Commentaire approuvé', data: comment })
})

export const reportComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  await comment.report()
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
  const approved = await Comment.countDocuments({
    article: articleId,
    approved: true
  })
  const pending = await Comment.countDocuments({
    article: articleId,
    approved: false
  })
  const reported = await Comment.countDocuments({
    article: articleId,
    reported: true
  })

  res.status(200).json({
    success: true,
    data: { total, approved, pending, reported }
  })
})
