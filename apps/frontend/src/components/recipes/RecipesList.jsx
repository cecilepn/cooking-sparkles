import RecipeCard from './RecipeCard'
import { useEffect, useState } from 'react'
import { getAllArticles } from '../../services/articleService.js'

export default function RecipesList({ category }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <section className="flex flex-wrap gap-4 justify-center">
      {articles.map(article => (
        <RecipeCard key={article._id} article={article} />
      ))}
    </section>
  )
}
