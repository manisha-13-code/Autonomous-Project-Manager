"use client"
import React from "react";

const Agents = () => {
  return (
    <section
      id="agents"
      className="px-10 py-20 bg-black text-white scroll-mt-24"
    >
      {/* Header */}
      <div className="mx-auto text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Autonomous AI Agents
        </h2>

        <p className="mt-6 text-gray-300">
          A team of specialized AI agents that collaborate, reason, and execute
          tasks autonomously—just like a high-performing engineering team.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Planner Agent */}
        <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition bg-linear-to-b from-black to-gray-900">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            🧠 Planner Agent
          </h3>
          <p className="mt-4 text-gray-400">
            Understands goals, breaks them into structured tasks, and defines
            execution strategies with dependencies and priorities.
          </p>
        </div>

        {/* Executor Agent */}
        <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition bg-linear-to-b from-black to-gray-900">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            ⚙️ Executor Agent
          </h3>
          <p className="mt-4 text-gray-400">
            Executes tasks across tools, APIs, and services—writing code,
            triggering workflows, and integrating systems autonomously.
          </p>
        </div>

        {/* Reviewer Agent */}
        <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition bg-linear-to-b from-black to-gray-900">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            🔍 Reviewer Agent
          </h3>
          <p className="mt-4 text-gray-400">
            Reviews outputs, validates results, detects errors, and ensures
            quality before marking tasks as complete.
          </p>
        </div>

        {/* Learning Agent */}
        <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition bg-linear-to-b from-black to-gray-900">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            📈 Learning Agent
          </h3>
          <p className="mt-4 text-gray-400">
            Learns from feedback, failures, and past decisions to continuously
            improve planning, execution, and performance over time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Agents;
