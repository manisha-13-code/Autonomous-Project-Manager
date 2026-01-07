"use client"
const About = () => {
  return (
    <section id="about" className="px-10 py-20 bg-black text-white">
      {/* SAME WIDTH + ALIGNMENT AS HERO */}
      <div className="mx-auto text-center">
        <h2 className="text-6xl font-bold leading-tight">
          Why Autonomous AI <br /> Project Manager?
        </h2>

        <p className="mt-6 text-gray-300">
          Software projects fail due to manual planning, fragmented tools, and
          constant human intervention.
        </p>

        <p className="mt-4 text-gray-300">
          Our Autonomous AI Project Manager replaces traditional workflows with
          intelligent AI agents that plan, execute, and improve autonomously.
        </p>
      </div>

  {/* mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 */}
      {/* FEATURE CARDS – SAME LEFT START */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-800 rounded-lg p-6 bg-linear-to-b from-black to-gray-900">
          <h3 className="text-lg font-semibold mb-2">🎯 Goal → Tasks</h3>
          <p className="text-gray-400 text-sm">
            Converts goals into structured, actionable tasks automatically.
          </p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-linear-to-b from-black to-gray-900">
          <h3 className="text-lg font-semibold mb-2">🤖 AI Agents</h3>
          <p className="text-gray-400 text-sm">
            Planner, Executor, and Reviewer agents collaborate in real-time.
          </p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-linear-to-b from-black to-gray-900">
          <h3 className="text-lg font-semibold mb-2">🔁 Self Improvement</h3>
          <p className="text-gray-400 text-sm">
            Learns from feedback and improves future decisions.
          </p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-linear-to-b from-black to-gray-900">
          <h3 className="text-lg font-semibold mb-2">⚙️ Automation</h3>
          <p className="text-gray-400 text-sm">
            Executes tasks across tools and APIs autonomously.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
