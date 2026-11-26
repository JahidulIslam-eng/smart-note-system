"use client";

import { CalendarDays, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Deadline {
  id: number;
  title: string;
  due_date: string;
  priority: string;
  date: string;
  time: string;
  color: string;
}

interface UpcomingDeadlinesProps {
  userId: number;
}

export default function UpcomingDeadlines({
  userId,
}: UpcomingDeadlinesProps) {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/upcoming-deadlines`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
  const errorData = await response.json();

  console.log("Status:", response.status);
  console.log("API Error:", errorData);

  throw new Error(errorData.message || "Failed to fetch deadlines");
}

        const data = await response.json();

        const formattedDeadlines = data.deadlines.map(
          (deadline: any) => {
            const dateTime = new Date(
              deadline.due_date.replace(" ", "T")
            );

            return {
              ...deadline,

              date: dateTime.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),

              time: dateTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              }),

              color:
                deadline.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : deadline.priority === "medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-violet-100 text-violet-600",
            };
          }
        );

        setDeadlines(formattedDeadlines);
      } catch (error) {
        console.error("Deadline fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, [userId]);

  if (loading) {
    return <p>Loading deadlines...</p>;
  }

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