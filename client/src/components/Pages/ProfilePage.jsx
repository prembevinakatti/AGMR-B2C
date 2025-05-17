import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle2, Mail, BadgeCheck, X } from "lucide-react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const userProfile = useGetUserProfile();

  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update state when userProfile is loaded or changes
  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
      setEditedUser(userProfile);
    }
  }, [userProfile]);

  // Show loading until user data is ready
  if (!user || !editedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setUser(editedUser);
    try {
      if (editedUser.newPassword !== editedUser.confirmNewPassword) {
        toast.error("New Password and Confirm New Password should be same");
        return;
      }
      const response = await axios.put(
        `http://localhost:3000/api/agmr/auth/updateUser`,
        {
          newName: editedUser.name,
          newEmail: editedUser.email,
          currentPassword: editedUser.currentPassword,
          newPassword: editedUser.newPassword,
          confirmNewPassword: editedUser.confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log("Error Updating user : ", error.message);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-6 overflow-hidden">
      {/* Neon Blobs for main page */}
      <motion.div
        className="absolute w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-40 top-10 left-10"
        animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-40 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-xl bg-gray-900/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 text-white flex flex-col items-center text-center"
      >
        <UserCircle2 className="w-24 h-24 text-blue-400 drop-shadow-[0_0_10px_#3b82f6]" />

        <h2 className="text-3xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]">
          {user.name}
        </h2>

        <div className="mt-4 text-sm text-gray-300 flex flex-col gap-1">
          <p className="flex items-center gap-2 justify-center">
            <Mail className="w-4 h-4 text-pink-400" /> {user.email}
          </p>
          <p className="flex items-center gap-2 justify-center">
            <BadgeCheck className="w-4 h-4 text-purple-400" /> {user.role}
          </p>
          <p className="flex items-center gap-2 justify-center">
            <span className="text-blue-400 font-medium">No Of Leaves:</span>{" "}
            {user.numberOfLeaves ?? "N/A"}
          </p>
          <p className="flex items-center gap-2 justify-center">
            <span className="text-blue-400 font-medium">Department:</span>{" "}
            {user.department ?? "N/A"}
          </p>
          {/* <p className="flex items-center gap-2 justify-center">
            <span className="text-blue-400 font-medium">Employee No:</span>{" "}
            {(user.empNo ?? "N/A") || (user.mgrNo ?? "N/A")}
          </p> */}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 shadow-lg font-semibold transition hover:opacity-90"
        >
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Neon Blobs inside modal */}
            <motion.div
              className="absolute w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-30 -top-20 -left-20"
              animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-30 -bottom-20 -right-20"
              animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 bg-gray-900/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl w-full max-w-md p-6 text-white"
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                onClick={handleCancel}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]">
                Edit Profile
              </h2>
              <div className="flex flex-col gap-3 relative z-20">
                <input
                  type="text"
                  name="name"
                  value={editedUser.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-black/30 border border-blue-500 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition shadow-md"
                />
                <input
                  type="email"
                  name="email"
                  value={editedUser.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-black/30 border border-blue-500 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition shadow-md"
                />
                <input
                  type="password"
                  name="currentPassword"
                  value={editedUser.currentPassword || ""}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="bg-black/30 border border-blue-500 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition shadow-md"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={editedUser.newPassword || ""}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="bg-black/30 border border-blue-500 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition shadow-md"
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={editedUser.confirmNewPassword || ""}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="bg-black/30 border border-blue-500 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition shadow-md"
                />
              </div>

              <div className="mt-6 flex justify-between relative z-20">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-green-400 to-emerald-600 font-semibold hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
