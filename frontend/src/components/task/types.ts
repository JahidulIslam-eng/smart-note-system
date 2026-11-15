
export type TaskStatus = "To Do" | "In Progress" | "Completed";

export type TaskPriority = "Low" | "Medium" | "High";

export type ChecklistItem = {
  id: number;
  title: string;
  completed: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  folder: string;
  tags: string[];
  checklist: ChecklistItem[];
  comments: string[];
};
