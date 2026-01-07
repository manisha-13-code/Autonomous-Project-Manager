"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-10">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user.name}
        </p>
      </div>

      {/* Right */}
      <div className="relative" ref={menuRef}>
        <Image
          src={user.image}
          alt="user"
          width={40}
          height={40}
          className="rounded-full cursor-pointer border border-gray-700"
          onClick={() => setOpen(!open)}
        />

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-44 rounded-lg border border-gray-800 bg-linear-to-br from-gray-900 to-black shadow-xl z-50">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/dashboard/settings");
              }}
              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 rounded-t-lg"
            >
              ⚙️ Settings
            </button>

            <button
              onClick={() => {
                setOpen(false);
                router.push("/login"); // or signOut()
              }}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 rounded-b-lg"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
