/*****************************************************************************************
 FILE: Dashboard.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Main analytics hub.
 - Fetch projects
 - Calculate totals using 50/30/20 rule
 - Render charts
 - Show progress bars
*****************************************************************************************/

import React, { useEffect, useState } from "react";
import projectService from "../api/projectService";
import FinanceChart from "../components/charts/FinanceChart";
import ProgressBar from "../components/ui/ProgressBar";
import { calculateTotals } from "../utils/financeCalculations";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [income, setIncome] = useState(5000);

  /* -------------------------------------------------------------------------- */
  /* FETCH PROJECTS                                                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* CALCULATE 50/30/20 TOTALS (BASED ON INCOME)                               */
  /* -------------------------------------------------------------------------- */
  const totals = calculateTotals(income);

  const needsPercent = (totals.needs / income) * 100;
  const wantsPercent = (totals.wants / income) * 100;
  const savingsPercent = (totals.savings / income) * 100;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Balance Blueprint Dashboard
      </h1>

      {/* Income Calculator */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Monthly Income
        </h2>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="p-3 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <ProgressBar label="Needs" percentage={needsPercent || 0} />
        <ProgressBar label="Wants" percentage={wantsPercent || 0} />
        <ProgressBar label="Savings" percentage={savingsPercent || 0} />
      </div>

      {/* Animated Chart */}
      <FinanceChart totals={totals} />
    </div>
  );
};

export default Dashboard;
