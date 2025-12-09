import Article from '../models/Article.js'
import QueryFeatures from '../utils/queryFeatures.js'
import AppError from '../utils/AppError.js'
import { catchAsync } from '../middleware/errorHandler.js'

/**
 * @desc    Create a new article
 * @route   POST /api/articles
 * @access  Public
 */
export const createArticle = catchAsync(async (req, res, next) => {
  const { title, content, author, category } = req.body

  const article = new Article({ title, content, author, category })
  const savedArticle = await article.save()

  res.status(201).json({
    success: true,
    message: 'Article created.',
    data: savedArticle
  })
})

/**
 * @desc    Get all articles
 * @route   GET /api/articles
 * @access  Public
 */
export const getAllArticles = catchAsync(async (req, res, next) => {
  const totalCount = await Article.countDocuments()
  const features = new QueryFeatures(Article.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()

  const articles = await features.query
  const paginationInfo = features.getPaginationInfo(totalCount)

  const response = {
    success: true,
    count: articles.length,
    totalCount,
    data: articles
  }

  if (paginationInfo) {
    response.pagination = paginationInfo
  }

  res.status(200).json(response)
})

/**
 * @desc    Get article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */
export const getArticleById = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findById(id)

  if (!article) {
    return next(new AppError('Article not found', 404))
  }

  await article.incrementViews()

  res.status(200).json({
    success: true,
    data: article
  })
})

/**
 * @desc   Update an article
 * @route   PUT /api/articles/:id
 * @access  Public
 */
export const updateArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  if (!article) {
    return next(new AppError('Article not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Article updated.',
    data: article
  })
})

/**
 * @desc    Delete article
 * @route   DELETE /api/articles/:id
 * @access  Public
 */
export const deleteArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findByIdAndDelete(id)

  if (!article) {
    return next(new AppError('Article not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Article deleted.',
    data: article
  })
})

/**
 * @desc    Get only published articles
 * @route   GET /api/articles/publies
 * @access  Public
 */
export const getPublishedArticles = catchAsync(async (req, res, next) => {
  const articles = await Article.findPublies()

  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles
  })
})

/**
 * @desc    Publish article
 * @route   PATCH /api/articles/:id/publier
 * @access  Public
 */
export const publishArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findById(id)

  if (!article) {
    return next(new AppError('Article not found', 404))
  }

  await article.publish()

  res.status(200).json({
    success: true,
    message: 'Article published.',
    data: article
  })
})
