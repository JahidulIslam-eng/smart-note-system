import { Plus } from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function ReminderHeader({ onAdd }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Reminders & Deadlines
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Keep track of important dates and tasks.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
      >
        <Plus size={17} />
        New Reminder
      </button>
    </div>
  );
}