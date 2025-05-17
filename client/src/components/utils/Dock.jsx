import React from "react";
import {
  Home,
  UserCircle,
  Briefcase,
  MessagesSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

// Updated icons array: Removed "Projects", added "Apply Leave"
const icons = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Apply Leave", icon: Briefcase, path: "/apply-leave" },
  { name: "Messages", icon: MessagesSquare, path: "/messages" },
  { name: "Profile", icon: UserCircle, path: "/profile" },
];

const Dock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const handleLogout = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/agmr/auth/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      navigate("/login");
      toast.success(response.data.message);
      dispatch(setAuthUser(null));
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/20 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3 flex space-x-6 z-50 shadow-2xl">
      {icons.map(({ name, icon: Icon, path }, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col items-center justify-end"
        >
          <div className="absolute bottom-full mb-2 text-sm font-semibold text-white bg-black/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90 group-hover:scale-100">
            {name}
          </div>
          <button
            onClick={() => handleClick(path)}
            className="text-white p-2 rounded-full border border-white hover:scale-125 transition-transform duration-300"
          >
            <Icon size={28} weight="duotone" />
          </button>
        </div>
      ))}

      {/* Logout Button */}
      <div className="group relative flex flex-col items-center justify-end">
        <div className="absolute bottom-full mb-2 text-sm font-semibold text-white bg-black/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90 group-hover:scale-100">
          Logout
        </div>
        <button
          onClick={handleLogout}
          className="text-red-500 p-2 rounded-full border border-red-500 hover:scale-125 transition-transform duration-300"
        >
          <LogOut size={28} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};

export default Dock;
