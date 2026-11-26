"use client";

import { useState } from "react";
import { Reminder } from "./types";

import ReminderHeader from "./components/ReminderHeader";
import ReminderTabs from "./components/ReminderTabs";
import ReminderList from "./components/ReminderList";
import AddReminderModal from "./components/AddReminderModal";

type Tab = "Upcoming" | "Overdue" | "History";

const today = new Date().toLocaleDateString("en-CA");
interface Props {
  userId: number;
}
const initialReminders: Reminder[] = [
  {
    id: 1,
    title: "Assignment Submission",
    date: "2026-11-16",
    time: "09:00",
    completed: false,
  },
  {
    id: 2,
    title: "Pay Electricity Bill",
    date: "2026-11-18",
    time: "18:00",
    completed: false,
  },
  {
    id: 3,
    title: "Project Deadline",
    date: "2026-11-14",
    time: "23:59",
    completed: false,
  },
  {
    id: 4,
    title: "Team Meeting",
    date: "2026-11-10",
    time: "11:00",
    completed: true,
  },
];

export default function Reminders({ userId }: Props) {
  const [reminders, setReminders] = useState(initialReminders);
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");
  const [showModal, setShowModal] = useState(false);

  const upcoming = reminders.filter(
    (item) => item.date >= today && !item.completed
  );

  const overdue = reminders.filter(
    (item) => item.date < today && !item.completed
  );

  const history = reminders.filter(
    (item) => item.completed
  );

  const counts: Record<Tab, number> = {
    Upcoming: upcoming.length,
    Overdue: overdue.length,
    History: history.length,
  };

  const filteredReminders =
    activeTab === "Upcoming"
      ? upcoming
      : activeTab === "Overdue"
      ? overdue
      : history;

  const handleAdd = (reminder: Reminder) => {
    setReminders((prev) => [reminder, ...prev]);
    setActiveTab("Upcoming");
  };

  const handleComplete = (id: number) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: true }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setReminders((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <ReminderHeader onAdd={() => setShowModal(true)} />

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ReminderTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />

        <div className="pt-5">
          <ReminderList
            reminders={filteredReminders}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <AddReminderModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}