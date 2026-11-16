import {
  FileText,
  ListTodo,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Notes & Folders",
    description: "Create, edit and organize your notes.",
    icon: FileText,
  },
  {
    title: "Tasks",
    description: "Manage tasks, priorities and deadlines.",
    icon: ListTodo,
  },
  {
    title: "Reminders & Calendar",
    description: "Manage schedules and important dates.",
    icon: CalendarDays,
  },
  {
    title: "AI Assistant",
    description: "Learn about AI-powered productivity tools.",
    icon: Sparkles,
  },
];

export default function HelpCategories() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Icon size={21} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}