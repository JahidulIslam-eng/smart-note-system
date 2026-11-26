

"use client";

import { useEffect, useState } from "react";

import NotesHeader from "./components/NotesHeader";
import NotesTabs from "./components/NotesTabs";
import NotesGrid from "./components/NotesGrid";
import { Note } from "./components/NoteCard";
import { X, Pencil } from "lucide-react";

interface Props {
  userId: number;
}

type ModalMode = "create" | "view" | "edit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const noteColors = [
  "linear-gradient(135deg, #fff0b8, #ffe5a3)",
  "linear-gradient(135deg, #e5e7ff, #d7e4ff)",
  "linear-gradient(135deg, #f5d9ff, #e8d7ff)",
  "linear-gradient(135deg, #d5f5e6, #c5e8ff)",
];

const noteEmojis = ["💡", "🎓", "👨‍💻", "💻", "🏝️", "📝"];

export default function AllNotes({ userId }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // API request helper
  const getHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found");
    }

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Format note from database
  const formatNote = (note: any, index = 0): Note => ({
    id: note.id,
    title: note.title,
    description: note.content || "",
    category: "Ideas",
    date: note.updated_at
      ? new Date(
          note.updated_at.replace(" ", "T")
        ).toLocaleDateString()
      : "",
    emoji: noteEmojis[index % noteEmojis.length],
    color: noteColors[index % noteColors.length],
    is_pinned: Boolean(Number(note.is_pinned)),
  });

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/all-notes`, {
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notes");
      }

      setNotes(data.notes.map((note: any, index: number) =>
        formatNote(note, index)
      ));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch notes"
      );
      console.error("Fetch notes error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  // Open create modal
  const handleNewNote = () => {
    setSelectedNote(null);
    setNewTitle("");
    setNewDescription("");
    setModalMode("create");
    setError("");
    setShowModal(true);
  };

  // Open existing note
  const handleOpenNote = (note: Note) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewDescription(note.description);
    setModalMode("view");
    setError("");
    setShowModal(true);
  };

  // Edit existing note
  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewDescription(note.description);
    setModalMode("edit");
    setError("");
    setShowModal(true);
  };

  // Create or update note
  const handleSaveNote = async () => {
    if (!newTitle.trim()) return;

    try {
      setSaving(true);
      setError("");

      const isEditing = modalMode === "edit" && selectedNote;

      const url = isEditing
        ? `${API_URL}/api/notes/${selectedNote.id}`
        : `${API_URL}/api/notes`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newDescription.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save note");
      }

      if (isEditing) {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === selectedNote.id
              ? {
                  ...note,
                  title: data.note?.title ?? newTitle.trim(),
                  description:
                    data.note?.content ?? newDescription.trim(),
                  date: data.note?.updated_at
                    ? new Date(
                        data.note.updated_at.replace(" ", "T")
                      ).toLocaleDateString()
                    : new Date().toLocaleDateString(),
                }
              : note
          )
        );
      } else {
        const createdNote = formatNote(data.note, 0);

        setNotes((prev) => [createdNote, ...prev]);
      }

      setActiveTab("All");
      setSearch("");
      setShowModal(false);
      setSelectedNote(null);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save note"
      );
      console.error("Save note error:", err);
    } finally {
      setSaving(false);
    }
  };

  // Delete note
  const handleDeleteNote = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));

      if (selectedNote?.id === id) {
        setShowModal(false);
        setSelectedNote(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete note"
      );
      console.error("Delete note error:", err);
    }
  };

  // Pin / Unpin note
  const handleTogglePin = async (id: number) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/notes/${id}/pin`,
        {
          method: "PATCH",
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update pin");
      }

      setNotes((prev) =>
        prev
          .map((note) =>
            note.id === id
              ? { ...note, is_pinned: data.is_pinned }
              : note
          )
          .sort(
            (a, b) => Number(b.is_pinned) - Number(a.is_pinned)
          )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update pin"
      );
      console.error("Pin note error:", err);
    }
  };

  // Search and category filter
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeTab === "All" || note.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-w-0 space-y-6">

      {/* Header */}
      <NotesHeader
        search={search}
        setSearch={setSearch}
        view={view}
        setView={setView}
        onNewNote={handleNewNote}
      />

      {/* Category Tabs */}
<NotesTabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  counts={{
    All: notes.length,
    Personal: 0,
    Work: 0,
    Study: 0,
    Ideas: 0,
  }}
/>

      {/* Error Message */}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Notes */}
      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Loading notes...
        </p>
      ) : (
        <NotesGrid
          notes={filteredNotes}
          view={view}
          onOpen={handleOpenNote}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onTogglePin={handleTogglePin}
        />
      )}

      {/* Create / View / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-lg font-bold text-gray-900">
                {modalMode === "create"
                  ? "Create New Note"
                  : modalMode === "edit"
                  ? "Edit Note"
                  : "View Note"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                disabled={saving}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Note Title
                </label>

                <input
                  type="text"
                  value={newTitle}
                  readOnly={modalMode === "view"}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500 read-only:bg-gray-50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  readOnly={modalMode === "view"}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Write something..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500 read-only:bg-gray-50"
                />
              </div>

              {/* Modal Actions */}
              {modalMode === "view" ? (
                <button
                  onClick={() => setModalMode("edit")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  <Pencil size={16} />
                  Edit Note
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  disabled={!newTitle.trim() || saving}
                  className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : modalMode === "edit"
                    ? "Update Note"
                    : "Create Note"}
                </button>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
