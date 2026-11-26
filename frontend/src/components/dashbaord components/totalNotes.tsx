
"use client";

import { FileText, TrendingUp, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface TotalNotesProps {
  userId: number;
   onViewAll?: () => void;
}

export default function TotalNotes({ userId,onViewAll }: TotalNotesProps) {
  const [totalNotes, setTotalNotes] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/total-notes`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch total notes");
        }

        const data = await response.json();

        setTotalNotes(data.totalNotes);
        setPercentage(data.percentage);
      } catch (error) {
        console.error("Total Notes Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalNotes();
  }, [userId]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">
          Total Notes
        </h3>
        <FileText size={18} className="text-gray-400" />
      </div>

      <div className="mt-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? "..." : totalNotes}
        </h2>
      </div>

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

        <button
  onClick={onViewAll}
  className="rounded-lg p-1 transition hover:bg-violet-50 hover:text-violet-600"
  title="View all notes"
>
  <ChevronRight size={16} className="text-gray-400" />
</button>
      </div>
    </div>
  );
}
