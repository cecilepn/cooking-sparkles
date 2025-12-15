import { createContext, useState, useContext, useEffect } from 'react'

// Créer un contexte
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Vérifie si un token est stocké dans le localStorage
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token) // Si un token existe, on marque l'utilisateur comme connecté
  }, [])

  const login = token => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
