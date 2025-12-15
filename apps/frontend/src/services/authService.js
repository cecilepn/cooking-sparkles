import api from './api'

export const signup = async ({ name, email, password }) => {
  const response = await api.post('/auth/signup', {
    name,
    email,
    password
  })
  return response.data
}

export const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
}

// get user account connected
export const getMe = async () => {
  const res = await api.get('/auth/me')
  return res.data
}

export const updatePassword = async password => {
  const res = await api.put('/auth/me', { password })
  return res.data
}

export const deleteAccount = async () => {
  const res = await api.delete('/auth/me')
  return res.data
}
