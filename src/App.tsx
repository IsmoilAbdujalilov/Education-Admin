import Routes from "./Routes";
import { Loader } from "./components";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Error = lazy(() => import("./pages/Error"));
  const Login = lazy(() => import("./pages/Login"));
  const Course = lazy(() => import("./pages/Course"));
  const Profile = lazy(() => import("./pages/Profile"));
  const ReadCourse = lazy(() => import("./pages/ReadCourse"));
  const Categories = lazy(() => import("./pages/Categories"));
  const EditCourse = lazy(() => import("./pages/EditCourse"));
  const CreateCourse = lazy(() => import("./pages/CreateCourse"));
  const Registration = lazy(() => import("./pages/Registration"));
  const EditCategories = lazy(() => import("./pages/EditCategories"));
  const CreateCategory = lazy(() => import("./pages/CreateCategory"));

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Routes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          element: <Categories />,
          path: "/pages/category",
        },
        {
          element: <EditCategories />,
          path: "/pages/category/:id",
        },
        {
          element: <CreateCategory />,
          path: "/pages/category/create",
        },
        {
          element: <Profile />,
          path: "/pages/profile",
        },
        {
          element: <Course />,
          path: "/pages/course",
        },
        {
          element: <CreateCourse />,
          path: "/pages/course/create",
        },
        {
          element: <EditCourse />,
          path: "/pages/course/:id",
        },
        {
          element: <ReadCourse />,
          path: "/pages/course/read/:id",
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      element: <Registration />,
      path: "/pages/registration",
    },
    {
      element: <Login />,
      path: "/pages/login",
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
