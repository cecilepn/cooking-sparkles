import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire.'],
      trim: true,
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    email: {
      type: String,
      required: [true, 'Email est obligatoire'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email non valide'
      ]
    },
    password: {
      type: String,
      required: [true, 'Mdp obligatoire'],
      minlength: [6, 'Mdp doit contenir 6 caractères minimum'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
)

// Encrypt password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// Compare password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

// Create JWT
userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

const User = mongoose.model('User', userSchema)

export default User
