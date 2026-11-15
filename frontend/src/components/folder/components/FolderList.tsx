
import FolderCard from "./FolderCard";
import { FolderItem } from "../Folder";

type Props = {
  folders: FolderItem[];
  onEdit: (folder: FolderItem) => void;
  onDelete: (id: number) => void;
};

export default function FolderList({
  folders,
  onEdit,
  onDelete,
}: Props) {
  if (folders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-8 text-center">
        <p className="text-sm text-gray-500">
          No folders created yet.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Create a folder to organize your notes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {folders.map((folder) => (
        <FolderCard
          key={folder.id}
          folder={folder}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
