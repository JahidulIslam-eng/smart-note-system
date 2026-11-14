

import SearchBar from "./header components/SearchBar";
import Profile from "./header components/Profile";
import QuickAddButton from "./header components/QuickAddButton";

type DashboardHeaderProps = {
  onSearch?: (value: string) => void;
  onQuickAdd?: (type: "note" | "task") => void;
};

export default function DashboardHeader({
  onSearch,
  onQuickAdd,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">

      {/* Search & Profile */}
      <div className="flex items-center justify-between gap-4">

        <SearchBar onSearch={onSearch} />

        <Profile />

      </div>

      {/* Greeting & Quick Add */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good Morning, Developer! 👋
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here's your productivity overview for today.
          </p>
        </div>

        <QuickAddButton onQuickAdd={onQuickAdd} />

      </div>

    </div>
  );
}
