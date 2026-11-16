import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarView = "Month" | "Week" | "Day";

type Props = {
  monthLabel: string;
  view: CalendarView;
  setView: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CalendarHeader({
  monthLabel,
  view,
  setView,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Calendar
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your schedule and important dates.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex rounded-lg bg-gray-100 p-1">
          {(["Month", "Week", "Day"] as CalendarView[]).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`rounded-md px-3 py-1.5 text-sm ${
                view === item
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={17} />
          </button>

          <span className="min-w-28 text-center text-sm font-semibold text-gray-800">
            {monthLabel}
          </span>

          <button
            onClick={onNext}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}