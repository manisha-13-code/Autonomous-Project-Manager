import AgentCard from "../../components/dashboard/agentCard";

export default function AgentsPage() {
  return (
    <div className="px-2">
      {/* Agents Grid */}
      <h1 className="text-3xl font-bold mb-8">Agents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AgentCard name="Planner" status="Active" />
        <AgentCard name="Executor" status="Idle" />
        <AgentCard name="Reviewer" status="Waiting" />
        <AgentCard name="Learning" status="Monitoring" />
      </div>
    </div>
  );
}
