
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ChecklistItem } from "../../task/types";

type Props = {
  items: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
};

export default function TaskChecklist({
  items,
  onChange,
}: Props) {
  const [newItem, setNewItem] = useState("");

  const completedCount = items.filter(
    (item) => item.completed
  ).length;

  const addItem = () => {
    if (!newItem.trim()) return;

    onChange([
      ...items,
      {
        id: Date.now(),
        title: newItem.trim(),
        completed: false,
      },
    ]);

    setNewItem("");
  };

  const toggleItem = (id: number) => {
    onChange(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteItem = (id: number) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">
          Checklist
        </h2>

        <span className="text-xs text-gray-500">
          {completedCount}/{items.length} completed
        </span>
      </div>

      {items.length > 0 && (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-600 transition-all"
            style={{
              width: `${
                (completedCount / items.length) * 100
              }%`,
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className="h-4 w-4 accent-violet-600"
            />

            <span
              className={`flex-1 text-sm ${
                item.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }`}
            >
              {item.title}
            </span>

            <button
              onClick={() => deleteItem(item.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder="Add checklist item..."
          className="flex-1 min-w-0 border rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
        />

        <button
          onClick={addItem}
          className="bg-violet-600 text-white px-3 rounded-lg"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
