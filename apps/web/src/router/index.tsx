/** Define rotas do app, incluindo proteção para áreas autenticadas. */
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Trilhas from '../pages/Trilhas'
import Aula from '../pages/Aula'
import Simulado from '../pages/Simulado'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Perfil from '../pages/Perfil'
import Instrutor from '../pages/Instrutor'
import Dashboard from '../pages/Dashboard'
import Relatorios from '../pages/Relatorios'
import { PrivateRoute } from './PrivateRoute'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/trilhas', element: <Trilhas /> },
  { path: '/aula/:trackId', element: <Aula /> },
  { path: '/simulado/:curso', element: <Simulado /> },
  {
    path: '/perfil',
    element: (
      <PrivateRoute>
        <Perfil />
      </PrivateRoute>
    ),
  },
  {
    path: '/instrutor',
    element: (
      <PrivateRoute>
        <Instrutor />
      </PrivateRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/relatorios',
    element: (
      <PrivateRoute>
        <Relatorios />
      </PrivateRoute>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
])
