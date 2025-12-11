import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import articleRoutes from './routes/articles.js'
import commentStandaloneRoutes from './routes/commentsStandalone.js'
import authRoutes from './routes/auth.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root / Testing route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Cooking Sparkles Database API',
    version: '1.0.0',
    status: 'Server working properly',
    endpoints: {
      articles: '/api/articles',
      comments: '/api/comments',
      articleComments: '/api/articles/:articleId/comments'
    }
  })
})

// API Routes

// Article routes (includes nested comment routes)
app.use('/api/articles', articleRoutes)

// Standalone comment routes
app.use('/api/comments', commentStandaloneRoutes)

// Auth routes
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on: ${PORT}`)
      console.log(`URL: http://localhost:${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

startServer()
