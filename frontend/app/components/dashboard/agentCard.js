"use client"
const AgentCard = ({ name, status }) => {
  return (
    <div className="border border-gray-800 rounded-lg p-6 text-center bg-linear-to-br from-gray-900 to-black">
      <h3 className="text-lg font-semibold">{name} Agent</h3>
      <p className="text-gray-400 mt-2">{status}</p>
    </div>
  );
};

export default AgentCard;