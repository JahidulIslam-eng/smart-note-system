
import { FileText, ChevronRight, Pin } from "lucide-react";

interface Note {
  id: number;
  title: string;
  updatedAt: string;
  color: string;
  pinned?: boolean;
}

interface RecentNotesProps {
  notes: Note[];
}

export default function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Recent Notes
        </h3>

        <button className="flex items-center gap-1 text-xs text-violet-600 font-medium hover:underline">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Notes List */}
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
