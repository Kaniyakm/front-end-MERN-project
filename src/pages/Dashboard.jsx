/*****************************************************************************************
 FILE: Dashboard.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Main analytics hub.
 - Fetch projects
 - Calculate totals
 - Render charts
 - Show progress bars
*****************************************************************************************/

import React, { useEffect, useState } from "react";
import projectService from "../api/projectService";
import FinanceChart from "../components/charts/FinanceChart"
import ProgressBar from "../components/ui/ProgressBar";
import { calculateTotals } from "../utils/financeCalculations";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [income, setIncome] = useState(5000);


  //API call to fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await projectService.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const { needsTotal, wantsTotal, savingsTotal } =
    calculateTotals(projects);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>

      {/* Income Calculator */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Monthly Income</h2>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="p-3 border rounded"
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <ProgressBar label="Needs" percentage={(needsTotal / income) * 100} />
        <ProgressBar label="Wants" percentage={(wantsTotal / income) * 100} />
        <ProgressBar label="Savings" percentage={(savingsTotal / income) * 100} />
      </div>

      {/* Animated Chart */}
      <FinanceChart
        needs={needsTotal}
        wants={wantsTotal}
        savings={savingsTotal}
      />
    </div>
  );
};
<div className="space-y-4 p-8">
  {/* Test custom animations */}
  <div className="animate-fadeIn bg-blue-500 text-white p-4 rounded-lg">
    ✨ FadeIn Animation Works!
  </div>
  
  <div className="animate-slideDown bg-green-500 text-white p-4 rounded-lg">
    ⬇️ SlideDown Animation Works!
  </div>
  
  {/* Test transform scale */}
  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg transform hover:scale-110 transition-transform duration-300">
    🎯 Hover Me - Scale Animation
  </button>
</div>
export default Dashboard;
