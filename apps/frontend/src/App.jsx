import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
