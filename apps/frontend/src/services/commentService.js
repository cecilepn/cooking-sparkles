import api from './api'

export const getCommentsByArticle = async articleId => {
  const res = await api.get(`/articles/${articleId}/comments`)
  return res.data
}

export const createComment = async (articleId, content) => {
  const res = await api.post(`/articles/${articleId}/comments`, {
    content
  })
  return res.data
}
