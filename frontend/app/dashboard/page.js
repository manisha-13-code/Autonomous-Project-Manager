import Link from "next/link";
import ProjectCard from "../components/dashboard/projectCard";
import AgentCard from "../components/dashboard/agentCard";
import Header from "../components/dashboard/header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) redirect("/login");
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="SaaS Website Builder"
            status="Executing"
            tasks="12 Tasks"
          />
          <ProjectCard
            title="CI/CD Automation"
            status="Planning"
            tasks="8 Tasks"
          />
        </div>
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
