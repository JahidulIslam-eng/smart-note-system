
import { CalendarDays, MoreHorizontal } from "lucide-react";
import { Task } from "../types";

type Props = {
  task: Task;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
};

export default function TaskCard({
  task,
  onSelect,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm">

      <div className="flex justify-between gap-3">
        <button
          onClick={() => onSelect(task)}
          className="text-left font-semibold text-gray-800 hover:text-violet-600"
        >
          {task.title}
        </button>

        <div className="relative group">
          <button className="text-gray-400 hover:text-gray-700">
            <MoreHorizontal size={20} />
          </button>

          <div className="hidden group-hover:block absolute right-0 top-5 z-10 bg-white shadow-lg border rounded-lg w-28">
            <button
              onClick={() => onEdit(task)}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className={`text-xs px-2 py-1 rounded-md ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>

        {task.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 mt-4 pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays size={14} />
          {task.dueDate || "No deadline"}
        </div>

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          className="text-xs border rounded-md p-1.5 bg-white"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
    </div>
  );
}

