export default function Button({
  type = 'button',
  customClasses = '',
  state = false,
  variant = '',
  onClick,
  children
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={state}
      className={`py-2 px-4 rounded ${variant} ${customClasses}`}>
      {children}
    </button>
  )
}
