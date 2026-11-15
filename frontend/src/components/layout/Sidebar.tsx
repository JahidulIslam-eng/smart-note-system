
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
 
  icon: LucideIcon;
}
type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const mainMenu: NavItem[] = [
  
    {
  name: "Dashboard",
  
  icon: LayoutDashboard,

  },
  {
    name: "All Notes",
    
    icon: FileText,
  },
  {
    name: "Folders",
   
    icon: Folder,
  },
  {
    name: "Tags",
   
    icon: Tag,
  },
  {
    name: "Tasks",
   
    icon: CheckSquare,
  },
  {
    name: "Reminders",
   
    icon: Bell,
  },
  {
    name: "Calendar",
    
    icon: CalendarDays,
  },
];

const productivityMenu: NavItem[] = [
  {
    name: "AI Assistant",
    
    icon: Sparkles,
  },
  {
    name: "Analytics",
    
    icon: ChartNoAxesColumn,
  },
  {
    name: "Search",
   
    icon: Search,
  },
];

const bottomMenu: NavItem[] = [
  {
    name: "Settings",
    
    icon: Settings,
  },
  {
    name: "Help",
    
    icon: CircleHelp,
  },
];

export default function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  const pathname = usePathname();

const renderMenu = (items: NavItem[]) => {
  return items.map((item) => {
    const Icon = item.icon;

    const isActive = activePage === item.name;

    return (
      <button
        key={item.name}
        type="button"
        onClick={() => setActivePage(item.name)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          isActive
            ? "bg-violet-100 text-violet-700 font-semibold"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <Icon size={18} strokeWidth={1.8} />
        <span>{item.name}</span>
      </button>
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
