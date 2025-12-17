import { useEffect, useState } from 'react'
import { getMyArticles } from '../services/articleService'
import { getMe, updatePassword, deleteAccount } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import RecipeCard from '../components/recipes/RecipeCard'

export default function Profile() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState([])
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await getMe()
        setUser(me.data)

        const res = await getMyArticles()
        setArticles(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePasswordUpdate = async e => {
    e.preventDefault()
    try {
      await updatePassword(password)
      setPassword('')
      setMessage('Mot de passe mis à jour ✅')
    } catch (err) {
      console.error(err)
      setMessage('Erreur lors de la mise à jour')
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Supprimer définitivement votre compte ?')) return

    try {
      await deleteAccount()
      logout()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Chargement…</p>

  return (
    <section className="w-full flex flex-col gap-10 px-4 py-5 md:px-8">
      <div className="flex items-center gap-2">
        <img src="/profile.png" alt="" className="max-w-xxl" />
        <div className="flex flex-col gap-2.5">
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <form onSubmit={handlePasswordUpdate} className="border rounded p-4">
        <h2 className="font-semibold mb-2">Modifier le mot de passe</h2>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          className="border p-2 w-full mb-2"
          required
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Mettre à jour
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      <div onClick={handleDeleteAccount}>Supprimer mon compte</div>

      <div className="flex flex-col gap-5">
        <h2>Mes recettes</h2>

        {articles.length === 0 ? (
          <div>
            <p>Aucune recette pour le moment.</p>
            <Link to="/add-recipe">Ajouter une recette</Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {articles.map(article => (
              <RecipeCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
