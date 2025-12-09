import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true
    },
    approved: { type: Boolean, default: false },
    reported: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// ===== Hooks sur document =====
commentSchema.pre('save', function () {
  console.log(`Saving comment by ${this.author}`)
})

commentSchema.post('save', function (doc) {
  console.log(`Comment saved: ${doc._id}`)
})

commentSchema.pre('remove', function () {
  console.log(`Removing comment: ${this._id}`)
})

// ===== Auto-populate article pour les queries =====
commentSchema.pre(/^find/, function () {
  this.populate({
    path: 'article',
    select: 'title author'
  })
})

// ===== Méthodes d'instance =====
commentSchema.methods.approve = function () {
  this.approved = true
  return this.save()
}

commentSchema.methods.report = function () {
  this.reported = true
  return this.save()
}

// ===== Statics =====
commentSchema.statics.findApprovedByArticle = function (articleId) {
  return this.find({ article: articleId, approved: true }).sort({
    createdAt: -1
  })
}

commentSchema.statics.countByArticle = function (articleId) {
  return this.countDocuments({ article: articleId })
}

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
