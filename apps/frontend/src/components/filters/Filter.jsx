export default function filter({ label, category, categories, setCategory }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="mt-5 font-medium">
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
