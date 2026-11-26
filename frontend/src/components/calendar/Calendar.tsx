"use client";

import { useMemo, useState } from "react";

import CalendarHeader, {
  CalendarView,
} from "./components/CalendarHeader";

import CalendarGrid from "./components/CalendarGrid";

import CalendarEvents, {
  CalendarEvent,
} from "./components/CalendarEvents";
interface Props {
  userId: number;
}
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateOffset(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return formatDate(date);
}

export default function Calendar({ userId }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [view, setView] = useState<CalendarView>("Month");

  const today = formatDate(new Date());

  // Demo events: পরে এগুলো Reminder এবং Task data থেকে আসবে।
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Finish Laravel API",
      date: getDateOffset(0),
      time: "08:00",
      type: "Reminder",
    },
    {
      id: 2,
      title: "Study Next.js",
      date: getDateOffset(0),
      time: "11:00",
      type: "Reminder",
    },
    {
      id: 3,
      title: "Project Deadline",
      date: getDateOffset(3),
      time: "23:59",
      type: "Deadline",
    },
    {
      id: 4,
      title: "Assignment Submission",
      date: getDateOffset(1),
      time: "09:00",
      type: "Deadline",
    },
  ];

  const dates = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (view === "Day") {
      return [new Date(
        Number(selectedDate.slice(0, 4)),
        Number(selectedDate.slice(5, 7)) - 1,
        Number(selectedDate.slice(8, 10))
      )];
    }

    if (view === "Week") {
      const selected = new Date(
        Number(selectedDate.slice(0, 4)),
        Number(selectedDate.slice(5, 7)) - 1,
        Number(selectedDate.slice(8, 10))
      );

      const start = new Date(selected);
      start.setDate(selected.getDate() - selected.getDay());

      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return date;
      });
    }

    const firstDay = new Date(year, month, 1);
    const start = new Date(firstDay);
    start.setDate(1 - firstDay.getDay());

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }, [currentDate, selectedDate, view]);

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const handlePrevious = () => {
    if (view === "Day" || view === "Week") {
      const date = new Date(`${selectedDate}T12:00:00`);
      date.setDate(date.getDate() - (view === "Week" ? 7 : 1));
      setSelectedDate(formatDate(date));
      setCurrentDate(date);
      return;
    }

    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNext = () => {
    if (view === "Day" || view === "Week") {
      const date = new Date(`${selectedDate}T12:00:00`);
      date.setDate(date.getDate() + (view === "Week" ? 7 : 1));
      setSelectedDate(formatDate(date));
      setCurrentDate(date);
      return;
    }

    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="space-y-6">
      <CalendarHeader
        monthLabel={monthLabel}
        view={view}
        setView={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <CalendarGrid
            dates={dates}
            selectedDate={selectedDate}
            today={today}
            view={view}
            eventDates={events.map((event) => event.date)}
            onSelectDate={setSelectedDate}
          />
        </div>

        <CalendarEvents
          selectedDate={selectedDate}
          events={events}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Reminder
        </span>

        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          Deadline
        </span>
      </div>
    </div>
  );
}