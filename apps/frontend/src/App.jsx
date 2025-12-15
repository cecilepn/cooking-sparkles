import { AuthProvider } from './context/AuthContext'
import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
