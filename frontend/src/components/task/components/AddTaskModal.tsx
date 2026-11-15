
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Task } from "../types";

type Props = {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, "id">) => void;
};

export default function AddTaskModal({
  task,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [dueDate, setDueDate] = useState("");
  const [folder, setFolder] = useState("Personal");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setFolder(task.folder);
      setTags(task.tags.join(", "));
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description,
      status,
      priority,
      dueDate,
      folder,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      checklist: task?.checklist ?? [],
      comments: task?.comments ?? [],
    });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {task ? "Edit Task" : "Create New Task"}
          </h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium">Task Title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            className={inputClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Priority</label>
            <select
              className={inputClass}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Due Date</label>
          <input
            type="date"
            className={inputClass}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Folder</label>
          <select
            className={inputClass}
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Projects</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tags</label>
          <input
            className={inputClass}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Programming, Important"
          />
          <p className="text-xs text-gray-400 mt-1">
            Separate tags using commas.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm"
          >
            {task ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
