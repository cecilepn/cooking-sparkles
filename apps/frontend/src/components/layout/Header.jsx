import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/login')
  }

  return (
    <header className="p-6 md:px-10">
      <nav className="flex gap-2 items-center justify-around md:gap-4  md:justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">Accueil</Link>
          <Link to="/recipes">Recettes</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/add-recipe" className="w-full">
                Ajouter une recette
              </Link>

              <div className="relative">
                <img
                  src="/profile.png"
                  alt="Profil"
                  className="h-8 w-fit cursor-pointer"
                  onClick={() => setOpen(prev => !prev)}
                />
                {open && (
                  <div className="w-header absolute right-0 mt-2 border shadow-md rounded-md flex flex-col gap-2 p-3 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="p-0.5">
                      Mon profil
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="cursor-pointer p-0.5"
                      role="button">
                      Se déconnecter
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">Se connecter</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
