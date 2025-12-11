import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/authService.js'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      const data = await signup({ name, email, password })
      localStorage.setItem('token', data.token)
      console.log('Utilisateur créé', data.user)
      navigate('/profile') // redirection après inscription
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(err.response?.data?.message || 'Erreur lors de l’inscription')
    }
  }

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Adresse mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded">
          S’inscrire
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Link to="/login" className="text-blue-500 mt-4">
        Déjà un compte ? Se connecter
      </Link>
    </section>
  )
}
