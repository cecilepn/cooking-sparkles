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
    <section className="flex flex-col gap-8 p-6 md:p-10">
      <h1>Recettes</h1>
      <SearchBar onSearch={setSearch} />
      <div className="flex flex-col gap-6 items-center md:flex-row md:items-start">
        <div className="h-fit w-full top-s gap-5 md:max-w-[300px]">
          <h2>Filtres</h2>
          <Filter
            label="Catégorie"
            category={category}
            categories={categories}
            setCategory={setCategory}
          />
        </div>
        <RecipesList category={category} search={search} />
      </div>
    </section>
  )
}
