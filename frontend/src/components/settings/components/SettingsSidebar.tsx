
"use client";

import {
  User,
  Palette,
  Bell,
  FileText,
  Shield,
  Database,
  Info,
} from "lucide-react";

import { SettingsTab } from "../types";

type Props = {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
};

const menuItems = [
  { name: "Profile", icon: User },
  { name: "Appearance", icon: Palette },
  { name: "Notifications", icon: Bell },
  { name: "Editor", icon: FileText },
  { name: "Privacy", icon: Shield },
  { name: "Data", icon: Database },
  { name: "About", icon: Info },
] as const;

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="w-full md:w-56 shrink-0">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">
        SETTINGS
      </h3>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-violet-100 text-violet-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
