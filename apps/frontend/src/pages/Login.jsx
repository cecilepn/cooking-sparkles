import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-m">
        <form action="POST" className="flex flex-col items-center gap-sm">
          <div className="flex flex-col">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" id="" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="" />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <Link to="/register">Créer un compte</Link>
      </section>
    </>
  )
}
