import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
];
