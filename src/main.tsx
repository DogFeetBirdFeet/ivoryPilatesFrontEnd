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
import MemberRegister from './pages/Member/MemberRegister';
import ClsPass from './pages/ClassPass';
import InsDay from './pages/Schedule/InsDay';
import InsWeek from './pages/Schedule/InsWeek';
import MemberDetail from './pages/Member/MemberDetail';
import InsMonth from './pages/Schedule/InsMonth.tsx';

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
        element: <MemberRegister />,
      },
      {
        path: 'member/detail/:memberId',
        element: <MemberDetail />,
      },
      {
        path: 'schedule',
        element: <InsDay />,
      },
      {
        path: 'schedule/ins-month',
        element: <InsMonth></InsMonth>,
      },
      {
        path: 'schedule/ins-week',
        element: <InsWeek />,
      },
      {
        path: 'schedule/ins-day',
        element: <InsDay />,
      },
      {
        path: 'class-pass',
        element: <ClsPass />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
);
