
"use client";

import { useState } from "react";

export default function Profile() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700 hover:bg-violet-200"
      >
        J
      </button>

      {showProfile && (
        <div className="absolute right-0 top-14 z-50 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

          <div className="border-b border-gray-100 px-3 py-2">
            <p className="text-sm font-semibold text-gray-800">
              Developer
            </p>

            <p className="text-xs text-gray-500">
              developer@example.com
            </p>
          </div>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
            My Profile
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50">
            Logout
          </button>

        </div>
      )}

    </div>
  );
}
