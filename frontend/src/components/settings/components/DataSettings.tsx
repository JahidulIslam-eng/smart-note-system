
"use client";

import { Download, Trash2 } from "lucide-react";

type Props = {
  onReset: () => void;
};

export default function DataSettings({ onReset }: Props) {
  const exportSettings = () => {
    const data = localStorage.getItem("smartnote-settings");

    const blob = new Blob([data || "{}"], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "smartnote-settings.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (confirmed) {
      onReset();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Data Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Export or reset your SmartNote settings.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <Download className="text-violet-600" size={22} />

          <div>
            <h3 className="font-medium text-gray-800">
              Export Settings
            </h3>
            <p className="text-sm text-gray-500">
              Download your saved settings as a JSON file.
            </p>
          </div>
        </div>

        <button
          onClick={exportSettings}
          className="mt-4 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700"
        >
          Export Settings
        </button>
      </div>

      <div className="border border-red-200 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <Trash2 className="text-red-600" size={22} />

          <div>
            <h3 className="font-medium text-gray-800">
              Reset Settings
            </h3>
            <p className="text-sm text-gray-500">
              Restore all preferences to their default values.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
        >
          Reset Settings
        </button>
      </div>
    </div>
  );
}
