
"use client";

import { useState } from "react";

import { Task, ChecklistItem } from "../types";

import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDescription from "./TaskDescription";
import TaskChecklist from "./TaskChecklist";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";

type Props = {
   userId: number;
  task: Task;
  onBack: () => void;
  onUpdate: (updatedTask: Task) => void;
};



export default function TaskDetails({
    userId,
  task,
  onBack,
  onUpdate,
}: Props) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    task.checklist
  );

  const [comments, setComments] = useState<string[]>(
    task.comments
  );

  const handleChecklistChange = (items: ChecklistItem[]) => {
    setChecklist(items);
    onUpdate({ ...task, checklist: items });
  };

  const handleAddComment = (comment: string) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    onUpdate({ ...task, comments: updatedComments });
  };

  return (
    <div className="space-y-6">

      <TaskDetailsHeader
        title={task.title}
        onBack={onBack}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <TaskDescription
            description={task.description}
          />

          <TaskChecklist
            items={checklist}
            onChange={handleChecklistChange}
          />

          <TaskComments
            comments={comments}
            onAddComment={handleAddComment}
          />

        </div>

        <div>
          <TaskInfo task={task} />
        </div>

      </div>
    </div>
  );
}
