import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginApi } from '../services/authService.js'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      const data = await loginApi({ email, password })
      login(data.token)
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    }
  }

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-m py-8 px-7">
        <h1>Se connecter</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-sm w-full">
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
          <div className="flex flex-col w-full">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link to="/register" className="text-blue-500 hover:underline">
          Créer un compte
        </Link>
      </section>
    </>
  )
}
