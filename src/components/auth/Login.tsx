import Navbar from "../nav/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";


type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    toast.success("Login successful!", {
        icon: <FaCheckCircle color="green" />,
        autoClose: 1500,
});
    setTimeout(() => {
      navigate("/landingpage");
    }, 2000);
  };

  return (
    <>
      <Navbar />
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
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && <span className="text-sm text-red-700">{errors.password.message}</span>}

            <button type="submit" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
