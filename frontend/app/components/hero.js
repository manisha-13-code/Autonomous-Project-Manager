"use client"
import React from "react";
import Image from "next/image";
const hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row items-center mt-20 justify-between px-10 py-20 bg-linear-to-b from-black to-gray-900">
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Autonomous AI <br /> Project Manager
        </h1>

        <p className="mt-6 text-gray-300">
          An intelligent AI system that converts goals into tasks, assigns AI
          agents, executes workflows autonomously, and continuously improves
          project delivery.
        </p>

        <button className="mt-8 bg-black border border-gray-700 px-6 py-3 rounded-md hover:bg-gray-900 cursor-pointer">
          Activate AI →
        </button>
      </div>

      {/* Right Visual */}
      <div className="mt-12 md:mt-0">
        <Image
          src="/robotBI.png"
          alt="AI Robot"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default hero;
