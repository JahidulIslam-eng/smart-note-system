

"use client";

import {
  Pin,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

export type Note = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  emoji: string;
  color: string;
  is_pinned: boolean;
};

type NoteCardProps = {
  note: Note;
  view: "grid" | "list";
  onOpen: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
};

export default function NoteCard({
  note,
  view,
  onOpen,
  onEdit,
  onDelete,
  onTogglePin,
}: NoteCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        view === "list" ? "flex items-center" : ""
      }`}
    >
      {/* Note Image Area */}
      <button
        type="button"
        onClick={() => onOpen(note)}
        aria-label={`Open ${note.title}`}
        className={`flex items-center justify-center ${
          view === "list" ? "h-24 w-32 shrink-0" : "h-28 w-full"
        }`}
        style={{ background: note.color }}
      >
        <span className="text-5xl">{note.emoji}</span>
      </button>

      {/* Note Information */}
      <div className="min-w-0 flex-1 p-3">
        <div className="flex items-center justify-between gap-2">

          <button
            type="button"
            onClick={() => onOpen(note)}
            className="min-w-0 truncate text-left text-sm font-semibold text-gray-900 hover:text-violet-600"
          >
            {note.title}
          </button>

          {/* Pin / Unpin */}
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            className={`shrink-0 transition ${
              note.is_pinned
                ? "text-violet-600"
                : "text-gray-400 hover:text-violet-600"
            }`}
            title={note.is_pinned ? "Unpin Note" : "Pin Note"}
            aria-label={note.is_pinned ? "Unpin Note" : "Pin Note"}
          >
            <Pin
              size={15}
              fill={note.is_pinned ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Description */}
        <button
          type="button"
          onClick={() => onOpen(note)}
          className="mt-1 block w-full truncate text-left text-xs text-gray-500"
        >
          {note.description || "No description"}
        </button>

        {/* Date and Category */}
        <div className="mt-4 flex items-center justify-between gap-2">

          <span className="text-xs text-gray-400">
            {note.date}
          </span>

          <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-600">
            {note.category}
          </span>

        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center justify-end gap-2 border-t border-gray-100 pt-2">

          {/* Open */}
          <button
            type="button"
            onClick={() => onOpen(note)}
            title="Open Note"
            aria-label="Open Note"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <FileText size={15} />
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(note)}
            title="Edit Note"
            aria-label="Edit Note"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={15} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            title="Delete Note"
            aria-label="Delete Note"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>

        </div>
      </div>
    </div>
  );
}
