import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import ProductDetail from "../pages/Products/ProductDetail";
import ResourceNotFound from "../pages/Errors/ResourceNotFound";
import Signup from "../pages/Login/Signup";
import useAuth from "../hooks/useAuth";

function AppRoutes() {
  const { user, loading } = useAuth(); // Gets the authentication status

  const isAuthenticated = user !== null;

  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<ResourceNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
