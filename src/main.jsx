import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import "aos/dist/aos.css";
import AuthProvider from './Context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
