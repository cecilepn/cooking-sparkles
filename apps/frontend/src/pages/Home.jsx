import RecipesList from '../components/recipes/RecipesList'

export default function Home() {
  return (
    <>
      <section className="min-h-screen flex flex-col">
        <RecipesList />
      </section>
    </>
  )
}
