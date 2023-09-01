import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/scss/main.scss";
import FallbackLoader from "./components/FallbackLoader";
import Layout from "./components/layout";
import { useAuth } from "./providers/ApplicationProvider";
import { privateRoutes } from "./routes/private/privateRoute";
import { publicRoutes } from "./routes/public/publicRoutes";

function App() {
  const { isAuthenticated } = useAuth();
  const privaterouter = createBrowserRouter(privateRoutes);
  const publicRouter = createBrowserRouter(publicRoutes);
  return (
    <>
      <ToastContainer />
      <Layout.Wrapper>
        <Layout.Base>
          <React.Suspense fallback={<FallbackLoader />}>
            {isAuthenticated ? (
              <RouterProvider router={privaterouter} />
            ) : (
              <RouterProvider router={publicRouter} />
            )}
          </React.Suspense>
        </Layout.Base>
      </Layout.Wrapper>
    </>
  );
}

export default App;
