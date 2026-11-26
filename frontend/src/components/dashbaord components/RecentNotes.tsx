
"use client";

import { useEffect, useState } from "react";
import { ChevronRight, FileText, Pin } from "lucide-react";

interface Note {
  id: number;
  title: string;
  updatedAt: string;
  color: string;
  pinned?: boolean;
}

interface RecentNotesProps {
  userId: number;
}

export default function RecentNotes({ userId }: RecentNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recent-notes`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch notes");
        }

        const data = await response.json();

        setNotes(
          data.notes.map((note: any, index: number) => ({
            id: note.id,
            title: note.title,
            updatedAt: new Date(note.updated_at).toLocaleDateString(),
            color: [
              "bg-blue-100 text-blue-600",
              "bg-purple-100 text-purple-600",
              "bg-green-100 text-green-600",
              "bg-yellow-100 text-yellow-600",
            ][index % 4],
            pinned: note.pinned ?? false,
          }))
        );
      } catch (error) {
        console.error("Recent notes fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNotes();
  }, [userId]);

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Recent Notes
        </h3>

        <button className="flex items-center gap-1 text-xs text-violet-600 font-medium hover:underline">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-5">
            No notes available
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-lg ${note.color}`}>
                  <FileText size={17} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-medium text-gray-800 truncate">
                      {note.title}
                    </h4>

                    {note.pinned && (
                      <Pin size={12} className="text-violet-500 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {note.updatedAt}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={15}
                className="text-gray-400 shrink-0"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
