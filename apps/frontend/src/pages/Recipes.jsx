import { useState } from 'react'
import RecipesList from '../components/recipes/RecipesList'
import SearchBar from '../components/common/SearchBar'
import Filter from '../components/filters/Filter'

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
    <section className="flex flex-col gap-5 px-4 py-5 md:px-xl md:py-8">
      <h1>Recettes</h1>
      <SearchBar onSearch={setSearch} />
      <div className="flex">
        <div className="relative">
          <div className="h-fit sticky top-s min-w-[300px] pr-3">
            <h2>Filtres</h2>
            <Filter
              label="Catégorie"
              category={category}
              categories={categories}
              setCategory={setCategory}
            />
          </div>
        </div>
        <RecipesList category={category} search={search} />
      </div>
    </section>
  )
}
