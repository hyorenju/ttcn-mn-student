import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/Error/ErrorPage";
import { NotFound } from "./components/NotFound/NotFound";
import { DefaultLayoutAdmin } from "./pages/Admin/components/Layout";
import AdminChangeInfomation from "./pages/Admin/pages/AdminChangeInfomation";
import ManagerAuthorizationPage from "./pages/Admin/pages/ManagerAuthorizationPage";
import ManagerClassPage from "./pages/Admin/pages/ManagerClassPage";
import ManagerCoursePage from "./pages/Admin/pages/ManagerCoursePage";
import ManagerDisplayHomePage from "./pages/Admin/pages/ManagerDisplayHomePage";
import ManagerDisplaySildeCardHomePage from "./pages/Admin/pages/ManagerDisplaySildeCardHomePage";
import ManagerDisplaySlideHomePage from "./pages/Admin/pages/ManagerDisplaySlideHomePage";
import ManagerErrorImportPage from "./pages/Admin/pages/ManagerErrorImportPage";
import ManagerHomePage from "./pages/Admin/pages/ManagerHomePage";
import ManagerMajorPage from "./pages/Admin/pages/ManagerMajorPage";
import ManagerNewsPage from "./pages/Admin/pages/ManagerNewsPage";
import ManagerSemestersPage from "./pages/Admin/pages/ManagerSemestersPage";
import ManagerStatisticalPage from "./pages/Admin/pages/ManagerStatisticalPage";
import ManagerStatusPage from "./pages/Admin/pages/ManagerStatusPage";
import ManagerStudentPage from "./pages/Admin/pages/ManagerStudentPage";
import ManagerTermPointPage from "./pages/Admin/pages/ManagerTermPointPage";
import AboutUsPageUser from "./pages/User/pages/AboutUsPageUser";
import ChangePasswordPage from "./pages/User/pages/ChangePasswordPage";
import DocumentPageUser from "./pages/User/pages/DocumentPageUser";
import HomePageUser from "./pages/User/pages/HomePageUser";
import NewsPageDetailUser from "./pages/User/pages/NewsPageDetailUser";
import NewsPageUser from "./pages/User/pages/NewsPageUser";
import PersonalInfoUser from "./pages/User/pages/PersonalInfoUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/news",
    element: <NewsPageUser />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":newsId",
        element: <NewsPageDetailUser />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/aboutus",
    element: <AboutUsPageUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/documents",
    element: <DocumentPageUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/personal",
    element: <PersonalInfoUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/changepassword",
    element: <ChangePasswordPage />,
    errorElement: <ErrorPage />,
  },

  // Admin routes
  {
    path: "/manage",
    element: <DefaultLayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ManagerHomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students",
        element: <ManagerStudentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classes",
        element: <ManagerClassPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "semesters",
        element: <ManagerSemestersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "courses",
        element: <ManagerCoursePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "authorization",
        element: <ManagerAuthorizationPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "majors",
        element: <ManagerMajorPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "points",
        element: <ManagerTermPointPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "status",
        element: <ManagerStatusPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "error-import",
        element: <ManagerErrorImportPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "infomation",
        element: <AdminChangeInfomation />,
        errorElement: <ErrorPage />,
      },
      {
        path: "statistical",
        element: <ManagerStatisticalPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "news",
        element: <ManagerNewsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "display-homepage",
        element: <ManagerDisplayHomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "slidecard-homepage",
        element: <ManagerDisplaySildeCardHomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "slide-homepage",
        element: <ManagerDisplaySlideHomePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
