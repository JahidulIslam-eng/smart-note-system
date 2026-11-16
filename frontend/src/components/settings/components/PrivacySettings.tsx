
"use client";

import { PrivacyData } from "../types";

type Props = {
  privacy: PrivacyData;
  setPrivacy: (data: PrivacyData) => void;
};

const privacyItems = [
  {
    key: "analytics",
    title: "Usage Analytics",
    description: "Allow SmartNote to collect anonymous usage data.",
  },
  {
    key: "activityHistory",
    title: "Activity History",
    description: "Keep a history of your recent activities.",
  },
  {
    key: "lockNotes",
    title: "Private Notes",
    description: "Enable the private notes preference.",
  },
] as const;

export default function PrivacySettings({
  privacy,
  setPrivacy,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Privacy Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your privacy preferences.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {privacyItems.map((item) => (
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
              checked={privacy[item.key]}
              onChange={(e) =>
                setPrivacy({
                  ...privacy,
                  [item.key]: e.target.checked,
                })
              }
              className="w-5 h-5 accent-violet-600 shrink-0"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
        <p className="font-medium text-amber-800">
          Privacy Notice
        </p>
        <p className="text-sm text-amber-700 mt-1">
          These are currently local preference settings. They do not
          provide encryption or password protection for your notes.
        </p>
      </div>
    </div>
  );
}
