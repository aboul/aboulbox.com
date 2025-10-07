import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import InvalidPage from "./pages/InvalidPage.tsx";
import Layout from "./components/Layout";

const routes = createRoutesFromElements(
  <Route path="/" Component={App} ErrorBoundary={InvalidPage}>
    <Route path="/" Component={Layout} ErrorBoundary={InvalidPage} />
    <Route path="*" Component={NotFoundPage} />
  </Route>
);

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen bg-teal-950">
      <BackgroundBeams className="fixed inset-0" />
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
