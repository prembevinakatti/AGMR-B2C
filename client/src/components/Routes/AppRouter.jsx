import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomePage from "../Pages/HomePage";
import ProfilePage from "../Pages/ProfilePage";
import ApplyLeavePage from "../Pages/ApplyLeavePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/apply-leave" element={<ApplyLeavePage />} />
  </Routes>
);

export default AppRoutes;
