import RecipeCard from './RecipeCard'
import { useEffect, useState } from 'react'
import { getPublishedArticles } from '../../services/articleService.js'

export default function RecipesList({ category = 'All', search = '' }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const articlesPerPage = 8

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getPublishedArticles(category)
        setArticles(res.data)
        setCurrentPage(1)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur serveur')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [category])

  const filteredArticles = articles.filter(article => {
    const matchCategory = category === 'All' || article.category === category
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-error-600">{error}</p>

  return (
    <section className="flex flex-col justify-center gap-4 md:grid md:grid-cols-2">
      {currentArticles.length === 0 ? (
        <p>Aucune recette trouvée.</p>
      ) : (
        currentArticles.map(article => (
          <RecipeCard article={article} key={article._id} />
        ))
      )}
      {totalPages > 1 && (
        <div className="w-full flex justify-center gap-2 col-span-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <div
              key={page}
              onClick={() => handlePageChange(page)}
              className={`cursor-pointer ${
                currentPage === page && 'underline'
              }`}>
              {page}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
