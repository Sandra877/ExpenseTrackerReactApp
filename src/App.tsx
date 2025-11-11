
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import LandingPage from './Pages/LandingPage'
import NewuserPage from './Pages/NewuserPage'
import ContactUsPage  from './Pages/ContactUsPage'
import { AboutPage } from './Pages/AboutPage'
import { Verification } from './components/auth/Verification'
import Error from "./components/nav/Error"


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NewuserPage />
    },
     {
      path: '/landingpage',
      element: <LandingPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
     {
      path: '/contactus',
      element: <ContactUsPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/verify',
      element: <Verification />
    },
    {
      path: '*',
      element: <Error />
    }

  ])
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
