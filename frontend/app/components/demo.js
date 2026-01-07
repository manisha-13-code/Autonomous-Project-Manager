"use client"
const Demo = () => {
  return (
    <section id="demo" className="w-full bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Live Demo
        </h2>

        <p className="text-gray-300 text-lg mb-10">
          Experience how an Autonomous AI Project Manager converts goals into
          actionable execution — without human micromanagement.
        </p>

        {/* Demo Box */}
        <div className="border border-gray-800 rounded-2xl p-8 bg-linear-to-br from-gray-900 to-black">
          <p className="text-gray-400 mb-4">
            Example Goal:
          </p>

          <p className="text-xl font-semibold mb-6">
            “Build a portfolio website with authentication and deployment”
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition">
              Run Demo
            </button>

            <button className="px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-400 transition">
              View Agent Logs
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          * Demo simulates planner, executor, and reviewer agents.
        </p>
      </div>
    </section>
  );
};

export default Demo;
