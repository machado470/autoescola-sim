import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import Result from "./pages/Result"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz/:sessionId", element: <Quiz /> },
  { path: "/resultado/:sessionId", element: <Result /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
