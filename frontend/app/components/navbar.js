"use client"
import React from 'react'
import { signIn } from "next-auth/react";

const navbar = () => {
    return (
    <nav className="fixed flex justify-between top-0 w-full z-50 backdrop-blur-md px-10 py-6 ">

      <h1 className="text-xl font-semibold">Atlas AI Agent</h1>

      <div className="hidden md:flex gap-8 text-gray-300">
        <a className='cursor-pointer' href="#home">Home</a>
        <a className='cursor-pointer' href="#about">About</a>
        <a className='cursor-pointer' href="#howItWorks">How It Works</a>
        <a className='cursor-pointer' href="#agents">Agents</a>
        <a className='cursor-pointer' href="#demo">Demo</a>
      </div>
      <button onClick={() => signIn("google")} className="bg-white text-black px-5 py-2 cursor-pointer rounded-md font-medium hover:bg-gray-200">
        Join AI
      </button>
    </nav>
  );
}

export default navbar
