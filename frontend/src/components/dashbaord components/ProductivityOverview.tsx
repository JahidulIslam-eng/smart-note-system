
"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface WeeklyItem {
  day: string;
  value: number;
  completionPercentage: number;
  completedTasks: number;
  totalTasks: number;
  notesCount: number;
  activityCount: number;
}

interface ProductivityOverviewProps {
  userId: number;
}

type Period = "This Week" | "Last Week";

export default function ProductivityOverview({
  userId,
}: ProductivityOverviewProps) {
  const [period, setPeriod] = useState<Period>("This Week");

  const [weeklyData, setWeeklyData] = useState<
    Record<Period, WeeklyItem[]>
  >({
    "This Week": [],
    "Last Week": [],
  });

  const [loading, setLoading] = useState(true);

  const chartData = weeklyData[period];

  useEffect(() => {
    const fetchProductivity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/productivity-overview`,
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
            errorData.message || "Failed to fetch productivity"
          );
        }

        const data = await response.json();

        setWeeklyData(data.weeklyData);

      } catch (error) {
        console.error("Productivity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductivity();
  }, [userId]);

  if (loading) {
    return <p>Loading productivity...</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-800">
          Productivity Overview
        </h3>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 outline-none cursor-pointer"
        >
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-2 h-36">

        {chartData.map((item) => (
          <div
            key={item.day}
            className="flex-1 h-full flex flex-col items-center justify-end gap-2"
          >

            <div
              className="w-full max-w-5 rounded-t-md bg-violet-500 hover:bg-violet-600 transition-all duration-300"
              style={{ height: `${item.value}%` }}
              title={`${item.value}%`}
            />

            <span className="text-[10px] text-gray-400">
              {item.day}
            </span>

          </div>
        ))}

      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">

        <div>
          <p className="text-lg font-semibold text-violet-600">
            {chartData.reduce((sum, item) => sum + item.completedTasks, 0)}
          </p>
          <p className="text-[10px] text-gray-400">
            Completed Tasks
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-blue-600">
            {chartData.reduce((sum, item) => sum + item.notesCount, 0)}
          </p>
          <p className="text-[10px] text-gray-400">
            Notes Created
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-emerald-600">
            {chartData.reduce((sum, item) => sum + item.activityCount, 0)}
          </p>
          <p className="text-[10px] text-gray-400">
            Total Activity
          </p>
        </div>

      </div>

    </div>
  );
}
