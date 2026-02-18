/********************************************************************
 FILE: SmartAdviceCard.jsx
 PURPOSE:
 Displays financial warnings or smart suggestions to the user
 based on budgeting analysis.
********************************************************************/
// src/components/ui/SmartAdviceCard.jsx
const SmartAdviceCard = ({ advice }) => {
  if (!advice) return null;
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-blue-800 mb-2">Smart Advice</h3>
      <p className="text-blue-700 text-sm">{advice}</p>
    </div>
  );
};

export default SmartAdviceCard;



