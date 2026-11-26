"use client";

import { useMemo, useState } from "react";
import {
  Search as SearchIcon,
  FileText,
  ListTodo,
  Bell,
  X,
} from "lucide-react";
interface Props {
  userId: number;
}
type SearchType = "All" | "Notes" | "Tasks" | "Reminders";

type SearchItem = {
  id: number;
  title: string;
  description: string;
  type: Exclude<SearchType, "All">;
  date: string;
};

const searchData: SearchItem[] = [
  {
    id: 1,
    title: "Project Ideas",
    description: "Ideas for building a modern SaaS application.",
    type: "Notes",
    date: "Nov 15, 2026",
  },
  {
    id: 2,
    title: "Laravel API",
    description: "Complete authentication and API development.",
    type: "Tasks",
    date: "Nov 20, 2026",
  },
  {
    id: 3,
    title: "Study Plan",
    description: "Next.js and TypeScript learning notes.",
    type: "Notes",
    date: "Nov 14, 2026",
  },
  {
    id: 4,
    title: "Assignment Submission",
    description: "Remember to submit the university assignment.",
    type: "Reminders",
    date: "Nov 16, 2026",
  },
  {
    id: 5,
    title: "Portfolio Design",
    description: "Create and complete the personal portfolio.",
    type: "Tasks",
    date: "Nov 22, 2026",
  },
  {
    id: 6,
    title: "Team Meeting",
    description: "Discuss project progress with the team.",
    type: "Reminders",
    date: "Nov 18, 2026",
  },
];

const filters: SearchType[] = [
  "All",
  "Notes",
  "Tasks",
  "Reminders",
];

export default function Search({ userId }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<SearchType>("All");

  const filteredResults = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) return [];

    return searchData.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        item.type === activeFilter;

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [query, activeFilter]);

  const getIcon = (type: SearchItem["type"]) => {
    if (type === "Notes") return FileText;
    if (type === "Tasks") return ListTodo;
    return Bell;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Search
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Find your notes, tasks and reminders quickly.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-400">
        <SearchIcon size={21} className="text-gray-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-700"
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-violet-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-violet-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            Search Results
          </h2>

          {query.trim() && (
            <span className="text-xs text-gray-500">
              {filteredResults.length} results found
            </span>
          )}
        </div>

        {!query.trim() ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <SearchIcon size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-800">
              Search your SmartNote
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Enter a keyword to find notes, tasks and reminders.
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="py-16 text-center">
            <SearchIcon
              size={30}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-3 font-semibold text-gray-700">
              No results found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Try another keyword or change the filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResults.map((item) => {
              const Icon = getIcon(item.type);

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-violet-200 hover:bg-violet-50/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      {item.type}
                    </span>

                    <p className="mt-2 text-xs text-gray-400">
                      {item.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}