// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Member from './pages/Member/Member';
import MemberGroup from './pages/Member/MemberGroup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'member',
        element: <Member />,
        children: [
          {
            path: 'group',
            element: <MemberGroup />,
          },
        ],
      },
      {
        path: 'schedule',
        element: <></>,
        children: [
          {
            path: 'ins-month',
            element: <></>,
          },
          {
            path: 'ins-week',
            element: <></>,
          },
          {
            path: 'ins-day',
            element: <></>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
);
