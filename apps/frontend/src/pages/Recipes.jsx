import { useEffect, useState } from 'react'
import { getAllArticles } from '../services/articleService'
import { Link } from 'react-router-dom'

export default function Recipes() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getAllArticles()
        setArticles(res.data)
        console.log(res)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur serveur')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recettes</h1>

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
