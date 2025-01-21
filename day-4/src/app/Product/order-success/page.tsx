"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("./");  
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-50 to-teal-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-teal-700 mb-6 text-center">
        Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Your order has been successfully placed. You will receive a confirmation email shortly.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
