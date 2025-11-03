import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from '../../pages/Home';
import Simulado from '../../pages/Simulado';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'simulado', element: <Simulado /> },
    ],
  },
]);
