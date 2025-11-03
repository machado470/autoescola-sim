import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import Simulado from '../../pages/Simulado';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/simulado',
    element: <Simulado />,
  },
  {
    path: '*',
    element: (
      <div style={{ padding: '2rem', color: '#c00' }}>
        ⚠️ Rota não encontrada.
      </div>
    ),
  },
]);
