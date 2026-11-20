"use client";

import {useEffect, useState } from "react";
import React from 'react'
import { Bell, CalendarDays } from "lucide-react";
import TotalNotes from "@/components/dashbaord components/totalNotes";
import TotalTasks from "@/components/dashbaord components/totalTasks";
import CompletedTasks from "@/components/dashbaord components/CompletedTasks";
import UpcomingTasks from "@/components/dashbaord components/UpcomingTasks";
import TodaysSchedule from "@/components/dashbaord components/TodaysSchedule";
import ProductivityOverview from "@/components/dashbaord components/ProductivityOverview";
import RecentNotes from "@/components/dashbaord components/RecentNotes";
import UpcomingDeadlines from "@/components/dashbaord components/UpcomingDeadlines";
import Sidebar from "./layout/Sidebar";
import DashboardHeader from "@/components/dashbaord components/DashboardHeader";
import AllNotes from "./all-notes/AllNotes";
import Folder from "./folder/Folder";
import Tag from "./tag/Tag";
import Tasks from "./task/Tasks";
import TaskDetails from "./task/components/TaskDetails";
import { Task } from "./task/types";
import Reminders from "./reminder/Reminders";
import Calendar from "./calendar/Calendar";
import AIAssistant from "./ai-assistant/AIAssistant";
import Analytics from "./analytics/Analytics";
import Search from "./search/Search";
import Settings from "./settings/Settings";
import Help from "./help/Help";
import DashboardGuard from "./DashboardGuard";



const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <DashboardGuard>
      <div className="flex min-h-screen bg-gray-50">

        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="flex-1 min-w-0 p-6 space-y-6">

          {activePage === "Dashboard" && (
            <>
              <DashboardHeader user={user} />

              {/* তোমার বাকি Dashboard components */}
            </>
          )}

          {activePage === "All Notes" && (
            <AllNotes userId={user.id} />
          )}

          {activePage === "Folders" && (
            <Folder userId={user.id} />
          )}

          {activePage === "Tags" && (
            <Tag userId={user.id} />
          )}

          {activePage === "Tasks" && (
            <Tasks
              userId={user.id}
              onSelectTask={(task) => {
                setSelectedTask(task);
                setActivePage("Task Details");
              }}
              updatedTask={selectedTask}
            />
          )}

          {activePage === "Task Details" && selectedTask && (
            <TaskDetails
              userId={user.id}
              task={selectedTask}
              onBack={() => setActivePage("Tasks")}
              onUpdate={(updatedTask) => setSelectedTask(updatedTask)}
            />
          )}

          {activePage === "Reminders" && (
            <Reminders userId={user.id} />
          )}

          {activePage === "Calendar" && (
            <Calendar userId={user.id} />
          )}

          {activePage === "AI Assistant" && (
            <AIAssistant userId={user.id} />
          )}

          {activePage === "Analytics" && (
            <Analytics userId={user.id} />
          )}

          {activePage === "Search" && (
            <Search userId={user.id} />
          )}

          {activePage === "Settings" && (
            <Settings userId={user.id} />
          )}

          {activePage === "Help" && (
            <Help userId={user.id} />
          )}

        </main>
      </div>
    </DashboardGuard>
  );
};

export default Dashboard;