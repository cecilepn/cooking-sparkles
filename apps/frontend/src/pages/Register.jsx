import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center gap-m">
        <form action="POST" className="flex flex-col items-center gap-sm">
          <div className="flex flex-col w-full">
            <label htmlFor="pseudo">pseudo</label>
            <input type="text" name="pseudo" id="" />
          </div>
          <div className="flex gap-s">
            <div className="flex flex-col">
              <label htmlFor="pseudo">Prénom</label>
              <input type="text" name="pseudo" id="" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pseudo">Nom</label>
              <input type="text" name="pseudo" id="" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" id="" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="matchPassword">Confirmer mot de passe</label>
            <input type="password" name="matchPassword" id="" />
          </div>
          <button type="submit" className="w-full">
            Créer un compte
          </button>
        </form>
        <Link to="/login">Déjà un compte ?</Link>
      </section>
    </>
  )
}
