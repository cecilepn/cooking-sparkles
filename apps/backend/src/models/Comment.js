import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      minlength: [2, 'Comment must be at least 2 characters'],
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: [true, 'Comment must be linked to an article']
    },
    approved: {
      type: Boolean,
      default: false
    },
    reported: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// INDEX
commentSchema.index({ article: 1, createdAt: -1 })

// INSTANCE METHODS
commentSchema.methods.approve = function () {
  this.approved = true
  return this.save()
}

commentSchema.methods.report = function () {
  this.reported = true
  return this.save()
}

// STATIC METHODS
commentSchema.statics.findApprovedByArticle = function (articleId) {
  return this.find({ article: articleId, approved: true }).sort({
    createdAt: -1
  })
}

commentSchema.statics.countByArticle = function (articleId) {
  return this.countDocuments({ article: articleId })
}

// MIDDLEWARE (HOOKS)
commentSchema.pre('save', function (next) {
  console.log(`💬 Saving comment by ${this.author}`)
  next()
})

commentSchema.post('save', function (doc) {
  console.log(`✅ Comment saved: ${doc._id}`)
})

commentSchema.pre('remove', function (next) {
  console.log(`🗑️  Removing comment: ${this._id}`)
  next()
})

// AUTO-POPULATE ARTICLE
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'article',
    select: 'title author'
  })
  next()
})

// MODEL
const Comment = mongoose.model('Comment', commentSchema)

export default Comment
