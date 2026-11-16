import { CalendarView } from "./CalendarHeader";

type Props = {
  dates: Date[];
  selectedDate: string;
  today: string;
  view: CalendarView;
  eventDates: string[];
  onSelectDate: (date: string) => void;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function CalendarGrid({
  dates,
  selectedDate,
  today,
  view,
  eventDates,
  onSelectDate,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      {view !== "Day" && (
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
          {weekdays.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
      )}

      <div
        className={`grid ${
          view === "Day" ? "grid-cols-1" : "grid-cols-7"
        }`}
      >
        {dates.map((date) => {
          const dateString = formatDate(date);
          const isSelected = selectedDate === dateString;
          const isToday = today === dateString;
          const hasEvent = eventDates.includes(dateString);

          return (
            <button
              key={dateString}
              onClick={() => onSelectDate(dateString)}
              className={`relative flex min-h-20 flex-col items-center gap-2 border-b border-r border-gray-100 p-2 transition hover:bg-violet-50 ${
                isSelected ? "bg-violet-50" : "bg-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  isSelected
                    ? "bg-violet-600 font-semibold text-white"
                    : isToday
                    ? "border border-violet-500 font-semibold text-violet-600"
                    : "text-gray-700"
                }`}
              >
                {date.getDate()}
              </span>

              {hasEvent && (
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}