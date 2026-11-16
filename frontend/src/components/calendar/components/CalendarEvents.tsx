import { Bell, CalendarCheck, Clock } from "lucide-react";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "Reminder" | "Deadline";
};

type Props = {
  selectedDate: string;
  events: CalendarEvent[];
};

export default function CalendarEvents({
  selectedDate,
  events,
}: Props) {
  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <h2 className="font-semibold text-gray-900">
        Selected Day's Events
      </h2>

      <p className="mt-1 text-xs text-gray-500">{selectedDate}</p>

      <div className="mt-4 space-y-3">
        {selectedEvents.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No events for this day.
          </p>
        ) : (
          selectedEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  event.type === "Deadline"
                    ? "bg-violet-100 text-violet-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {event.type === "Deadline" ? (
                  <CalendarCheck size={19} />
                ) : (
                  <Bell size={19} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {event.title}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {event.time}
                </p>

                <p className="mt-1 text-xs text-violet-600">
                  {event.type}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}