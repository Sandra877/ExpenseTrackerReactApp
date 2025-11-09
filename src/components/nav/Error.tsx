import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error: React.FC = () => {
  const error: any = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 text-center px-6">
      {/* Icon */}
      <div className="bg-orange-100 p-6 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ea580c"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
          />
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        {error?.statusText || error?.message || "We couldn't find that page or resource."}
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
