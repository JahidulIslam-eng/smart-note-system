
"use client";

import { CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CompletedTasksProps {
  userId: number;
}

export default function CompletedTasks({ userId }: CompletedTasksProps) {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/completed-tasks`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch completed tasks");
        }

        const data = await response.json();

        setCompletedTasks(data.completedTasks);
        setPercentage(data.percentage);
      } catch (error) {
        console.error("Completed Tasks Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [userId]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">
          Completed
        </h3>

        <CheckCircle2 size={18} className="text-gray-400" />
      </div>

      {/* Completed Tasks Count */}
      <div className="mt-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? "..." : completedTasks}
        </h2>
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <TrendingUp size={15} className="text-emerald-500" />

          <span className="text-xs font-medium text-emerald-500">
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
