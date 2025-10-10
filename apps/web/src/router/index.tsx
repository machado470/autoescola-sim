/**
 * Define rotas do app.
 * TODO: proteger /instrutor e /perfil com guard de auth.
 */
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Trilhas from '../pages/Trilhas'
import Aula from '../pages/Aula'
import Simulado from '../pages/Simulado'
import Perfil from '../pages/Perfil'
import Instrutor from '../pages/Instrutor'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

export const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/trilhas', element: <Trilhas/> },
  { path: '/aula/:trackId', element: <Aula/> },
  { path: '/simulado/:curso', element: <Simulado/> },
  { path: '/perfil', element: <Perfil/> },
  { path: '/instrutor', element: <Instrutor/> },
  { path: '/login', element: <Login/> },
  { path: '/cadastro', element: <Cadastro/> }
])
