"use client";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="border border-gray-800 p-10 rounded-xl text-center">
        <h1 className="text-3xl font-bold mb-6">Login to Atlas AI Agent</h1>

        <button
          onClick={() => signIn("google")}
          className="flex justify-center items-center gap-3 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 mx-auto"
        >
          <img src="/google.svg" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
