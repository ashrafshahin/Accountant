import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainRoots from './components/MainRoots.jsx'

import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Careers from './pages/Careers.jsx'

const routerShahin = createBrowserRouter([
  {
    path: "/",
    element: <MainRoots />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "contacts", Component: Contact },
      { path: "careers", Component: Careers },
    ]
    
  },

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routerShahin} />,
)
