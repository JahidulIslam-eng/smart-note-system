

"use client";

import NoteCard, { Note } from "./NoteCard";

type NotesGridProps = {
  notes: Note[];
  view: "grid" | "list";
  onOpen: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
};

export default function NotesGrid({
  notes,
  view,
  onOpen,
  onEdit,
  onDelete,
  onTogglePin,
}: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <p className="text-gray-500">No notes found.</p>
      </div>
    );
  }

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col gap-3"
      }
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          view={view}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}
