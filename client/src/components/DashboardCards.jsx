const cardStyles = [
  { label: "Total Tasks", color: "bg-primary-600" },
  { label: "Completed", color: "bg-green-600" },
  { label: "Pending", color: "bg-yellow-500" },
  { label: "In Progress", color: "bg-blue-500" },
];

const DashboardCards = ({ stats }) => {
  const values = [
    stats?.totalTasks || 0,
    stats?.completedTasks || 0,
    stats?.pendingTasks || 0,
    stats?.inProgressTasks || 0,
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cardStyles.map((card, idx) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col gap-1"
        >
          <div className={`w-8 h-1.5 rounded-full ${card.color}`}></div>
          <p className="text-2xl font-bold mt-1">{values[idx]}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
