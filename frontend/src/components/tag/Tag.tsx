
"use client";

import { useState } from "react";
import TagHeader from "./components/TagHeader";
import TagList from "./components/TagList";
import AddTagModal from "./components/AddTagModal";

export type TagItem = {
  id: number;
  name: string;
  color: string;
};
interface Props {
  userId: number;
}
const initialTags: TagItem[] = [
  { id: 1, name: "Important", color: "bg-red-100 text-red-700" },
  { id: 2, name: "Ideas", color: "bg-yellow-100 text-yellow-700" },
  { id: 3, name: "Programming", color: "bg-blue-100 text-blue-700" },
  { id: 4, name: "Learning", color: "bg-green-100 text-green-700" },
];

export default function Tag({ userId }: Props) {
  const [tags, setTags] = useState<TagItem[]>(initialTags);
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [tagName, setTagName] = useState("");

  const openCreateModal = () => {
    setEditingTag(null);
    setTagName("");
    setShowModal(true);
  };

  const openEditModal = (tag: TagItem) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTag(null);
    setTagName("");
  };

  const handleSave = () => {
    const name = tagName.trim();

    if (!name) return;

    const duplicate = tags.some(
      (tag) =>
        tag.name.toLowerCase() === name.toLowerCase() &&
        tag.id !== editingTag?.id
    );

    if (duplicate) {
      alert("This tag already exists!");
      return;
    }

    if (editingTag) {
      setTags((prev) =>
        prev.map((tag) =>
          tag.id === editingTag.id ? { ...tag, name } : tag
        )
      );
    } else {
      setTags((prev) => [
        ...prev,
        {
          id: Date.now(),
          name,
          color: "bg-blue-100 text-blue-700",
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this tag?");

    if (confirmed) {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    }
  };

  return (
    <section className="space-y-4">
      <TagHeader
        onAddTag={openCreateModal}
        totalTags={tags.length}
      />

      <TagList
        tags={tags}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <AddTagModal
          tagName={tagName}
          setTagName={setTagName}
          editing={!!editingTag}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
