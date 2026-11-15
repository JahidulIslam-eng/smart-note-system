
type NotesTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const tabs = [
  { name: "All", count: 24 },
  { name: "Personal", count: 8 },
  { name: "Work", count: 7 },
  { name: "Study", count: 5 },
  { name: "Ideas", count: 4 },
];

export default function NotesTabs({
  activeTab,
  setActiveTab,
}: NotesTabsProps) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto border-b border-gray-200">

      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
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

