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
  const [show, setShow] = useState(false)

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
      setMessage('Mot de passe mis à jour')
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

  const toggleParameters = () => {
    setShow(prev => !prev)
  }

  if (loading) return <p>Chargement…</p>

  return (
    <section className="min-h-screen w-full flex flex-col gap-10 p-6 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/profile.png" alt="" className="max-w-xxl" />
          <div className="flex flex-col gap-2.5">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div
          className="cursor-pointer self-end flex items-center gap-s link"
          onClick={toggleParameters}>
          <img src="/stylo.png" alt="" className="w-sm" />
          <p className="hidden md:block"> Modifier le profil</p>
        </div>
      </div>

      <div
        className={`flex flex-col gap-10 overflow-hidden transition-all duration-300 ease-out rounded 
          ${show ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <form
          onSubmit={handlePasswordUpdate}
          className="flex flex-col gap-2 p-5 border rounded-md">
          <h2 className="font-semibold mb-2">Modifier le mot de passe</h2>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="border p-2 w-full mb-2"
            required
          />
          <button>Mettre à jour</button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>

        <div
          onClick={handleDeleteAccount}
          className="text-red-error-600 cursor-pointer self-end hover:underline">
          Supprimer mon compte
        </div>
      </div>

      <div className="flex flex-col gap-14">
        <h2>Mes recettes</h2>

        {articles.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p>Aucune recette pour le moment.</p>
            <Link to="/add-recipe" className="link">
              Publier une recette ?
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
            {articles.some(a => a.published) && (
              <>
                <h3 className="col-span-3 font-semibold">Publiées</h3>
                {articles
                  .filter(article => article.published)
                  .map(article => (
                    <RecipeCard key={article._id} article={article} />
                  ))}
              </>
            )}

            {articles.some(a => !a.published) && (
              <>
                <h3 className="col-span-3 font-semibold mt-6">Brouillons</h3>
                {articles
                  .filter(article => !article.published)
                  .map(article => (
                    <RecipeCard key={article._id} article={article} />
                  ))}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
