"use client";

import { useState } from "react";
import React from 'react'
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


const dashboard = () => {

    const [activePage, setActivePage] = useState("Dashboard");
const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  return (
   <div className="flex min-h-screen bg-gray-50">
     <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />


 <main className="flex-1 min-w-0 p-6 space-y-6">
     {activePage === "Dashboard" && (
          <>
 {/* Dashboard Header */}
        <DashboardHeader />
   {/* Statistics Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
   
           <TotalNotes
             totalNotes={24}
             percentage={12}
           />
   <TotalTasks
          totalTasks={12}
          percentage={8}
        />

 <CompletedTasks
          completedTasks={8}
          percentage={67}
        />

        <UpcomingTasks
          upcomingTasks={3}
          percentage={2}
        />

         </div>

{/* Schedule & Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <TodaysSchedule
          schedules={[
            {
              id: 1,
              title: "Finish Laravel API",
              time: "08:00 AM",
              color: "text-orange-500",
            },
            {
              id: 2,
               title: "Study Next.js",
              time: "11:00 AM",
              color: "text-blue-500",
            },
            {
              id: 3,
              title: "Project Meeting",
              time: "02:00 PM",
              color: "text-violet-500",
            },
          ]}
        />
<ProductivityOverview />

      </div>


{/* Recent Notes & Upcoming Deadlines */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

  <RecentNotes
    notes={[
      {
        id: 1,
        title: "My Project Idea",
        updatedAt: "2h ago",
        color: "bg-orange-100 text-orange-600",
        pinned: true,
      },
      {
        id: 2,
        title: "Study Plan",
        updatedAt: "3h ago",
        color: "bg-violet-100 text-violet-600",
      },
      {
        id: 3,
        title: "Laravel Tips",
        updatedAt: "1d ago",
        color: "bg-blue-100 text-blue-600",
      },
    ]}
  />

  <UpcomingDeadlines
    deadlines={[
      {
        id: 1,
        title: "Laravel Project",
        date: "Nov 20",
        time: "09:00 AM",
        color: "bg-orange-100 text-orange-600",
      },
      {
        id: 2,
        title: "Design Portfolio",
        date: "Nov 22",
        time: "11:00 AM",
        color: "bg-violet-100 text-violet-600",
      },
      {
        id: 3,
        title: "Documentation",
        date: "Nov 25",
        time: "05:00 PM",
        color: "bg-blue-100 text-blue-600",
      },
    ]}
  />

</div>
</>
     )}
     {activePage === "All Notes" && <AllNotes />}
     {activePage === "Folders" && <Folder />}
     {activePage === "Tags" && <Tag />}
{/* Tasks Page */}
<div className={activePage === "Tasks" ? "block" : "hidden"}>
  <Tasks
    onSelectTask={(task) => {
      setSelectedTask(task);
      setActivePage("Task Details");
    }}
    updatedTask={selectedTask}
  />
</div>

{/* Task Details Page */}
{activePage === "Task Details" && selectedTask && (
  <TaskDetails
    task={selectedTask}
    onBack={() => setActivePage("Tasks")}
    onUpdate={(updatedTask) => setSelectedTask(updatedTask)}
  />
)}


</main>
   
       </div>
  )
}

export default dashboard