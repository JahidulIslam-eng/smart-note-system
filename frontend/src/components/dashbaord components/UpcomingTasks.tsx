
import { CalendarClock, TrendingDown, ChevronRight } from "lucide-react";

interface UpcomingTasksProps {
  upcomingTasks: number;
  percentage: number;
}

export default function UpcomingTasks({
  upcomingTasks,
  percentage,
}: UpcomingTasksProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">
          Upcoming
        </h3>

        <CalendarClock size={18} className="text-gray-400" />
      </div>

      {/* Upcoming Tasks Count */}
      <div className="mt-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {upcomingTasks}
        </h2>
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <TrendingDown size={15} className="text-red-500" />

          <span className="text-xs font-medium text-red-500">
            {percentage}%
          </span>

          <span className="text-xs text-gray-400">
            vs last month
          </span>
        </div>

        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
}
