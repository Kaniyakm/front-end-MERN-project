/*****************************************************************************************
 FILE: Dashboard.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Main analytics hub displaying a user’s financial overview.

 FEATURES:
 - Fetch projects from backend
 - Calculate spending by category (needs / wants / investment)
 - Apply 50/30/20 rule comparison
 - Render animated financial charts & progress bars
 - Display rule-based Smart Advice
 - Call backend AI endpoint for advanced advice
*****************************************************************************************/

import React, { useEffect, useState } from "react";
import projectService from "../api/projectService";
import FinanceChart from "../components/charts/FinanceChart";
import ProgressBar from "../components/ui/ProgressBar";
import { calculateTotals } from "../utils/financeCalculations";
import SmartAdviceCard from "../components/ui/SmartAdviceCard";
import api from "../api/api";

const Dashboard = () => {
  /* -------------------------------------------------------------------------- */
  /* STATE MANAGEMENT                                                           */
  /* -------------------------------------------------------------------------- */
  const [projects, setProjects] = useState([]);
  const [income, setIncome] = useState(5000);
  const [aiAdvice, setAiAdvice] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* FETCH PROJECTS FROM BACKEND                                                */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();

        // Optional: demo data if no backend projects exist
        if (!data || data.length === 0) {
          setProjects([
            { name: "Housing", category: "needs", amount: 2000 },
            { name: "Leisure", category: "wants", amount: 800 },
            { name: "Investing", category: "investment", amount: 1000 },
          ]);
        } else {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* CALCULATE ACTUAL SPENDING TOTALS                                          */
  /* -------------------------------------------------------------------------- */
  const actualTotals = {
    needs: projects
      .filter((p) => p.category === "needs")
      .reduce((sum, p) => sum + Number(p.amount), 0),

    wants: projects
      .filter((p) => p.category === "wants")
      .reduce((sum, p) => sum + Number(p.amount), 0),

    savings: projects
      .filter((p) => p.category === "investment")
      .reduce((sum, p) => sum + Number(p.amount), 0),
  };

  /* -------------------------------------------------------------------------- */
  /* CALCULATE IDEAL 50/30/20 TARGETS                                          */
  /* -------------------------------------------------------------------------- */
  const idealTotals = calculateTotals(income);

  const needsPercent = income ? (actualTotals.needs / income) * 100 : 0;
  const wantsPercent = income ? (actualTotals.wants / income) * 100 : 0;
  const savingsPercent = income ? (actualTotals.savings / income) * 100 : 0;

  /* -------------------------------------------------------------------------- */
  /* LOCAL SMART ADVICE (RULE‑BASED)                                           */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!income) return;

    let advice = "";

    if (needsPercent > 50) {
      advice =
        "⚠️ Your Needs spending exceeds the recommended 50%. Consider reducing fixed expenses.";
    } else if (wantsPercent > 30) {
      advice =
        "⚠️ Your Wants spending exceeds 30%. Try limiting discretionary spending.";
    } else if (savingsPercent < 20) {
      advice =
        "⚠️ Your Savings are below 20%. Increase investments for long‑term stability.";
    } else {
      advice = "✅ Great job! Your spending aligns well with the 50/30/20 rule.";
    }

    setAiAdvice(advice);
  }, [needsPercent, wantsPercent, savingsPercent, income]);

  /* -------------------------------------------------------------------------- */
  /* REAL AI ADVICE (BACKEND OPENAI INTEGRATION)                               */
  /* -------------------------------------------------------------------------- */
  const fetchRealAIAdvice = async () => {
    try {
      setLoadingAI(true);

      const response = await api.post("/insights/advice", {
        income,
        projects,
      });

      setAiAdvice(response.data.advice);
    } catch (error) {
      console.error("AI request failed:", error);
      setAiAdvice("AI advice unavailable. Please try again later.");
    } finally {
      setLoadingAI(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER CONTENT                                                             */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="p-8 space-y-8">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Balance Blueprint Dashboard
      </h1>

      {/* INCOME INPUT SECTION */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Monthly Income
        </h2>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="p-3 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* PROGRESS BARS */}
      <div className="space-y-4">
        <ProgressBar
          label={`Needs ($${actualTotals.needs})`}
          percentage={needsPercent}
        />
        <ProgressBar
          label={`Wants ($${actualTotals.wants})`}
          percentage={wantsPercent}
        />
        <ProgressBar
          label={`Savings ($${actualTotals.savings})`}
          percentage={savingsPercent}
        />
      </div>

      {/* FINANCIAL CHART */}
      <FinanceChart 
      needs={actualTotals.needs}
  wants={actualTotals.wants}
  savings={actualTotals.savings}
/>

      {/* SMART ADVICE */}
<SmartAdviceCard advice={aiAdvice} />

      {/* AI ADVICE BUTTON */}
      <button
        onClick={fetchRealAIAdvice}
        disabled={loadingAI}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:scale-105 transition disabled:opacity-50"
      >
        {loadingAI ? "Analyzing..." : "Get Advanced AI Advice"}
      </button>
    </div>
  );
};

export default Dashboard;
