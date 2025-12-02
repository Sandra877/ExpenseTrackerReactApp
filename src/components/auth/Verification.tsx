import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        setStatus("error");
        toast.error("Invalid verification link");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/verify/${token}`);

        if (!res.ok) {
          setStatus("error");
          toast.error("Verification failed");
          return;
        }

        setStatus("success");
        toast.success("Email verified successfully!");

        setTimeout(() => navigate("/login"), 2000);

      } catch (err) {
        console.error(err);
        setStatus("error");
        toast.error("Something went wrong");
      }
    };

    verifyAccount();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white text-center">

          {status === "loading" && <h1 className="text-2xl font-bold">Verifying your account...</h1>}
          {status === "success" && <h1 className="text-2xl font-bold text-green-600">Your account is verified! 🎉</h1>}
          {status === "error" && <h1 className="text-2xl font-bold text-red-600">Verification failed ❌</h1>}

          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    </>
  );
};
