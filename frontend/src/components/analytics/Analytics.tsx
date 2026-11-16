"use client";

import {
  FileText,
  CheckCircle2,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const stats = [
  {
    title: "Total Notes",
    value: "24",
    growth: "+12%",
    icon: FileText,
  },
  {
    title: "Tasks Done",
    value: "18",
    growth: "+20%",
    icon: CheckCircle2,
  },
  {
    title: "Productivity",
    value: "85%",
    growth: "+5%",
    icon: TrendingUp,
  },
];

const activity = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 90 },
];

const topTags = [
  { name: "Project", count: 8, percentage: 35 },
  { name: "Study", count: 6, percentage: 30 },
  { name: "Work", count: 5, percentage: 25 },
  { name: "Ideas", count: 3, percentage: 10 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your productivity and activities.
          </p>
        </div>

        <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                  <Icon size={19} />
                </div>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <span className="mb-1 text-xs font-semibold text-emerald-600">
                  {item.growth}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Compared to previous period
              </p>
            </div>
          );
        })}
      </div>

      {/* Activity Chart */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-violet-600" />

          <div>
            <h2 className="font-semibold text-gray-900">
              Activity Overview
            </h2>
            <p className="text-xs text-gray-500">
              Your activity during the last 7 days
            </p>
          </div>
        </div>

        <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-gray-100 px-2">
          {activity.map((item) => (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className="w-full max-w-10 rounded-t-md bg-violet-500 transition-all hover:bg-violet-700"
                style={{ height: `${item.value}%` }}
                title={`${item.value}% activity`}
              />

              <span className="text-xs text-gray-500">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tags */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">
          Top Tags
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Most frequently used tags
        </p>

        <div className="mt-5 space-y-5">
          {topTags.map((tag) => (
            <div key={tag.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {tag.name}
                </span>

                <span className="text-xs text-gray-500">
                  {tag.count} notes
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${tag.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}