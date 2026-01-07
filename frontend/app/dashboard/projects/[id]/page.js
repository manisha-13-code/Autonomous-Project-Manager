"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getProjectById,
  deleteProject,
  runProject
} from "@/lib/api";

export default function ProjectDetailsPage({ params }) {
  const router = useRouter();
  const urlParams = useParams();
  
  // Use params prop first (server-passed), fallback to client hook
  const projectId = params?.id || urlParams?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runLoading, setRunLoading] = useState(false);

  useEffect(() => {
    if (!projectId) {
      console.error("No projectId available:", { params, urlParams });
      setLoading(false);
      return;
    }

    console.log("Loading project:", projectId); // Debug log

    async function loadProject() {
      try {
        const data = await getProjectById(projectId);
        console.log("Project loaded:", data); // Debug log
        setProject(data);
      } catch (err) {
        console.error("Load project error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  async function handleDelete() {
    if (!projectId || !confirm("Delete this project?")) return;
    try {
      await deleteProject(projectId);
      router.push("/dashboard/projects");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRunAI() {
    if (!projectId) {
      alert("No project ID available");
      return;
    }
    setRunLoading(true);
    try {
      console.log("Running AI for project:", projectId);
      await runProject(projectId);
      // Refresh
      const updated = await getProjectById(projectId);
      setProject(updated);
    } catch (err) {
      console.error("Run failed:", err);
    } finally {
      setRunLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (!projectId) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h1>
        <p className="text-gray-400">No project ID in URL</p>
        <button 
          onClick={() => router.push("/dashboard/projects")}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-md text-white"
        >
          Go to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-4">ID: {projectId}</p>
        <p className="text-sm text-gray-500 mb-8">Check if project exists in database</p>
        <button 
          onClick={() => router.push("/dashboard/projects")}
          className="bg-blue-600 px-6 py-2 rounded-md text-white mr-2"
        >
          Go to Projects
        </button>
        <button 
          onClick={handleRunAI}
          disabled={runLoading}
          className="bg-green-600 px-6 py-2 rounded-md text-white"
        >
          Try Run AI
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-400 mt-2">{project.goal}</p>
          <p className="text-sm text-gray-500 mt-1">
            Status: <span className={`px-2 py-1 rounded-full text-xs ${
              project.status === 'COMPLETED' ? 'bg-green-500 text-white' :
              project.status === 'FAILED' ? 'bg-red-500 text-white' :
              'bg-yellow-500 text-white'
            }`}>
              {project.status}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRunAI}
            disabled={runLoading}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md text-white font-medium disabled:opacity-50 transition-colors"
          >
            {runLoading ? "Running..." : "Run AI"}
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md text-white font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Project ID: {projectId}</h3>
        {project.logs?.length > 0 && (
          <p className="text-sm text-gray-400">
            {project.logs.length} log entries • Latest: {new Date(project.logs[0].created_at).toLocaleString()}
          </p>
        )}
      </div>

      {/* AI OUTPUT */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">AI Execution Logs</h2>

        {(!project.logs || project.logs.length === 0) ? (
          <div className="border-2 border-dashed border-gray-800 rounded-lg p-12 text-center bg-gray-900/50">
            <p className="text-gray-400 mb-4">No logs yet</p>
            <p className="text-sm text-gray-500 mb-6">Click "Run AI" to generate project code & output</p>
            <button
              onClick={handleRunAI}
              disabled={runLoading}
              className="bg-green-600 px-6 py-2 rounded-md text-white font-medium"
            >
              Start AI Execution
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {project.logs.map((log) => (
              <div
                key={log.id}
                className={`border rounded-lg p-6 transition-all ${
                  log.agent === 'CRASH' || log.message.includes('ERROR') 
                    ? 'border-red-500/50 bg-red-500/5' 
                    : 'border-gray-800 bg-black/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                    {log.agent}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                </div>

                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono bg-black/30 p-4 rounded-lg">
                  {log.message}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
