import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Login from './pages/Login/Login.tsx'
import Signup from './pages/Signup/SignUp.tsx'
import Protected from './pages/Protected/Protected.tsx'
import Profile from './pages/Profile/Profile.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
