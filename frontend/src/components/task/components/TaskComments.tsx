
import { useState } from "react";
import { Send } from "lucide-react";

type Props = {
  comments: string[];
  onAddComment: (comment: string) => void;
};

export default function TaskComments({
  comments,
  onAddComment,
}: Props) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    onAddComment(comment.trim());
    setComment("");
  };

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">

      <h2 className="font-semibold text-gray-800">
        Comments ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-400">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 min-w-0 border rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
        />

        <button
          type="submit"
          className="bg-violet-600 text-white px-3 rounded-lg"
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
}
