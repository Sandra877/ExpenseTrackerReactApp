//import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

type LoginInputs = {
  email: string;
  password: string;
};

type JwtPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
  exp: number;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Invalid email or password");
        return;
      }

      // ✅ save token
      localStorage.setItem("token", result.token);

      // ✅ decode token to get role
      const decoded = jwtDecode<JwtPayload>(result.token);

      toast.success("Login successful!", {
        icon: <FaCheckCircle color="green" />,
        autoClose: 1200,
      });

      // ✅ role-based redirect
      setTimeout(() => {
        if (decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/landingpage");
        }
      }, 1200);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && (
              <span className="text-sm text-red-700">
                {errors.email.message}
              </span>
            )}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && (
              <span className="text-sm text-red-700">
                {errors.password.message}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
