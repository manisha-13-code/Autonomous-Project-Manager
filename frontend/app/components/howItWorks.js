"use client"
const HowItWorks = () => {
  return (
    <section id="howItWorks" className="w-full bg-linear-to-b from-black to-gray-900 text-white py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 01</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Goal Understanding
            </h3>
            <p className="text-gray-400">
              The user provides a high-level goal. The AI understands intent,
              scope, and constraints using LLM reasoning.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 02</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Task Decomposition
            </h3>
            <p className="text-gray-400">
              A Planner Agent breaks the goal into structured, prioritized tasks
              and dependencies.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 03</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Agent Assignment
            </h3>
            <p className="text-gray-400">
              The Orchestrator assigns tasks to specialized AI agents like
              Executor, Researcher, or Validator.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 04</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Autonomous Execution
            </h3>
            <p className="text-gray-400">
              Agents perform tasks automatically using APIs, tools, and
              reasoning without manual intervention.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 05</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Feedback & Validation
            </h3>
            <p className="text-gray-400">
              A Reviewer Agent evaluates outputs, detects errors, and requests
              improvements if needed.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <span className="text-green-400 text-sm">STEP 06</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">
              Continuous Improvement
            </h3>
            <p className="text-gray-400">
              The system learns from outcomes and improves future planning and
              execution strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
