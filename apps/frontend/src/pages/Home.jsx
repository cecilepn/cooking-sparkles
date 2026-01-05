import { useEffect, useState } from 'react'
import { getAllArticles } from '../services/articleService.js'
import RecipeCard from '../components/recipes/RecipeCard.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getAllArticles()
        const mostViewed = res.data
          .filter(article => article.published)
          .sort((a, b) => b.views - a.views)
          .slice(0, 9)
        setArticles(mostViewed)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur serveur')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-error-600">{error}</p>

  return (
    <>
      <section className="min-h-screen flex flex-col gap-5 p-6 md:p-10">
        <h1>Les meilleures recettes</h1>
        {articles.length === 0 ? (
          <p className="flex flex-col gap-2">
            Aucune publication n'a été trouvée. En suggérer une ?
            <Link to="/login" className="underline">
              Connectez-vous !
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
              {articles.map(article => (
                <RecipeCard article={article} key={article._id} />
              ))}
            </div>
            <Link to="/recipes" className="link self-center">
              Découvrir plus de recettes
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
