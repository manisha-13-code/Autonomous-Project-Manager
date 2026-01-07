"use client";

import { signOut } from "next-auth/react";

export default function SettingsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>

        <button
          onClick={() => signOut()}
          className="w-full bg-red-600 py-2 rounded-md mb-3"
        >
          Sign Out
        </button>

        <button
          onClick={onClose}
          className="w-full border border-gray-700 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
