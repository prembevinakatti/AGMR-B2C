import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const role = watch("role");

  const onSubmit = async (data) => {
    try {
      if (!data.role) {
        toast.error("Please select a role");
        return;
      }

      setLoading(true);
      console.log("Data   : ",data);
      
      const response = await axios.post(
        "http://localhost:3000/api/agmr/auth/register",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        reset();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-1/2 py-20 flex justify-center items-center bg-[#0d0d0d] px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-md border border-blue-500/20 shadow-2xl rounded-3xl p-10"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
          📝 Register Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            id="name"
            label="Full Name"
            register={register}
            errors={errors}
            required
          />

          <InputField
            id="email"
            type="email"
            label="Email Address"
            register={register}
            errors={errors}
            required
            pattern={{
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            }}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            required
            minLength={{
              value: 6,
              message: "Password must be at least 6 characters",
            }}
          />

          <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register}
            errors={errors}
            required
            validate={(value) =>
              value === watch("password") || "Passwords do not match"
            }
          />

          {/* Role Checkboxes */}
          {/* Role Checkboxes */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Select Role
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-white font-medium">
                <input
                  type="checkbox"
                  value="Manager"
                  checked={role === "Manager"}
                  onChange={() =>
                    setValue("role", role === "Manager" ? "" : "Manager")
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                Manager
              </label>
              <label className="flex items-center gap-2 text-white font-medium">
                <input
                  type="checkbox"
                  value="Employee"
                  checked={role === "Employee"}
                  onChange={() =>
                    setValue("role", role === "Employee" ? "" : "Employee")
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                Employee
              </label>
            </div>
            {(!role || errors.role) && (
              <p className="text-red-400 text-sm mt-1">Role is required</p>
            )}
          </div>

          {/* Conditional Fields Based on Role */}
          {role === "Manager" && (
            <>
              <InputField
                id="managerNo"
                label="Manager Number"
                register={register}
                errors={errors}
                required
              />
              <InputField
                id="department"
                label="Department"
                register={register}
                errors={errors}
                required
              />
            </>
          )}

          {role === "Employee" && (
            <>
              <InputField
                id="empNo"
                label="Employee Number"
                register={register}
                errors={errors}
                required
              />
              <InputField
                id="department"
                label="Department"
                register={register}
                errors={errors}
                required
              />
            </>
          )}

          <motion.button
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: !loading ? 0.97 : 1 }}
            type="submit"
            disabled={loading}
            className={`w-full text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl shadow-md transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-300 font-semibold">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 underline hover:underline">
            Log In
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({
  id,
  label,
  type = "text",
  register,
  errors,
  required = false,
  pattern,
  minLength,
  validate,
}) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      placeholder={label}
      {...register(id, {
        required: required && `${label} is required`,
        pattern,
        minLength,
        validate,
      })}
      className="peer w-full bg-transparent border-2 border-blue-500 text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all"
    />
    <label
      htmlFor={id}
      className="absolute left-5 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
    >
      {label}
    </label>
    {errors[id] && (
      <p className="text-red-400 text-sm mt-1">{errors[id].message}</p>
    )}
  </div>
);

export default Register;
