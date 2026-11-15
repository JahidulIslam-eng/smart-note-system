
import { Plus } from "lucide-react";

type Props = {
  totalTasks: number;
  onAdd: () => void;
};

export default function TasksHeader({
  totalTasks,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          My Tasks
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and organize your tasks.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {totalTasks} total tasks
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-lg hover:bg-violet-700"
      >
        <Plus size={18} />
        Add Task
      </button>
    </div>
  );
}
