import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="p-4 bg-gray-100">
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
