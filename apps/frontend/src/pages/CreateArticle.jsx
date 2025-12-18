import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createArticle, publishArticle } from '../services/articleService'
import Button from '../components/common/Button'

export default function CreateArticle() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Dessert')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('draft')

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour ajouter une recette.</p>
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await createArticle({ title, content, category }, token)
      const articleId = res.data._id
      if (action === 'publish') await publishArticle(articleId, token)
      navigate(`/recipes/${articleId}`)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex flex-col gap-m py-8 px-7">
      <h1>Ajouter une recette</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="content">Contenu</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={6}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border p-2 rounded">
            <option value="Dessert">Dessert</option>
            <option value="Plat">Plat</option>
            <option value="Sucré">Sucré</option>
            <option value="Salé">Salé</option>
            <option value="Facile">Facile</option>
            <option value="Difficile">Difficile</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-3">
          <Button
            type="submit"
            state={loading}
            variant="secondary"
            onClick={() => setAction('draft')}>
            Sauvegarder
          </Button>
          <Button
            type="submit"
            state={loading}
            variant="primary"
            onClick={() => setAction('publish')}>
            Publier
          </Button>
        </div>
      </form>
    </section>
  )
}
