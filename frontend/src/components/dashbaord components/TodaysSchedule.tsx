
"use client";

import { Clock, CalendarDays, Circle } from "lucide-react";
import { useEffect, useState } from "react";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  color: string;
  type: "task" | "event";
}

interface TodaysScheduleProps {
  userId: number;
}

export default function TodaysSchedule({
  userId,
}: TodaysScheduleProps) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/todays-schedule`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch schedule"
          );
        }

        const data = await response.json();

        setSchedules(data.schedules);
      } catch (error) {
        console.error("Schedule fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [userId]);

  if (loading) {
    return <p>Loading schedule...</p>;
  }

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

        {schedules.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-5">
            No schedule available for today
          </p>
        ) : (
          schedules.map((schedule) => (
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

                <div className="min-w-0">
                  <span className="text-sm text-gray-700 truncate block">
                    {schedule.title}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    {schedule.type === "task" ? "Task" : "Event"}
                  </span>
                </div>

              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {schedule.time}
              </span>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

