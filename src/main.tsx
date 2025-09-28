// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './common/Layout/Layout';
import Member from './pages/Member/Member';
import MemberGroup from './pages/Member/MemberGroup';
import Register from './pages/Member/Register';
import ClsPass from './pages/ClassPass';

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
      },
      {
        path: 'member/group',
        element: <MemberGroup />,
      },
      {
        path: 'member/register',
        element: <Register />,
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
      {
        path: 'class-pass',
        element: <ClsPass />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
);
