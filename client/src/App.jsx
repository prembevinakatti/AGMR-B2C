import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LandingPage from "./components/Pages/LandingPage";
import AppRoutes from "./components/Routes/AppRouter";
import Navbar from "./components/utils/Navbar";
import Dock from "./components/utils/Dock";
import { useSelector } from "react-redux";
import HomePage from "./components/Pages/HomePage";
import ApplyLeavePage from "./components/Pages/ApplyLeavePage";
import AcceptReject from "./components/Pages/AcceptReject";

function App() {
  const { authUser } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <AppRoutes />
      {authUser && <Dock />}
    </>
  );
}

export default App;
