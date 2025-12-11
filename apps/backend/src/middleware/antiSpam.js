// Anti-spam comments : limiting a comment every 20 sec
const lastCommentAt = {}

export const antiSpamComment = (req, res, next) => {
  const userId = req.user._id.toString()
  const now = Date.now()

  const last = lastCommentAt[userId] || 0

  if (now - last < 20000) {
    return res.status(429).json({
      message: 'Veuillez attendre avant de poster un nouveau commentaire'
    })
  }

  lastCommentAt[userId] = now
  next()
}
