import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainRoots from './components/MainRoots.jsx'
import Contacts from './pages/Contacts.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'

const routerShahin = createBrowserRouter([
  {
    path: "/",
    element: <MainRoots />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "contacts", Component: Contacts },
    ]
    
  },

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routerShahin} />,
)
