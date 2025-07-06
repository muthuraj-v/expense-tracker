import React from "react";

const ErrorFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">
          We're sorry for the inconvenience. Please refresh the page or try
          again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
