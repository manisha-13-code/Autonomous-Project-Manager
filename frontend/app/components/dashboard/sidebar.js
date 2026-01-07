"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Agents", href: "/dashboard/agents" },
    { name: "Logs", href: "/dashboard/logs" },
  ];

  return (
    <aside className="w-64 border-r border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-10">Atlas AI Agent</h2>

      <nav className="space-y-4">
        {nav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block cursor-pointer ${
              pathname === item.href
                ? "text-white font-medium"
                : "text-gray-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
