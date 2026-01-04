import { Link } from 'react-router-dom'

export default function RecipeCard({ article }) {
  return (
    <Link
      to={`/recipes/${article._id}`}
      className="w-full flex flex-col gap-3 p-5 border rounded-2xl hover:shadow">
      <div className="relative">
        <img src="/card-img.png" alt={article.title} className="w-full" />
        <span className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded">
          {article.category}
        </span>
      </div>

      <h3 className="font-semibold truncate">{article.title}</h3>
      <p className="text-sm text-gray-600">{article.resume}</p>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{article.author}</span>
        <span>{article.views} vues</span>
      </div>
    </Link>
  )
}
