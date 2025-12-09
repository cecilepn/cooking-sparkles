import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
      minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères']
    },
    content: {
      type: String,
      required: [true, 'Le contenu est obligatoire'],
      trim: true,
      minlength: [10, 'Le contenu doit contenir au moins 10 caractères']
    },
    author: {
      type: String,
      required: [true, "L'auteur est obligatoire"],
      trim: true,
      maxlength: [100, "Le nom de l'auteur ne peut pas dépasser 100 caractères"]
    },
    published: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: [
          'Dessert',
          'Plat',
          'Sucré',
          'Salé',
          'Facile',
          'Difficile',
          'Autre'
        ],
        message: "{VALUE} n'est pas une catégorie valide"
      },
      default: 'Autre'
    },
    views: {
      type: Number,
      default: 0,
      min: [0, 'Le nombre de vues ne peut pas être négatif']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v
        return ret
      }
    }
  }
)

// Méthodes
articleSchema.methods.publish = function () {
  this.published = true
  return this.save()
}

articleSchema.methods.unpublish = function () {
  this.published = false
  return this.save()
}

articleSchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

// Statics
articleSchema.statics.findPublications = function () {
  return this.find({ published: true }).sort({ createdAt: -1 })
}

articleSchema.statics.findByCategory = function (category) {
  return this.find({ category, published: true }).sort({ createdAt: -1 })
}

// Virtuals
articleSchema.virtual('resume').get(function () {
  if (!this.content) return ''
  if (this.content.length <= 150) return this.content
  return this.content.substring(0, 150) + '...'
})

articleSchema.virtual('timeSpent').get(function () {
  if (!this.content) return 0
  const words = this.content.split(' ').length
  return Math.ceil(words / 200)
})

// Hooks
articleSchema.pre('save', async function () {
  console.log(`Article saved: ${this.title}`)
})

articleSchema.post('save', function (doc) {
  console.log(`Article saved: ${doc._id}`)
})

const Article = mongoose.model('Article', articleSchema)

export default Article
