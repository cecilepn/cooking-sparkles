export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="search"
        placeholder="Rechercher une recette..."
        onChange={e => onSearch(e.target.value)}
        className="border rounded p-2 w-full"
      />
    </div>
  )
}
