import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from './components/NotFound/NotFound';
import { ProtectedAdmin, ProtectedStudent } from './components/Protected';
import { DefaultLayoutAdmin } from './pages/Admin/components/Layout';
import AdminChangeInfomation from './pages/Admin/pages/AdminChangeInfomation';
import ManagerAuthorizationPage from './pages/Admin/pages/ManagerAuthorizationPage';
import ManagerClassPage from './pages/Admin/pages/ManagerClassPage';
import ManagerCoursePage from './pages/Admin/pages/ManagerCoursePage';
import ManagerErrorImportPage from './pages/Admin/pages/ManagerErrorImportPage';
import ManagerHomePage from './pages/Admin/pages/ManagerHomePage';
import ManagerMajorPage from './pages/Admin/pages/ManagerMajorPage';
import ManagerSemestersPage from './pages/Admin/pages/ManagerSemestersPage';
import ManagerStatisticalPage from './pages/Admin/pages/ManagerStatisticalPage';
import ManagerStatusPage from './pages/Admin/pages/ManagerStatusPage';
import ManagerStudentPage from './pages/Admin/pages/ManagerStudentPage';
import ManagerTermPointPage from './pages/Admin/pages/ManagerTermPointPage';
import ManagerYearPointPage from './pages/Admin/pages/ManagerYearPointPage';
import AboutUsPageUser from './pages/User/pages/AboutUsPageUser';
import ChangePasswordPage from './pages/User/pages/ChangePasswordPage';
import DocumentPageUser from './pages/User/pages/DocumentPageUser';
import HomePageUser from './pages/User/pages/HomePageUser';
import PersonalInfoUser from './pages/User/pages/PersonalInfoUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePageUser />,
    errorElement: <NotFound />,
  },
  {
    path: '/aboutus',
    element: <AboutUsPageUser />,
    errorElement: <NotFound />,
  },
  {
    path: '/documents',
    element: <DocumentPageUser />,
    errorElement: <NotFound />,
  },
  {
    path: '/personal',
    element: (
      <ProtectedStudent>
        <PersonalInfoUser />
      </ProtectedStudent>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/changepassword',
    element: <ChangePasswordPage />,
    errorElement: <NotFound />,
  },

  // Admin routes
  {
    path: '/manage',
    element: (
      <ProtectedAdmin>
        <DefaultLayoutAdmin />
      </ProtectedAdmin>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <ManagerHomePage />,
        errorElement: <NotFound />,
      },
      {
        path: 'students',
        element: <ManagerStudentPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'classes',
        element: <ManagerClassPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'semesters',
        element: <ManagerSemestersPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'courses',
        element: <ManagerCoursePage />,
        errorElement: <NotFound />,
      },
      {
        path: 'authorization',
        element: <ManagerAuthorizationPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'majors',
        element: <ManagerMajorPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'points-term',
        element: <ManagerTermPointPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'points-year',
        element: <ManagerYearPointPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'status',
        element: <ManagerStatusPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'infomation',
        element: <AdminChangeInfomation />,
        errorElement: <NotFound />,
      },
      {
        path: 'statistical',
        element: <ManagerStatisticalPage />,
        errorElement: <NotFound />,
      },
      {
        path: 'error-import',
        element: <ManagerErrorImportPage />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
