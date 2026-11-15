
"use client";

import { useState } from "react";
import FolderHeader from "./components/FolderHeader";
import FolderList from "./components/FolderList";
import AddFolderModal from "./components/AddFolderModal";

export type FolderItem = {
  id: number;
  name: string;
  color: string;
};

const initialFolders: FolderItem[] = [
  { id: 1, name: "Personal", color: "bg-violet-100 text-violet-700" },
  { id: 2, name: "Work", color: "bg-blue-100 text-blue-700" },
  { id: 3, name: "Study", color: "bg-green-100 text-green-700" },
  { id: 4, name: "Projects", color: "bg-orange-100 text-orange-700" },
];

export default function Folder() {
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [showModal, setShowModal] = useState(false);
  const [editingFolder, setEditingFolder] = useState<FolderItem | null>(null);
  const [folderName, setFolderName] = useState("");

  const openCreateModal = () => {
    setEditingFolder(null);
    setFolderName("");
    setShowModal(true);
  };

  const openEditModal = (folder: FolderItem) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setShowModal(true);
  };

  const handleSave = () => {
    const name = folderName.trim();

    if (!name) return;

    const duplicate = folders.some(
      (folder) =>
        folder.name.toLowerCase() === name.toLowerCase() &&
        folder.id !== editingFolder?.id
    );

    if (duplicate) {
      alert("This folder already exists!");
      return;
    }

    if (editingFolder) {
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === editingFolder.id
            ? { ...folder, name }
            : folder
        )
      );
    } else {
      setFolders((prev) => [
        ...prev,
        {
          id: Date.now(),
          name,
          color: "bg-violet-100 text-violet-700",
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this folder?");

    if (confirmed) {
      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFolder(null);
    setFolderName("");
  };

  return (
    <section className="space-y-4">
      <FolderHeader
        onAddFolder={openCreateModal}
        totalFolders={folders.length}
      />

      <FolderList
        folders={folders}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <AddFolderModal
          folderName={folderName}
          setFolderName={setFolderName}
          editing={!!editingFolder}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
