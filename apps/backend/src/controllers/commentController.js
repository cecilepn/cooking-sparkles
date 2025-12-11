import Comment from '../models/Comment.js'
import Article from '../models/Article.js'
import AppError from '../utils/AppError.js'
import { catchAsync } from '../middleware/errorHandler.js'

/* Create comment */
export const createComment = catchAsync(async (req, res, next) => {
  const { articleId } = req.params

  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article not found', 404))

  const commentData = {
    content: req.body.content,
    article: articleId
  }

  if (req.user) {
    commentData.user = req.user._id
    commentData.author = req.user.name || 'Unknown'
    commentData.email = req.user.email || ''
  } else {
    commentData.author = req.body.author
    commentData.email = req.body.email
  }

  const comment = await Comment.create(commentData)

  res.status(201).json({
    success: true,
    message: 'Comment created',
    data: comment
  })
})

/* Read comments for article */
export const getCommentsByArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article not found', 404))

  const comments = await Comment.find({ article: articleId }).sort({
    createdAt: -1
  })

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments
  })
})

/* Get approved comments only */
export const getApprovedComments = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article not found', 404))

  const comments = await Comment.findApprovedByArticle(articleId)
  res
    .status(200)
    .json({ success: true, count: comments.length, data: comments })
})

/* Single comment by ID */
export const getCommentById = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Commentaire not found', 404))

  res.status(200).json({ success: true, data: comment })
})

/* All comments (admin only) */
export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().sort({ createdAt: -1 })
  res
    .status(200)
    .json({ success: true, count: comments.length, data: comments })
})

/* Update comment (author or admin) */
export const updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true, runValidators: true }
  )
  if (!comment) return next(new AppError('Comment not found', 404))

  res
    .status(200)
    .json({ success: true, message: 'Comment updated', data: comment })
})

export const approveComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) return next(new AppError('Comment not found', 404))

  await comment.approve()
  res
    .status(200)
    .json({ success: true, message: 'Commentaire approuvé', data: comment })
})

export const reportComment = catchAsync(async (req, res, next) => {
  const userId = req.user._id
  const comment = await Comment.findById(req.params.id)

  if (!comment) return next(new AppError('Commentaire non trouvé', 404))

  // Check if user already reported
  if (comment.reports.includes(userId)) {
    return next(new AppError('Vous avez déjà signalé ce commentaire', 400))
  }

  // Add his report
  comment.reports.push(userId)
  comment.reported = true
  await comment.save()

  res.status(200).json({
    success: true,
    message: 'Commentaire signalé',
    data: comment
  })
})

/* Delete comment */
export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  if (!comment) return next(new AppError('Comment not found', 404))

  res
    .status(200)
    .json({ success: true, message: 'Comment deleted', data: comment })
})

export const deleteCommentsByArticle = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article not found', 404))

  const result = await Comment.deleteMany({ article: articleId })
  res.status(200).json({
    success: true,
    message: `${result.deletedCount} comments deleted`
  })
})

/* Comment stats */
export const getCommentStats = catchAsync(async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) return next(new AppError('Article not found', 404))

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

  res
    .status(200)
    .json({ success: true, data: { total, approved, pending, reported } })
})
