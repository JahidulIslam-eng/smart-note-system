
"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch?: (value: string) => void;
};

type SearchResult = {
  id: number;
  title: string;
  type: "note" | "task" | "folder";
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = search.trim();

    onSearch?.(query);

    if (!query) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(query)}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }

        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  return (
    <div className="relative w-full max-w-xl">

      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>

      <input
        type="text"
        value={search}
        placeholder="Search anything..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />

      {search.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

          {loading && (
            <p className="p-4 text-sm text-gray-500">
              Searching...
            </p>
          )}

          {!loading && error && (
            <p className="p-4 text-sm text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && results.length === 0 && (
            <p className="p-4 text-sm text-gray-500">
              No results found.
            </p>
          )}

          {!loading && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-violet-50"
                >
                  <span className="truncate text-sm text-gray-700">
                    {item.title}
                  </span>

                  <span className="ml-3 shrink-0 rounded-md bg-violet-50 px-2 py-1 text-xs capitalize text-violet-600">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
