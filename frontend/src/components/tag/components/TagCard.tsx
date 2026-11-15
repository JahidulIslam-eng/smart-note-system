
import { useState } from "react";
import { Hash, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { TagItem } from "../Tag";

type Props = {
  tag: TagItem;
  onEdit: (tag: TagItem) => void;
  onDelete: (id: number) => void;
};

export default function TagCard({ tag, onEdit, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <span className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${tag.color}`}>
        <Hash size={15} />
        {tag.name}
      </span>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
        aria-label="Tag options"
      >
        <MoreVertical size={17} />
      </button>

      {menuOpen && (
        <div className="absolute right-2 top-12 z-10 w-32 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <button
            onClick={() => {
              onEdit(tag);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => {
              onDelete(tag.id);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
