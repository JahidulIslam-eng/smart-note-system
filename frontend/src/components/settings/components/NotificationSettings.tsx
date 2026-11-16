
"use client";

import { NotificationData } from "../types";

type Props = {
  notifications: NotificationData;
  setNotifications: (data: NotificationData) => void;
};

const notificationItems = [
  {
    key: "taskReminders",
    title: "Task Reminders",
    description: "Get notified about upcoming tasks.",
  },
  {
    key: "deadlineAlerts",
    title: "Deadline Alerts",
    description: "Receive alerts before a deadline.",
  },
  {
    key: "dailySummary",
    title: "Daily Summary",
    description: "Get a daily summary of your activity.",
  },
  {
    key: "emailNotifications",
    title: "Email Notifications",
    description: "Receive notifications through email.",
  },
] as const;

export default function NotificationSettings({
  notifications,
  setNotifications,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Notification Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose which notifications you want to receive.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="font-medium text-gray-800">
                {item.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications[item.key]}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  [item.key]: e.target.checked,
                })
              }
              className="w-5 h-5 accent-violet-600 shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
