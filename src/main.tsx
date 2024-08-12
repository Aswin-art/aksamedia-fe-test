import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/login.tsx";
import { Toaster } from "react-hot-toast";
import Loading from "./components/loading.tsx";
import Index from "./pages/dashboard/index.tsx";
import Create from "./pages/dashboard/create.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/create/user",
    element: <Create />,
  },
  {
    path: "/update/user/:id",
    element: <Create />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </StrictMode>
);
