import { createBrowserRouter } from 'react-router-dom';
import { GuestLayout, UserLayout } from './layouts';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Records from './pages/Records';
import Playlist from './pages/Playlist';
import PlaySchedule from './pages/PlaySchedule';
import BreadCrumb from './components/BreadCrumb';
import Contract from './pages/Manage/Contract';
import Device from './pages/Manage/Device';
import Authority from './pages/Manage/Authority';
import Usage from './pages/Manage/Usage';
import Report from './pages/Revenue/Report';
import Distribution from './pages/Revenue/Distribution';
import ContrastHistory from './pages/Revenue/ContrastHistory';
import Authorize from './pages/Setting/Authorize';
import Configuration from './pages/Setting/Configuration';
import SettingContract from './pages/Setting/Contract';
import WorkSetting from './pages/Setting/Work';
import Cycle from './pages/Setting/Cycle';
import UserManual from './pages/Support/UserManual';
import Download from './pages/Support/Download';
import Feedback from './pages/Support/Feedback';
import App from './App';
import Profile from './pages/Auth/Profile';
import ContractDetail from './pages/Manage/Contract/Authorization/ContractDetail';
import AddAuthorizedContract from './pages/Manage/Contract/Authorization/AddContract';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/records',
        element: <Records />,
      },
      {
        path: '/playlist',
        element: <Playlist />,
      },
      {
        path: '/play-schedule',
        element: <PlaySchedule />,
      },
      {
        path: '/manage',
        element: <BreadCrumb />,
        children: [
          {
            path: '/manage/contract',
            element: <Contract />,
          },
          {
            path: '/manage/authority',
            element: <Authority />,
          },
          {
            path: '/manage/usage',
            element: <Usage />,
          },
        ],
      },
      {
        path: '/manage/device',
        element: <Device />,
      },
      {
        path: '/revenue',
        element: <BreadCrumb />,
        children: [
          {
            path: '/revenue/report',
            element: <Report />,
          },
          {
            path: '/revenue/contrast-history',
            element: <ContrastHistory />,
          },
          {
            path: '/revenue/distribution',
            element: <Distribution />,
          },
        ],
      },
      {
        path: '/setting',
        element: <BreadCrumb />,
        children: [
          {
            path: '/setting/authorize',
            element: <Authorize />,
          },
          {
            path: '/setting/configuration',
            element: <Configuration />,
          },
          {
            path: '/setting/contract',
            element: <SettingContract />,
          },
          {
            path: '/setting/work',
            element: <WorkSetting />,
          },
          {
            path: '/setting/cycle',
            element: <Cycle />,
          },
        ],
      },
      {
        path: '/support',
        element: <BreadCrumb />,
        children: [
          {
            path: '/support/user-manual',
            element: <UserManual />,
          },
          {
            path: '/support/download',
            element: <Download />,
          },
          {
            path: '/support/feedback',
            element: <Feedback />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <UserLayout isDrawer={true} />,
    children: [
      {
        path: '/manage/contract/d/:id',
        element: <ContractDetail />,
      },
      {
        path: '/manage/contract/authorization-contract/add',
        element: <AddAuthorizedContract />,
      },
    ],
  },
]);

export default router;
