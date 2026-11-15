
import { Pin } from "lucide-react";

export type Note = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  emoji: string;
  color: string;
};

type NoteCardProps = {
  note: Note;
  view: "grid" | "list";
};

export default function NoteCard({ note, view }: NoteCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        view === "list" ? "flex items-center" : ""
      }`}
    >

      {/* Note Image Area */}
      <div
        className={`flex items-center justify-center ${
          view === "list" ? "h-24 w-32 shrink-0" : "h-28 w-full"
        }`}
        style={{ background: note.color }}
      >
        <span className="text-5xl">{note.emoji}</span>
      </div>

      {/* Note Information */}
      <div className="min-w-0 flex-1 p-3">

        <div className="flex items-center justify-between gap-2">

          <h3 className="truncate text-sm font-semibold text-gray-900">
            {note.title}
          </h3>

          <button
            className="shrink-0 text-gray-400 transition hover:text-violet-600"
            title="Pin Note"
          >
            <Pin size={15} />
          </button>

        </div>

        <p className="mt-1 truncate text-xs text-gray-500">
          {note.description}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xs text-gray-400">
            {note.date}
          </span>

          <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-600">
            {note.category}
          </span>

        </div>

      </div>
    </div>
  );
}
