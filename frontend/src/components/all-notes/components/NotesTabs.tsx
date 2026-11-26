

"use client";

type NotesTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  counts: {
    All: number;
    Personal: number;
    Work: number;
    Study: number;
    Ideas: number;
  };
};

export default function NotesTabs({
  activeTab,
  setActiveTab,
  counts,
}: NotesTabsProps) {
  const tabs = [
    { name: "All", count: counts.All },
    { name: "Personal", count: counts.Personal },
    { name: "Work", count: counts.Work },
    { name: "Study", count: counts.Study },
    { name: "Ideas", count: counts.Ideas },
  ];

  return (
    <div className="flex items-center gap-6 overflow-x-auto border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type="button"
          onClick={() => setActiveTab(tab.name)}
          aria-pressed={activeTab === tab.name}
          className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition ${
            activeTab === tab.name
              ? "border-violet-600 text-violet-700"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab.name} ({tab.count})
        </button>
      ))}
    </div>
  );
}
