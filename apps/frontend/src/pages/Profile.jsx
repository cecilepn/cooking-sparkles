import { useEffect, useState } from 'react'
import { getMyArticles } from '../services/articleService'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { logout } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getMyArticles()
        setArticles(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <p>Chargement…</p>

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <button onClick={logout} className="text-red-500 underline">
          Se déconnecter
        </button>
      </div>

      <Link
        to="/add-recipe"
        className="inline-block mb-4 bg-green-500 text-white px-4 py-2 rounded">
        Ajouter une recette
      </Link>

      <h2 className="text-xl font-semibold mb-2">Mes recettes</h2>

      {articles.length === 0 ? (
        <p>Aucune recette pour le moment.</p>
      ) : (
        <ul className="space-y-3">
          {articles.map(article => (
            <li
              key={article._id}
              className="border p-3 rounded flex justify-between">
              <div>
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  {article.published ? 'Publié' : 'Brouillon'}
                </p>
              </div>

              <Link to={`/recipes/${article._id}`} className="text-blue-500">
                Voir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
