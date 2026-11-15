
type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TasksTabs({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = ["List", "Kanban"];

  return (
    <div className="flex gap-2 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === tab
              ? "border-violet-600 text-violet-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
