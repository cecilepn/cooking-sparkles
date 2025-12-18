import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/authService.js'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const data = await signup({ name, email, password })
      login(data.token)
      navigate('/profile')
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(err.response?.data?.message || 'Erreur lors de l’inscription')
    }
  }

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4 py-8 px-7">
      <h1>Créer un compte</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email">Adresse mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col relative w-full">
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2">
            {showPassword ? 'Cacher' : 'Voir'}
          </div>
        </div>

        <div className="flex flex-col relative w-full">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full">
          S’inscrire
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Link to="/login" className="text-blue-500 mt-4 hover:underline">
        Déjà un compte ? Se connecter
      </Link>
    </section>
  )
}
