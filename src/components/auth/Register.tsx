import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from '../nav/Navbar';

const API_URL = import.meta.env.VITE_API_URL;

type RegisterInputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  first_name: yup.string().max(50).required("First name is required"),
  last_name: yup.string().max(50).required("Last name is required"),
  email: yup.string().email("Invalid email").max(100).required("Email is required"),
  phone_number: yup.string().max(20).required("Phone number is required"),
  password: yup.string().min(6).max(255).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          password: data.password
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Registration failed");
        return;
      }

      toast.success("Registered successfully!");

      setTimeout(() => {
        navigate("/landingpage");
      }, 1500);
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Account Registration</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              {...register("first_name")}
              placeholder="First Name"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.first_name && <span className="text-red-700 text-sm">{errors.first_name.message}</span>}

            <input
              type="text"
              {...register("last_name")}
              placeholder="Last Name"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.last_name && <span className="text-red-700 text-sm">{errors.last_name.message}</span>}

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}

            <input
              type="text"
              {...register("phone_number")}
              placeholder="Phone Number"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.phone_number && <span className="text-red-700 text-sm">{errors.phone_number.message}</span>}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.confirmPassword && (
              <span className="text-red-700 text-sm">{errors.confirmPassword.message}</span>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
