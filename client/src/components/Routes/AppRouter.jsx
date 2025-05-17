import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomePage from "../Pages/HomePage";
import ProfilePage from "../Pages/ProfilePage";
import ApplyLeavePage from "../Pages/ApplyLeavePage";
import StatusPage from "../Pages/StatusPage";
import AcceptReject from "../Pages/AcceptReject";
import EmployeeStatusPage from "../Pages/EmployeeStatusPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/apply-leave" element={<ApplyLeavePage />} />
    <Route path="/status" element={<StatusPage />} />
    <Route path="/accept-reject" element={<AcceptReject />} />
    <Route path="/employee-status" element={<EmployeeStatusPage />} />
  </Routes>
);

export default AppRoutes;
