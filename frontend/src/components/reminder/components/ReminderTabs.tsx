type Tab = "Upcoming" | "Overdue" | "History";

type Props = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  counts: Record<Tab, number>;
};

const tabs: Tab[] = ["Upcoming", "Overdue", "History"];

export default function ReminderTabs({
  activeTab,
  setActiveTab,
  counts,
}: Props) {
  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === tab
              ? "border-b-2 border-violet-600 text-violet-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab} ({counts[tab]})
        </button>
      ))}
    </div>
  );
}