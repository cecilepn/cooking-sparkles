import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Recipe from '../pages/Recipe'
import CreateArticle from '../pages/CreateArticle'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <Recipes /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: '/recipes/:id', element: <Recipe /> },
      { path: '/add-recipe', element: <CreateArticle /> }
    ]
  }
])
