import api from './api'

export const getCommentsByArticle = async articleId => {
  const res = await api.get(`/articles/${articleId}/comments`)
  return res.data
}

export const getApprovedComments = async articleId => {
  const res = await api.get(`/articles/${articleId}/comments/approved`)
  return res.data
}

export const getCommentStats = async articleId => {
  const res = await api.get(`/articles/${articleId}/comments/stats`)
  return res.data
}

export const getCommentById = async (articleId, commentId) => {
  const res = await api.get(`/articles/${articleId}/comments/${commentId}`)
  return res.data
}

export const getAllComments = async token => {
  const res = await api.get('/comments/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const createComment = async (articleId, content, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  const res = await api.post(
    `/articles/${articleId}/comments`,
    { content },
    { headers }
  )
  return res.data
}

export const updateComment = async (articleId, commentId, content, token) => {
  const res = await api.put(
    `/articles/${articleId}/comments/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const approveComment = async (articleId, commentId, token) => {
  const res = await api.patch(
    `/articles/${articleId}/comments/${commentId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const reportComment = async (articleId, commentId, token) => {
  const res = await api.patch(
    `/articles/${articleId}/comments/${commentId}/report`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const deleteComment = async (articleId, commentId, token) => {
  const res = await api.delete(`/articles/${articleId}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const deleteCommentsByArticle = async (articleId, token) => {
  const res = await api.delete(`/articles/${articleId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
