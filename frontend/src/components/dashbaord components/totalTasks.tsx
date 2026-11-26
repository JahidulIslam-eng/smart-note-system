
"use client";

import { ListTodo, TrendingUp, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface TotalTasksProps {
  userId: number;
}

export default function TotalTasks({ userId }: TotalTasksProps) {
  const [totalTasks, setTotalTasks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/total-tasks`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch total tasks");
        }

        const data = await response.json();

        setTotalTasks(data.totalTasks);
        setPercentage(data.percentage);
      } catch (error) {
        console.error("Total Tasks Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalTasks();
  }, [userId]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">
          Total Tasks
        </h3>

        <ListTodo size={18} className="text-gray-400" />
      </div>

      {/* Total Tasks Count */}
      <div className="mt-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? "..." : totalTasks}
        </h2>
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <TrendingUp size={15} className={percentage >= 0 ? "text-emerald-500" : "text-red-500"} />

          <span className={`text-xs font-medium ${percentage >= 0 ? "text-emerald-500" : "text-red-500"}`}>
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
