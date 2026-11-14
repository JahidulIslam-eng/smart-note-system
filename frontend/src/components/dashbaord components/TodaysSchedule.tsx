
import { Clock, CalendarDays, Circle } from "lucide-react";

interface ScheduleItem {
  id: number;
  title: string;
  time: string;
  color: string;
}

interface TodaysScheduleProps {
  schedules: ScheduleItem[];
}

export default function TodaysSchedule({
  schedules,
}: TodaysScheduleProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Today's Schedule
        </h3>

        <button className="text-xs text-violet-600 font-medium hover:underline">
          View Calendar →
        </button>
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">

              <Circle
                size={12}
                className={schedule.color}
                strokeWidth={3}
              />

              <span className="text-sm text-gray-700 truncate">
                {schedule.title}
              </span>

            </div>

            <span className="text-xs text-gray-400 whitespace-nowrap">
              {schedule.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
