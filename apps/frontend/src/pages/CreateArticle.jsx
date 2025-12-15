import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createArticle } from '../services/articleService'

export default function CreateArticle() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Dessert')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour ajouter une recette.</p>
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const data = await createArticle({ title, content, category }, token)
      console.log('Article créé', data)
      navigate(`/recipes/${data.data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter une recette</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
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
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={loading}>
          {loading ? 'Création...' : 'Créer la recette'}
        </button>
      </form>
    </section>
  )
}
