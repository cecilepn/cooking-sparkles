import { useEffect, useState } from 'react'
import { getAllArticles } from '../services/articleService'
import { Link } from 'react-router-dom'

export default function Recipes() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('All')

  const categories = [
    'All',
    'Dessert',
    'Plat',
    'Sucré',
    'Salé',
    'Facile',
    'Difficile',
    'Autre'
  ]

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getAllArticles(category)
        setArticles(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur serveur')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [category])

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recettes</h1>

      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-medium">
          Filtrer par catégorie :
        </label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded p-1">
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article._id} className="border p-4 rounded shadow-sm">
            <Link to={`/recipes/${article._id}`}>
              <h2 className="text-xl font-semibold">{article.title}</h2>

              <p className="text-gray-600 text-sm">
                Par {article.author} • {article.category}
              </p>

              <p className="mt-2">{article.resume}</p>

              <p className="text-xs text-gray-400 mt-2">
                {article.views} vues • {article.timeSpent} min
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
