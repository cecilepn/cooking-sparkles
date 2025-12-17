export default function filter({ label, category, categories, setCategory }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="category" className="mr-2 font-medium">
        {label}
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
  )
}
