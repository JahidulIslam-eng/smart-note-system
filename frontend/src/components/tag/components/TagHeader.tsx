
import { Hash, Plus } from "lucide-react";

type Props = {
  onAddTag: () => void;
  totalTags: number;
};

export default function TagHeader({ onAddTag, totalTags }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <Hash size={19} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Tags</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {totalTags}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Label your notes with tags.
        </p>
      </div>

      <button
        onClick={onAddTag}
        className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        <Plus size={16} />
        Add
      </button>
    </div>
  );
}
