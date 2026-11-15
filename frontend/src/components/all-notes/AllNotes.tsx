

"use client";

import { useState } from "react";

import NotesHeader from "./components/NotesHeader";
import NotesTabs from "./components/NotesTabs";
import NotesGrid from "./components/NotesGrid";
import { Note } from "./components/NoteCard";
import { X } from "lucide-react";

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Project Ideas",
    description: "Build a modern SaaS application...",
    category: "Ideas",
    date: "2h ago",
    emoji: "💡",
    color: "linear-gradient(135deg, #fff0b8, #ffe5a3)",
  },
  {
    id: 2,
    title: "Study Plan",
    description: "Next.js complete learning roadmap...",
    category: "Study",
    date: "3h ago",
    emoji: "🎓",
    color: "linear-gradient(135deg, #e5e7ff, #d7e4ff)",
  },
  {
    id: 3,
    title: "Meeting Notes",
    description: "Discuss project requirements...",
    category: "Work",
    date: "5h ago",
    emoji: "👨‍💻",
    color: "linear-gradient(135deg, #f5d9ff, #e8d7ff)",
  },
  {
    id: 4,
    title: "Laravel Tips",
    description: "Useful commands and shortcuts...",
    category: "Study",
    date: "1d ago",
    emoji: "💻",
    color: "linear-gradient(135deg, #f9d5f2, #e8d9ff)",
  },
  {
    id: 5,
    title: "Travel Plan",
    description: "Go to Cox's Bazar...",
    category: "Personal",
    date: "1d ago",
    emoji: "🏝️",
    color: "linear-gradient(135deg, #d5f5e6, #c5e8ff)",
  },
  {
    id: 6,
    title: "Shopping List",
    description: "Milk, Bread, Eggs...",
    category: "Personal",
    date: "2d ago",
    emoji: "🛒",
    color: "linear-gradient(135deg, #ffe4ce, #ffdddd)",
  },
];

export default function AllNotes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Search and category filter
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeTab === "All" || note.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  // Create new note
  const handleCreateNote = () => {
    if (!newTitle.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title: newTitle,
      description: newDescription || "No description",
      category: "Ideas",
      date: "Just now",
      emoji: "📝",
      color: "linear-gradient(135deg, #e5e7ff, #ddd6fe)",
    };

    setNotes((prev) => [newNote, ...prev]);

    setNewTitle("");
    setNewDescription("");
    setActiveTab("All");
    setSearch("");
    setShowModal(false);
  };

  return (
    <div className="min-w-0 space-y-6">

      {/* Header */}
      <NotesHeader
        search={search}
        setSearch={setSearch}
        view={view}
        setView={setView}
        onNewNote={() => setShowModal(true)}
      />

      {/* Category Tabs */}
      <NotesTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Notes */}
      <NotesGrid
        notes={filteredNotes}
        view={view}
      />

      {/* New Note Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-lg font-bold text-gray-900">
                Create New Note
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Note Title
                </label>

                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Write something..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <button
                onClick={handleCreateNote}
                disabled={!newTitle.trim()}
                className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Note
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
