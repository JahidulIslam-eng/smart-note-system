import { Reminder } from "../types";
import ReminderCard from "./ReminderCard";

type Props = {
  reminders: Reminder[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ReminderList({
  reminders,
  onComplete,
  onDelete,
}: Props) {
  if (reminders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
        <p className="font-medium text-gray-600">
          No reminders found
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Your reminders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}