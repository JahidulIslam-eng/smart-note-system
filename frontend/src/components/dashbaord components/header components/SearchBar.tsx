
"use client";

type SearchBarProps = {
  onSearch?: (value: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
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
        placeholder="Search anything..."
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />

    </div>
  );
}
