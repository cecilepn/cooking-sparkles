import { useState } from 'react'
import RecipesList from '../components/recipes/RecipesList'
import SearchBar from '../components/common/SearchBar'

export default function Recipes() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

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
    <section className="flex flex-col gap-5 px-4 py-5 md:px-8">
      <h1>Recettes</h1>
      <SearchBar onSearch={setSearch} />
      <div>
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
      <RecipesList category={category} search={search} />
    </section>
  )
}
