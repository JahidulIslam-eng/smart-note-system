
import { CalendarDays, Folder, Tag } from "lucide-react";
import { Task } from "../../task/types";

type Props = {
  task: Task;
};

export default function TaskInfo({ task }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 space-y-5">
      <h2 className="font-semibold text-gray-800">
        Task Information
      </h2>

      <div>
        <p className="text-xs text-gray-400 mb-2">Status</p>
        <span className="text-sm bg-violet-100 text-violet-700 px-3 py-1.5 rounded-lg">
          {task.status}
        </span>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2">Priority</p>
        <span className={`text-sm px-3 py-1.5 rounded-lg ${
          task.priority === "High"
            ? "bg-red-100 text-red-600"
            : task.priority === "Medium"
            ? "bg-orange-100 text-orange-600"
            : "bg-green-100 text-green-600"
        }`}>
          {task.priority}
        </span>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
          <CalendarDays size={14} />
          Due Date
        </p>
        <p className="text-sm text-gray-700">
          {task.dueDate || "No deadline"}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
          <Folder size={14} />
          Folder
        </p>
        <p className="text-sm text-gray-700">
          {task.folder}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
          <Tag size={14} />
          Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {task.tags.length > 0 ? (
            task.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">No tags</span>
          )}
        </div>
      </div>
    </div>
  );
}
