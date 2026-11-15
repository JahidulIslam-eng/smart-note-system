
import { Folder, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { FolderItem } from "../Folder";

type Props = {
  folder: FolderItem;
  onEdit: (folder: FolderItem) => void;
  onDelete: (id: number) => void;
};

export default function FolderCard({
  folder,
  onEdit,
  onDelete,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <div className={`rounded-lg p-3 ${folder.color}`}>
          <Folder size={21} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {folder.name}
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Folder
          </p>
        </div>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
        aria-label="Folder options"
      >
        <MoreVertical size={18} />
      </button>

      {menuOpen && (
        <div className="absolute right-3 top-12 z-10 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <button
            onClick={() => {
              onEdit(folder);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Pencil size={15} />
            Edit
          </button>

          <button
            onClick={() => {
              onDelete(folder.id);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
