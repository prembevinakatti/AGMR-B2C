import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LandingPage from "./components/Pages/LandingPage";
import AppRoutes from "./components/Routes/AppRouter";
import Navbar from "./components/utils/Navbar";
import Dock from "./components/utils/Dock";

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes />
      {/* <Dock /> */}
    </>
  );
}

export default App;
