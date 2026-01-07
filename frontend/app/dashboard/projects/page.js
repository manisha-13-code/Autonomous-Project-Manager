"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "../../components/dashboard/projectCard";
import { getProjects } from "@/lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>

        <Link href="/dashboard/new-project">
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200">
            + New Project
          </button>
        </Link>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading projects...</p>}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <p className="text-gray-500">No projects created yet.</p>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            status={project.status}
          />
        ))}
      </div>
    </>
  );
}
