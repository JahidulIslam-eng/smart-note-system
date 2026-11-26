

"use client";

import { Search, Grid2X2, List, Plus } from "lucide-react";

type NotesHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  view: "grid" | "list";
  setView: (value: "grid" | "list") => void;
  onNewNote: () => void;
};

export default function NotesHeader({
  search,
  setSearch,
  view,
  setView,
  onNewNote,
}: NotesHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          aria-label="Search notes"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">

        {/* Grid View */}
        <button
          type="button"
          onClick={() => setView("grid")}
          aria-label="Grid View"
          aria-pressed={view === "grid"}
          className={`rounded-lg border p-2.5 transition ${
            view === "grid"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-gray-200 bg-white text-gray-500"
          }`}
          title="Grid View"
        >
          <Grid2X2 size={18} />
        </button>

        {/* List View */}
        <button
          type="button"
          onClick={() => setView("list")}
          aria-label="List View"
          aria-pressed={view === "list"}
          className={`rounded-lg border p-2.5 transition ${
            view === "list"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-gray-200 bg-white text-gray-500"
          }`}
          title="List View"
        >
          <List size={18} />
        </button>

        {/* New Note */}
        <button
          type="button"
          onClick={onNewNote}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <Plus size={18} />
          New Note
        </button>

      </div>
    </div>
  );
}
