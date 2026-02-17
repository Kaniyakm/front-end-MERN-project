/*****************************************************************************************
 FILE: financeCalculations.js
 ------------------------------------------------------------------------------------------
 PROJECT: Balance Blueprint
 AUTHOR: [Your Name]
 ------------------------------------------------------------------------------------------
 PURPOSE:
 This file contains pure business logic for financial calculations used
 throughout the application.

 It implements the 50/30/20 budgeting rule:
   - 50% Needs
   - 30% Wants
   - 20% Savings

 This file MUST:
   ✔ Contain no React code
   ✔ Contain no JSX
   ✔ Contain no API calls
   ✔ Export named functions only
   ✔ Remain reusable and testable

 ARCHITECTURE ROLE:
 Dashboard.jsx
    → Calls calculateTotals()
    → Receives computed totals
    → Passes totals to FinanceChart.jsx for visualization

 This ensures separation of concerns:
   Business Logic (this file)
   UI Rendering (FinanceChart.jsx)
*****************************************************************************************/


/* -------------------------------------------------------------------------- */
/* CALCULATE TOTALS USING 50/30/20 RULE                                       */
/* -------------------------------------------------------------------------- */

/**
 * calculateTotals
 * ----------------------------------------------------------------------------
 * Applies the 50/30/20 budgeting rule to a given income value.
 *
 * @param {number|string} income - User's monthly income
 *
 * @returns {Object} An object containing:
 *  {
 *    needs: number,
 *    wants: number,
 *    savings: number
 *  }
 *
 * Behavior:
 * - Converts income to a number
 * - Handles invalid or empty input safely
 * - Rounds values to 2 decimal places
 */
export const calculateTotals = (income) => {
  const numericIncome = Number(income);

  // Defensive guard: prevent NaN or negative values
  if (!numericIncome || numericIncome <= 0 || isNaN(numericIncome)) {
    return {
      needs: 0,
      wants: 0,
      savings: 0,
    };
  }

  return {
    needs: Number((numericIncome * 0.5).toFixed(2)),
    wants: Number((numericIncome * 0.3).toFixed(2)),
    savings: Number((numericIncome * 0.2).toFixed(2)),
  };
};


/* -------------------------------------------------------------------------- */
/* OPTIONAL: CALCULATE PERCENTAGES (FOR PROGRESS BARS)                       */
/* -------------------------------------------------------------------------- */

/**
 * calculatePercentages
 * ----------------------------------------------------------------------------
 * Converts totals into percentage values relative to income.
 *
 * @param {Object} totals
 * @param {number} income
 *
 * @returns {Object}
 *  {
 *    needsPercent: number,
 *    wantsPercent: number,
 *    savingsPercent: number
 *  }
 */
export const calculatePercentages = (totals, income) => {
  const numericIncome = Number(income);

  if (!numericIncome || numericIncome <= 0) {
    return {
      needsPercent: 0,
      wantsPercent: 0,
      savingsPercent: 0,
    };
  }

  return {
    needsPercent: Number(((totals.needs / numericIncome) * 100).toFixed(1)),
    wantsPercent: Number(((totals.wants / numericIncome) * 100).toFixed(1)),
    savingsPercent: Number(((totals.savings / numericIncome) * 100).toFixed(1)),
  };
};


/* -------------------------------------------------------------------------- */
/* OPTIONAL: FORMAT CURRENCY                                                  */
/* -------------------------------------------------------------------------- */

/**
 * formatCurrency
 * ----------------------------------------------------------------------------
 * Formats numeric values into USD currency string.
 *
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value || 0);
};
