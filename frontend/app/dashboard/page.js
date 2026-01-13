import Link from "next/link";
import ProjectCard from "../components/dashboard/projectCard";
import AgentCard from "../components/dashboard/agentCard";
import Header from "../components/dashboard/header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getProjects } from "@/lib/api";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const projects = await getProjects();

  const latestProjects = projects
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2);

  return (
    <>
      <main className="flex-1 px-10 py-4">
        <Header user={session.user} />
      </main>

      {/* CREATE PROJECT */}
      <div className="border border-gray-800 rounded-lg p-6 bg-linear-to-br from-gray-900 to-black">
        <h2 className="text-xl font-semibold mb-2">Create New AI Project</h2>
        <p className="text-gray-400 mb-4">
          Describe your goal and let AI agents plan and execute.
        </p>

        <Link href="/dashboard/new-project">
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200">
            + New Project
          </button>
        </Link>
      </div>

      {/* PROJECTS */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>

        {latestProjects.length === 0 ? (
          <p className="text-gray-400">No projects created yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                status={project.status}
                tasks={`${project.tasks?.length || 0} Tasks`}
              />
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        {projects.length > 2 && (
          <div className="mt-6">
            <Link
              href="/dashboard/projects"
              className="text-blue-400 hover:underline text-sm"
            >
              View all projects →
            </Link>
          </div>
        )}
      </section>

      {/* AGENTS */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6">AI Agents Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AgentCard name="Planner" status="Active" />
          <AgentCard name="Executor" status="Idle" />
          <AgentCard name="Reviewer" status="Waiting" />
          <AgentCard name="Learning" status="Monitoring" />
        </div>
      </section>
    </>
  );
}
