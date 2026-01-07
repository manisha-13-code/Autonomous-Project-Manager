"use client";

import { useEffect, useState } from "react";
import { getLogs } from "@/lib/api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to load logs", error);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading logs...</p>;
  }

  if (logs.length === 0) {
    return <p className="text-gray-500">No logs available.</p>;
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="border border-gray-800 rounded-lg p-4 bg-linear-to-br from-gray-900 to-black"
        >
          <div className="flex justify-between text-sm text-gray-400">
            <span>{log.time}</span>
            <span>{log.agent} Agent</span>
          </div>

          <p className="mt-2 text-white">{log.message}</p>

          <span
            className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${
              log.status === "Success"
                ? "bg-green-900 text-green-400"
                : log.status === "Running"
                ? "bg-blue-900 text-blue-400"
                : log.status === "Pending"
                ? "bg-yellow-900 text-yellow-400"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {log.status}
          </span>
        </div>
      ))}
    </div>
  );
}
