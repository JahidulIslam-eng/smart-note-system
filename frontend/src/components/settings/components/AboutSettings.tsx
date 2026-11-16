
"use client";

import { FileText, Code, Heart } from "lucide-react";

export default function AboutSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          About SmartNote
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Learn more about your note-taking workspace.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-100 flex items-center justify-center">
          <FileText size={32} className="text-violet-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mt-4">
          SmartNote
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Your personal notes and productivity workspace.
        </p>

        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium">
          Version 1.0.0
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Code size={20} className="text-gray-500" />
          <div>
            <p className="font-medium text-gray-800">Developer</p>
            <p className="text-sm text-gray-500">
              SmartNote Development Team
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Heart size={20} className="text-red-500" />
          <div>
            <p className="font-medium text-gray-800">
              Made with care
            </p>
            <p className="text-sm text-gray-500">
              Built to make your daily work organized.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 text-sm text-gray-500">
        © 2026 SmartNote. All rights reserved.
      </div>
    </div>
  );
}
