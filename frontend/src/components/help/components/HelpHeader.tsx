import { LifeBuoy } from "lucide-react";

export default function HelpHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <LifeBuoy size={28} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        How can we help you?
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Find answers and learn how to use SmartNote.
      </p>
    </div>
  );
}