import { useState } from 'react'
import { createComment } from '../../services/commentService'
import { useAuth } from '../../context/AuthContext'

export default function FormComment({ articleId, onCommentAdded }) {
  const { isAuthenticated } = useAuth()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isAuthenticated) {
    return (
      <p className="text-sm text-gray-500">
        Connectez-vous pour laisser un commentaire.
      </p>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)

    try {
      await createComment(articleId, content)
      setContent('')
      onCommentAdded() // recharge la liste
    } catch (err) {
      console.error(err)
      setError('Impossible d’ajouter le commentaire')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        placeholder="Votre commentaire..."
        className="w-full border rounded p-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? 'Envoi...' : 'Commenter'}
      </button>
    </form>
  )
}
