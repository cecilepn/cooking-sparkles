import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getArticleById,
  publishArticle,
  unpublishArticle,
  updateArticle,
  deleteArticle
} from '../services/articleService'
import CommentList from '../components/comments/CommentList'
import Button from '../components/common/Button'

export default function Recipe() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await getArticleById(id)
        setArticle(data)
        setTitle(data.title)
        setContent(data.content)
      } catch (err) {
        console.error(err)
        setError('Article introuvable')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (!article) return
  const isOwner = isAuthenticated && user && article.user._id === user._id

  const canPublish = isOwner && !article.published
  const canUnpublish = isOwner && article.published
  const canDelete = isOwner && article

  const handlePublish = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await publishArticle(article._id, token)
      setArticle(prev => ({ ...prev, published: true }))
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la publication')
    } finally {
      setLoading(false)
    }
  }

  const handleUnpublish = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await unpublishArticle(article._id, token)
      setArticle(prev => ({ ...prev, published: false }))
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la dépublication')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveChanges = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await updateArticle(article._id, { title, content }, token)
      setArticle(prev => ({ ...prev, title, content }))
      setEditMode(false)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await deleteArticle(article._id, token)
      navigate('/recipes')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la suppression')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Chargement...</p>
  if (!article) return <p>Article introuvable</p>

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              state={loading}
              variant="primary"
              onClick={handleSaveChanges}>
              Sauvegarder
            </Button>
            <Button
              type="button"
              state={loading}
              variant="secondary"
              onClick={() => setEditMode(false)}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <p className="text-sm text-gray-500">Par {article.author}</p>

          {isOwner && (
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                state={loading}
                variant="secondary"
                onClick={() => setEditMode(true)}>
                Modifier
              </Button>
              {canPublish && (
                <Button
                  type="button"
                  state={loading}
                  variant="primary"
                  onClick={handlePublish}>
                  Publier
                </Button>
              )}
              {canUnpublish && (
                <Button
                  type="button"
                  state={loading}
                  variant="secondary"
                  onClick={handleUnpublish}>
                  Dépublier
                </Button>
              )}
              {canDelete && (
                <Button
                  type="button"
                  state={loading}
                  variant="secondary"
                  onClick={handleDelete}>
                  Supprimer
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {article.published && <CommentList articleId={article._id} />}
    </div>
  )
}
