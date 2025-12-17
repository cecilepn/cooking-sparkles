import RecipeCard from './RecipeCard'
import { useEffect, useState } from 'react'
import { getAllArticles } from '../../services/articleService.js'

export default function RecipesList({ category, search }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getAllArticles()
        setArticles(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur serveur')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchCategory = category === 'All' || article.category === category
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section className="flex flex-wrap gap-4">
      {filteredArticles.length === 0 ? (
        <p>Aucune recette trouvée.</p>
      ) : (
        filteredArticles.map(article => (
          <RecipeCard article={article} key={article._id} />
        ))
      )}
    </section>
  )
}
