
"use client";

import { useState } from "react";

type QuickAddButtonProps = {
  userId: number;
  onQuickAdd?: (type: "note" | "task") => void;
};

export default function QuickAddButton({
  userId,
  onQuickAdd,
}: QuickAddButtonProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleQuickAdd = (type: "note" | "task") => {
    onQuickAdd?.(type);
    setShowQuickAdd(false);
  };

  return (
    <div className="relative">

      <button
        onClick={() => setShowQuickAdd(!showQuickAdd)}
        className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
      >
        <span className="text-lg">+</span>
        Quick Add
      </button>

      {showQuickAdd && (
        <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

          <button
            onClick={() => handleQuickAdd("note")}
            className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-violet-50"
          >
            📝 New Note
          </button>

          <button
            onClick={() => handleQuickAdd("task")}
            className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-violet-50"
          >
            ☑️ New Task
          </button>

        </div>
      )}

    </div>
  );
}
