import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Register from "./pages/Register.tsx"
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Login from './pages/Login.tsx'
import Home from "./pages/Home.tsx"
import Landing from './pages/Landing.tsx'

import UserResponses from './pages/UserResponses.tsx'
// Import your publishable key
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {

    path: "/",
    element: <>
      <SignedIn>
        <Home></Home>
      </SignedIn>
      <SignedOut>
        <Landing></Landing>
      </SignedOut>
    </>
  },
  {
    path:"/results",
    element:<UserResponses></UserResponses>
  }

]);
const PUBLISHABLE_KEY = "pk_test_aW1tdW5lLW94LTM1LmNsZXJrLmFjY291bnRzLmRldiQ"
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}>

      </RouterProvider>

    </ClerkProvider>
  </React.StrictMode>,
)