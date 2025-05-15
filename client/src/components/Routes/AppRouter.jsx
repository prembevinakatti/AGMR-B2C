import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomePage from "../Pages/HomePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
