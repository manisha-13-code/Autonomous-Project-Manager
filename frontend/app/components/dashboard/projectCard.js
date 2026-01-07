"use client";

import { useRouter } from "next/navigation";

export default function ProjectCard({ id, title, status }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/projects/${id}`)}
      className="cursor-pointer border border-gray-800 rounded-xl p-6 bg-gray-900 hover:border-gray-600"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{status}</p>
    </div>
  );
}
