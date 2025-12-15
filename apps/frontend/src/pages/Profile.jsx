import { useEffect, useState } from 'react'
import { getMyArticles } from '../services/articleService'
import { getMe, updatePassword, deleteAccount } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

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
    if (!confirm('⚠️ Supprimer définitivement votre compte ?')) return

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
    <section className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <button onClick={logout} className="text-red-500 underline">
          Se déconnecter
        </button>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="font-semibold mb-2">Informations</h2>
        <p>
          <strong>Nom :</strong> {user.name}
        </p>
        <p>
          <strong>Email :</strong> {user.email}
        </p>
        <p>
          <strong>Rôle :</strong> {user.role}
        </p>
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

      <div className="border rounded p-4">
        <h2 className="font-semibold mb-2 text-red-600">Zone dangereuse</h2>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded">
          Supprimer mon compte
        </button>
      </div>

      <div>
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
      </div>
    </section>
  )
}
