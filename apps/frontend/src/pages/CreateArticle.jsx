import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createArticle, publishArticle } from '../services/articleService'
import Button from '../components/common/Button'

export default function CreateArticle() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: '' }
  ])
  const [category, setCategory] = useState('Dessert')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('draft')

  if (!isAuthenticated) {
    return (
      <p className="p-6 md:p-10">
        Vous devez être connecté pour ajouter une recette.
      </p>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await createArticle(
        { title, content, category, ingredients },
        token
      )
      const articleId = res.data._id
      if (action === 'publish') await publishArticle(articleId, token)
      navigate(`/recipes/${articleId}`)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  const handleIngredientChange = (index, field, value) => {
    setIngredients(prev =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    )
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, { name: '', quantity: '', unit: '' }])
  }

  const removeIngredient = index => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <section className="min-h-screen flex flex-col gap-m p-6 md:p-10">
      <h1>Ajouter une recette</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Ingrédients</label>

          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Qté"
                value={ing.quantity}
                onChange={e =>
                  handleIngredientChange(index, 'quantity', e.target.value)
                }
                className="border p-2 rounded w-20"
              />
              <input
                type="text"
                placeholder="Unité"
                value={ing.unit}
                onChange={e =>
                  handleIngredientChange(index, 'unit', e.target.value)
                }
                className="border p-2 rounded w-20"
              />
              <input
                type="text"
                placeholder="Ingrédient"
                value={ing.name}
                onChange={e =>
                  handleIngredientChange(index, 'name', e.target.value)
                }
                required
                className="border p-2 rounded flex-1"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="border w-fit bg-white text-black py-2 px-4">
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="self-start text-sm underline">
            + Ajouter un ingrédient
          </button>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="content">Instructions</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={6}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border p-2 rounded">
            <option value="Dessert">Dessert</option>
            <option value="Plat">Plat</option>
            <option value="Sucré">Sucré</option>
            <option value="Salé">Salé</option>
            <option value="Facile">Facile</option>
            <option value="Difficile">Difficile</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-3">
          <Button
            type="submit"
            state={loading}
            variant="secondary"
            onClick={() => setAction('draft')}>
            Sauvegarder
          </Button>
          <Button
            type="submit"
            state={loading}
            variant="primary"
            onClick={() => setAction('publish')}>
            Publier
          </Button>
        </div>
      </form>
    </section>
  )
}
