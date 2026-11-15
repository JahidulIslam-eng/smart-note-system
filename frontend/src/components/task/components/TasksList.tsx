
import { Task } from "../types";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
};

export default function TasksList({
  tasks,
  onSelectTask,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
        No tasks found. Create your first task!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onSelect={onSelectTask}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
