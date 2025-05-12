import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Dashboard from './Pages/Dashboard/Dashboard'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        }
      ]
    }
  ])

  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default App
