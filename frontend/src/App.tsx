// import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "./pages/AddHotel.tsx";
import PrivateRoutes from "./components/PrivateRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <p>Home Page</p>
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/add-hotel",
    element: (
      <Layout>
        <PrivateRoutes>
          <AddHotel />
        </PrivateRoutes>
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
