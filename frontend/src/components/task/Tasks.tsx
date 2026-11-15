
"use client";

import { useEffect,useState } from "react";
import { Task, TaskStatus } from "./types";

import TasksHeader from "./components/TasksHeader";
import TasksTabs from "./components/TasksTabs";
import TasksList from "./components/TasksList";
import TaskKanban from "./components/TaskKanban";
import AddTaskModal from "./components/AddTaskModal";

type TasksProps = {
  onSelectTask: (task: Task) => void;
  updatedTask?: Task | null;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete Laravel API",
    description: "Develop REST API using Laravel.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-11-20",
    folder: "Projects",
    tags: ["Programming", "Important"],
    checklist: [
      { id: 1, title: "Create database", completed: true },
      { id: 2, title: "Create API routes", completed: false },
    ],
    comments: ["API development started."],
  },
  {
    id: 2,
    title: "Study Next.js",
    description: "Learn Next.js App Router and server components.",
    status: "To Do",
    priority: "Medium",
    dueDate: "2026-11-22",
    folder: "Study",
    tags: ["Learning"],
    checklist: [],
    comments: [],
  },
  {
    id: 3,
    title: "Design Portfolio",
    description: "Complete personal portfolio design.",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-14",
    folder: "Personal",
    tags: ["Ideas"],
    checklist: [],
    comments: [],
  },
];

export default function Tasks({
  onSelectTask,
  updatedTask,
}: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState("List");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

useEffect(() => {
  if (!updatedTask) return;

  setTasks((prev) =>
    prev.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
}, [updatedTask]);


  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? { ...taskData, id: editingTask.id }
            : task
        )
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now(),
      };

      setTasks((prev) => [newTask, ...prev]);
    }

    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleStatusChange = (
    id: number,
    status: TaskStatus
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  return (
    <div className="space-y-6">

      <TasksHeader
        totalTasks={tasks.length}
        onAdd={() => {
          setEditingTask(null);
          setShowModal(true);
        }}
      />

      <TasksTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "List" ? (
        <TasksList
          tasks={tasks}
          onSelectTask={onSelectTask}
          onEdit={(task) => {
            setEditingTask(task);
            setShowModal(true);
          }}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <TaskKanban
          tasks={tasks}
          onSelectTask={onSelectTask}
          onStatusChange={handleStatusChange}
        />
      )}

      {showModal && (
        <AddTaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}

    </div>
  );
}
