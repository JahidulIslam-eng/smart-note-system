
"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const weeklyData = {
  "This Week": [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 95 },
  ],
  "Last Week": [
    { day: "Mon", value: 35 },
    { day: "Tue", value: 50 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 55 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 85 },
  ],
};

type Period = keyof typeof weeklyData;

export default function ProductivityOverview() {
  const [period, setPeriod] = useState<Period>("This Week");

  const chartData = weeklyData[period];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      {/* Header */}
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

      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-36">

        {chartData.map((item) => (
          <div
            key={item.day}
            className="flex-1 h-full flex flex-col items-center justify-end gap-2"
          >

            {/* Bar */}
            <div
              className="w-full max-w-5 rounded-t-md bg-violet-500 hover:bg-violet-600 transition-all duration-300"
              style={{ height: `${item.value}%` }}
              title={`${item.value}%`}
            />

            {/* Day */}
            <span className="text-[10px] text-gray-400">
              {item.day}
            </span>

          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-100">

        <TrendingUp size={15} className="text-emerald-500" />

        <span className="text-xs font-medium text-emerald-500">
          12%
        </span>

        <span className="text-xs text-gray-400">
          productivity increased
        </span>

      </div>

    </div>
  );
}
