import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from "./appwrite/auth"
import { Header, Footer } from './components'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-base)]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-hairline)] border-t-[var(--color-accent)]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-base)]">
      <Header />
      <main key={location.pathname} className="animate-fade-in flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
