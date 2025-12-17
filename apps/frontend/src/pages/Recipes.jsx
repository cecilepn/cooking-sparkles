import { useState } from 'react'
import RecipesList from '../components/recipes/RecipesList'
import SearchBar from '../components/common/SearchBar'

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
    <section>
      <h1 className="text-2xl font-bold mb-4">Recettes</h1>
      <SearchBar />
      <div className="">
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
