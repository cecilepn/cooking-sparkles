import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      console.log('Utilisateur connecté', data)
      navigate('/profile')
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(err.response?.data?.message || 'Erreur de connexion')
    }
  }

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-m">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-sm">
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
          <button type="submit">Se connecter</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link to="/register">Créer un compte</Link>
      </section>
    </>
  )
}
