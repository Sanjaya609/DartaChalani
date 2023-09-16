import { useAuth } from '@/providers'
import { privateRoutes } from '@/router/routes/private/private.routes'
import { publicRoutes } from '@/router/routes/public/public.routes'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@/utility/yup'

function App() {
  useEffect(() => {
    const defaultLang = 'ne'
    localStorage.setItem('lang', defaultLang)
  }, [])

  const { isAuthenticated } = useAuth()
  const router = createBrowserRouter(
    isAuthenticated ? privateRoutes : publicRoutes
  )
  return <RouterProvider router={router} />
}

export default App
