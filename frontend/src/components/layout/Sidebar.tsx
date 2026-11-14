
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Zap,
  LayoutDashboard,
  FileText,
  Folder,
  Tag,
  CheckSquare,
  Bell,
  CalendarDays,
  Sparkles,
  ChartNoAxesColumn,
  Search,
  Settings,
  CircleHelp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const mainMenu: NavItem[] = [
  
    {
  name: "Dashboard",
  href: "/",
  icon: LayoutDashboard,

  },
  {
    name: "All Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    name: "Folders",
    href: "/folders",
    icon: Folder,
  },
  {
    name: "Tags",
    href: "/tags",
    icon: Tag,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: Bell,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
];

const productivityMenu: NavItem[] = [
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Sparkles,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesColumn,
  },
  {
    name: "Search",
    href: "/search",
    icon: Search,
  },
];

const bottomMenu: NavItem[] = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    href: "/help",
    icon: CircleHelp,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

 const renderMenu = (items: NavItem[]) => {
  return items.map((item) => {
    const Icon = item.icon;

    const isActive = pathname === item.href;

    const className = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-violet-100 text-violet-700 font-semibold"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

    return (
      <a
        key={item.name}
        href={item.href}
        className={className}
      >
        <Icon size={18} strokeWidth={1.8} />
        <span>{item.name}</span>
      </a>
    );
  });
};

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">

      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-gray-100">

        <div className="flex items-center gap-2">

          <div className="bg-violet-600 p-1.5 rounded-md">
            <Zap size={18} className="text-white" />
          </div>

          <h1 className="text-lg font-bold text-gray-900">
            SmartNote
          </h1>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-5">

        {/* Main Menu */}
        <div className="space-y-1">
          {renderMenu(mainMenu)}
        </div>

        {/* Productivity Menu */}
        <div className="border-t border-gray-100 pt-4 space-y-1">
          {renderMenu(productivityMenu)}
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-gray-100 pt-4 space-y-1">
          {renderMenu(bottomMenu)}
        </div>

      </nav>

    </aside>
  );
}
