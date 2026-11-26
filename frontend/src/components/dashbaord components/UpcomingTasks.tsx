
"use client";

import { CalendarClock, TrendingDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface UpcomingTasksProps {
  userId: number;
}

export default function UpcomingTasks({ userId }: UpcomingTasksProps) {
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/upcoming-tasks`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming tasks");
        }

        const data = await response.json();

        setUpcomingTasks(data.upcomingTasks);
        setPercentage(data.percentage);
      } catch (error) {
        console.error("Upcoming Tasks Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingTasks();
  }, [userId]);

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
          {loading ? "..." : upcomingTasks}
        </h2>
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <TrendingDown size={15} className="text-red-500" />

          <span className="text-xs font-medium text-red-500">
            {loading ? "..." : `${percentage}%`}
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
