/**
 * App Shell e roteamento base.
 * TODO: inserir Provider de Auth e Progress; configurar rotas públicas/privadas.
 */
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
export default function App(){ return <RouterProvider router={router} /> }
