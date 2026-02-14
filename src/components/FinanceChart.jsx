import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Needs", value: 50 },
  { name: "Wants", value: 30 },
  { name: "Savings", value: 20 },
];

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];

const FinanceChart = () => {
  return (
    <div className="w-full h-72 bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Budget Distribution</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;

