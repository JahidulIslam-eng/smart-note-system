
"use client";

import { AppearanceData } from "../types";
import { Check, Monitor, Moon, Sun } from "lucide-react";

type Props = {
  appearance: AppearanceData;
  setAppearance: (appearance: AppearanceData) => void;
};

const themes = [
  { name: "Light", icon: Sun },
  { name: "Dark", icon: Moon },
  { name: "System", icon: Monitor },
] as const;

const colors = [
  { name: "Violet", color: "bg-violet-500" },
  { name: "Blue", color: "bg-blue-500" },
  { name: "Teal", color: "bg-teal-500" },
  { name: "Amber", color: "bg-amber-500" },
  { name: "Pink", color: "bg-pink-500" },
] as const;

export default function AppearanceSettings({
  appearance,
  setAppearance,
}: Props) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Appearance
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Customize how SmartNote looks on your device.
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-800 mb-3">
          Theme
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const active = appearance.theme === theme.name;

            return (
              <button
                key={theme.name}
                onClick={() =>
                  setAppearance({
                    ...appearance,
                    theme: theme.name,
                  })
                }
                className={`border rounded-xl p-4 flex flex-col items-center gap-3 ${
                  active
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon size={24} />
                <span className="text-sm font-medium">
                  {theme.name}
                </span>
                {active && (
                  <Check size={16} className="text-violet-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-800 mb-3">
          Accent Color
        </h3>

        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() =>
                setAppearance({
                  ...appearance,
                  accent: color.name,
                })
              }
              className={`w-9 h-9 rounded-full ${color.color} flex items-center justify-center ${
                appearance.accent === color.name
                  ? "ring-2 ring-offset-2 ring-gray-500"
                  : ""
              }`}
            >
              {appearance.accent === color.name && (
                <Check size={17} className="text-white" />
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Selected: {appearance.accent}
        </p>
      </div>

      <div className="flex items-center justify-between border-t pt-5">
        <div>
          <p className="font-medium text-gray-800">
            Compact Sidebar
          </p>
          <p className="text-sm text-gray-500">
            Use a more compact sidebar layout.
          </p>
        </div>

        <input
          type="checkbox"
          checked={appearance.compactSidebar}
          onChange={(e) =>
            setAppearance({
              ...appearance,
              compactSidebar: e.target.checked,
            })
          }
          className="w-5 h-5 accent-violet-600"
        />
      </div>
    </div>
  );
}
