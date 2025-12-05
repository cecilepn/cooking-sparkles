import { Link } from 'react-router-dom'

export default function RecipeCard() {
  return (
    <Link
      to="/recipes/id"
      className="max-w-[360px] flex flex-col items-center justify-center p-3">
      <div className="relative">
        <img src="/card-img.png" alt="" />
        <div className="absolute bottom-3 left-3 flex justify-between">
          <p>category</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <p>title recipe</p>
        <p>description recipe</p>
        <hr />
        <div className="flex justify-between">
          <p>Auteur</p>
          <p>JJ/MM/YYYY</p>
        </div>
      </div>
    </Link>
  )
}
