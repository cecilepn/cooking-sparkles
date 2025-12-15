import api from './api'

export const getAllArticles = async category => {
  const url =
    category && category !== 'All'
      ? `/articles?category=${category}`
      : '/articles'
  const res = await api.get(url)
  return res.data
}

export const getArticleById = async id => {
  const response = await api.get(`/articles/${id}`)
  return response.data
}

export const createArticle = async (articleData, token) => {
  const response = await api.post('/articles', articleData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const deleteArticle = async id => {
  const response = await api.delete(`/articles/${id}`)
  return response.data
}

export const getMyArticles = async () => {
  const response = await api.get('/articles/me')
  return response.data
}
