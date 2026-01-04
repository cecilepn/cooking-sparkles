import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="p-6 md:px-10">
      <nav className="flex gap-4">
        <Link to="/">Accueil</Link>
        <Link to="/recipes">Recettes</Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile">Mon profil</Link>
            <Link to="/add-recipe">Ajouter une recette</Link>
            <div onClick={handleLogout}>Se déconnecter</div>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </nav>
    </header>
  )
}
