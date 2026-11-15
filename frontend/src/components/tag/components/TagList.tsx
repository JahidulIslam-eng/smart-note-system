
import TagCard from "./TagCard";
import { TagItem } from "../Tag";

type Props = {
  tags: TagItem[];
  onEdit: (tag: TagItem) => void;
  onDelete: (id: number) => void;
};

export default function TagList({ tags, onEdit, onDelete }: Props) {
  if (tags.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-8 text-center">
        <p className="text-sm text-gray-500">No tags created yet.</p>
        <p className="mt-1 text-xs text-gray-400">
          Create tags to categorize your notes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <TagCard
          key={tag.id}
          tag={tag}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
