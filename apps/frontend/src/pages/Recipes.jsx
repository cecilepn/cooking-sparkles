import { useState } from 'react'
import RecipesList from '../components/recipes/RecipesList'

export default function Recipes() {
  const [category, setCategory] = useState('All')

  const categories = [
    'All',
    'Dessert',
    'Plat',
    'Sucré',
    'Salé',
    'Facile',
    'Difficile',
    'Autre'
  ]

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recettes</h1>

      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-medium">
          Filtrer par catégorie :
        </label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded p-1">
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <RecipesList category={category} />
    </section>
  )
}
