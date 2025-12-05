import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import LandingPage from "./Pages/LandingPage";
import NewuserPage from "./Pages/NewuserPage";
import ContactUsPage from "./Pages/ContactUsPage";
import { AboutPage } from "./Pages/AboutPage";
import { Verification } from "./components/auth/Verification";
import Error from "./components/nav/Error";
import AdminDashboard from "./Pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import React from "react";



// Protect admin pages
const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<{ role?: string }>(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/landingpage" />;
    }
  } catch {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <NewuserPage /> },
    { path: "/landingpage", element: <LandingPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/contactus", element: <ContactUsPage /> },
    { path: "/register", element: <Register /> },
    { path: "/verify/:token", element: <Verification /> },
    { path: "/login", element: <Login /> },

    // ADMIN ROUTE
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      ),
    },

    { path: "*", element: <Error /> },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
