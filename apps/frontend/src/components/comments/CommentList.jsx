import { useEffect, useState } from 'react'
import { getCommentsByArticle } from '../../services/commentService'
import FormComment from './FormComment'

export default function CommentList({ articleId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchComments = async () => {
    try {
      const data = await getCommentsByArticle(articleId)
      setComments(data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [articleId])

  if (loading) return <p>Chargement des commentaires...</p>

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Commentaires ({comments.length})
      </h2>

      {comments.length === 0 && (
        <p className="text-sm text-gray-500 mb-4">
          Aucun commentaire pour le moment
        </p>
      )}

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment._id} className="border p-3 rounded bg-gray-50">
            <p>{comment.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              Par {comment.user?.name || 'Utilisateur supprimé'}
            </p>
          </div>
        ))}
      </div>

      <FormComment articleId={articleId} onCommentAdded={fetchComments} />
    </div>
  )
}
