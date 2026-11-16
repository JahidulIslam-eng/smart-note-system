import { Bell, CalendarDays, Clock, MoreHorizontal } from "lucide-react";
import { Reminder } from "../types";

type Props = {
  reminder: Reminder;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ReminderCard({
  reminder,
  onComplete,
  onDelete,
}: Props) {
  const isOverdue =
    reminder.date < new Date().toLocaleDateString("en-CA");

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isOverdue
              ? "bg-red-100 text-red-500"
              : "bg-violet-100 text-violet-600"
          }`}
        >
          <Bell size={20} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-800">
            {reminder.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarDays size={13} />
              {reminder.date}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={13} />
              {reminder.time}
            </span>
          </div>

          {isOverdue && !reminder.completed && (
            <p className="mt-1 text-xs font-medium text-red-500">
              Overdue
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!reminder.completed && (
          <button
            onClick={() => onComplete(reminder.id)}
            className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-medium text-violet-600 hover:bg-violet-100"
          >
            Done
          </button>
        )}

        <button
          onClick={() => onDelete(reminder.id)}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
          title="Delete reminder"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}