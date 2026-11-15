
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  onBack: () => void;
};

export default function TaskDetailsHeader({
  title,
  onBack,
}: Props) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600"
      >
        <ArrowLeft size={17} />
        Back to Tasks
      </button>

      <div>
        <p className="text-sm text-gray-500">Task Details</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          {title}
        </h1>
      </div>
    </div>
  );
}