import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticleById } from '../services/articleService'

export default function Recipe() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id)
        setArticle(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (!article) return <p>Rcette introuvable</p>

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p className="text-sm text-gray-500">Par {article.author}</p>
    </article>
  )
}
