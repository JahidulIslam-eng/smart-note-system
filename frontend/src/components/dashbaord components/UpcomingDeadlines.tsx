
import { CalendarDays, Clock, ChevronRight } from "lucide-react";

interface Deadline {
  id: number;
  title: string;
  date: string;
  time: string;
  color: string;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({
  deadlines,
}: UpcomingDeadlinesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Upcoming Deadlines
        </h3>

        <button className="flex items-center gap-1 text-xs text-violet-600 font-medium hover:underline">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Deadlines List */}
      <div className="space-y-3">

        {deadlines.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-5">
            No upcoming deadlines
          </p>
        ) : (
          deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between gap-3"
            >

              <div className="flex items-center gap-3 min-w-0">

                <div className={`p-2 rounded-lg ${deadline.color}`}>
                  <CalendarDays size={17} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    {deadline.title}
                  </h4>

                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock size={12} />

                    <span>
                      {deadline.date}, {deadline.time}
                    </span>
                  </div>
                </div>

              </div>

              <ChevronRight
                size={15}
                className="text-gray-400 shrink-0"
              />

            </div>
          ))
        )}

      </div>
    </div>
  );
}

