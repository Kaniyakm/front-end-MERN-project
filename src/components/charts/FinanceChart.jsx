/*****************************************************************************************
 FILE: FinanceChart.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Displays animated financial distribution chart.

 DEPENDENCY:
 npm install recharts
*****************************************************************************************/

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];

const FinanceChart = ({ needs, wants, savings }) => {
  const data = [
    { name: "Needs", value: needs },
    { name: "Wants", value: wants },
    { name: "Savings", value: savings },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
            animationDuration={800}
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
