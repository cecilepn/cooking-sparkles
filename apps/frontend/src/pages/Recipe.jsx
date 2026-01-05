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
  const [ingredients, setIngredients] = useState([])
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await getArticleById(id)
        setArticle(data)
        setTitle(data.title)
        setIngredients(data.ingredients)
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
      await updateArticle(article._id, { title, content, ingredients }, token)
      setArticle(prev => ({ ...prev, title, content, ingredients }))
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

  const handleIngredientChange = (index, field, value) => {
    setIngredients(prev =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    )
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, { name: '', quantity: '', unit: '' }])
  }

  const removeIngredient = index => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  if (loading) return <p>Chargement...</p>
  if (!article) return <p>Article introuvable</p>

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <section className="min-h-screen p-6 flex flex-col gap-10 md:p-10">
      {error && <p className="text-red-500">{error}</p>}

      {editMode ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Ingrédients</label>

            {ingredients &&
              ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Qté"
                    value={ing.quantity || ''}
                    onChange={e =>
                      handleIngredientChange(index, 'quantity', e.target.value)
                    }
                    className="border p-2 rounded w-20"
                  />
                  <input
                    type="text"
                    placeholder="Unité"
                    value={ing.unit || ''}
                    onChange={e =>
                      handleIngredientChange(index, 'unit', e.target.value)
                    }
                    className="border p-2 rounded w-20"
                  />
                  <input
                    type="text"
                    placeholder="Ingrédient"
                    value={ing.name}
                    onChange={e =>
                      handleIngredientChange(index, 'name', e.target.value)
                    }
                    className="border p-2 rounded flex-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="border w-fit bg-white text-black py-2 px-4">
                    ✕
                  </button>
                </div>
              ))}

            <button
              type="button"
              onClick={addIngredient}
              className="self-start text-sm underline">
              + Ajouter un ingrédient
            </button>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="title">Instructions</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              className="border p-2 rounded"
            />
          </div>
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
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h1>{article.title}</h1>
            <p className="text-sm text-gray-300">
              publié le {formatDate(article.createdAt)} par {article.author}
            </p>
          </div>
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-col gap-5">
              <h2>Les ingrédients</h2>
              <ul>
                {article.ingredients &&
                  article.ingredients.map((ing, index) => (
                    <li key={index}>
                      {ing.quantity && `${ing.quantity} `}
                      {ing.unit && `${ing.unit} `}
                      {ing.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h2>Les instructions</h2>
              <p>{article.content}</p>
            </div>
          </div>

          {isOwner && (
            <div className="bg-white-100 z-10 shadow-2xl rounded-md fixed bottom-m md:right-10 flex items-center gap-4 p-4 mx-auto">
              <Button
                type="button"
                state={loading}
                variant="primary"
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
                <div onClick={handleDelete} className="cursor-pointer">
                  <img src="/trash.png" alt="" className="w-xl" />
                  <span className="sr-only">Supprimer</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {article.published && <CommentList articleId={article._id} />}
    </section>
  )
}
