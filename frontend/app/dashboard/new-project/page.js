"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/api";

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateProject() {
    if (!name || !goal) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await createProject(name, goal);
      router.push("/dashboard/projects");
    } catch (error) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold">Create New AI Project</h2>
        <p className="text-gray-400 mt-2">
          Define your goal and let AI agents plan, execute, and review the work.
        </p>
      </div>

      {/* Card */}
      <div className="border border-gray-800 rounded-xl p-8 bg-linear-to-br from-gray-900 to-black space-y-8">
        {/* Project Name */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Project Name
          </label>
          <input
            type="text"
            placeholder="e.g. SaaS Website Builder"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Describe Your Goal
          </label>
          <textarea
            rows={5}
            placeholder="Build a SaaS landing page with authentication, dashboard, payments..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-4 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Be specific — better goals lead to better AI results.
          </p>
        </div>

        {/* AI Agents */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            AI Agents Involved
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["Planner", "Executor", "Reviewer", "Learning"].map((agent) => (
              <div
                key={agent}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-700 bg-gray-900"
              >
                <span className="text-green-400">✓</span>
                <span>{agent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleCreateProject}
            disabled={loading}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
