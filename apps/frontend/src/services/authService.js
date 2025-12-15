import api from './api'

// Signup
export const signup = async ({ name, email, password }) => {
  const response = await api.post('/auth/signup', {
    name,
    email,
    password
  })
  return response.data
}

// Login
export const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

// Logout
export const logout = () => {
  localStorage.removeItem('token')
}
