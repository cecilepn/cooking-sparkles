import api from './api'

export const getAllArticles = async category => {
  const url =
    category && category !== 'All'
      ? `/articles?category=${category}`
      : '/articles'
  const res = await api.get(url)
  return res.data
}

export const getPublishedArticles = async category => {
  let url = '/articles/published'
  if (category && category !== 'All') {
    url += `?category=${category}`
  }
  const res = await api.get(url)
  return res.data
}

export const getArticleById = async id => {
  const res = await api.get(`/articles/${id}`)
  return res.data
}

export const createArticle = async (articleData, token) => {
  const res = await api.post('/articles', articleData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const publishArticle = async (id, token) => {
  const res = await api.patch(
    `/articles/${id}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const unpublishArticle = async (id, token) => {
  const res = await api.patch(
    `/articles/${id}/unpublish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const updateArticle = async (id, updatedData, token) => {
  const res = await api.put(`/articles/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const deleteArticle = async (id, token) => {
  const res = await api.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const getMyArticles = async token => {
  const res = await api.get('/articles/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
