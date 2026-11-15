
import { Hash, X } from "lucide-react";

type Props = {
  tagName: string;
  setTagName: (value: string) => void;
  editing: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function AddTagModal({
  tagName,
  setTagName,
  editing,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={21} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">
              {editing ? "Edit Tag" : "Create Tag"}
            </h2>
          </div>

          <button onClick={onClose} aria-label="Close">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tag Name
        </label>

        <input
          autoFocus
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
          }}
          placeholder="e.g. Important, Ideas, Programming"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={!tagName.trim()}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {editing ? "Save Changes" : "Create Tag"}
          </button>
        </div>
      </div>
    </div>
  );
}
