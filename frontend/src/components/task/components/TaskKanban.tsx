
import { Task, TaskStatus } from "../types";

type Props = {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
};

const statuses: TaskStatus[] = [
  "To Do",
  "In Progress",
  "Completed",
];

export default function TaskKanban({
  tasks,
  onSelectTask,
  onStatusChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === status
        );

        return (
          <div
            key={status}
            className="bg-gray-100 rounded-xl p-4 min-h-64"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">
                {status}
              </h3>
              <span className="text-xs bg-white px-2 py-1 rounded-full">
                {filteredTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border p-3"
                >
                  <button
                    onClick={() => onSelectTask(task)}
                    className="font-medium text-left text-gray-800 hover:text-violet-600"
                  >
                    {task.title}
                  </button>

                  <p className="text-xs text-gray-500 mt-2">
                    {task.dueDate || "No deadline"}
                  </p>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      onStatusChange(
                        task.id,
                        e.target.value as TaskStatus
                      )
                    }
                    className="mt-3 w-full text-xs border rounded-md p-2"
                  >
                    {statuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-6">
                  No tasks
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
