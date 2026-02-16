/*****************************************************************************************
 FILE: financeCalculations.js
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Pure business logic for financial calculations.
 This file must export named functions.
*****************************************************************************************/

/* -------------------------------------------------------------------------- */
/* CALCULATE TOTALS FOR 50/30/20 MODEL                                       */
/* -------------------------------------------------------------------------- */

export const calculateTotals = (projects) => {
  const needsTotal = projects
    .filter((p) => p.category === "needs")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const wantsTotal = projects
    .filter((p) => p.category === "wants")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const savingsTotal = projects
    .filter((p) => p.category === "savings")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return { needsTotal, wantsTotal, savingsTotal };
};
