import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function HelpSearch({ value, onChange }: Props) {
  return (
    <div className="mx-auto flex max-w-xl items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-400">
      <Search size={20} className="text-gray-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search help articles..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}