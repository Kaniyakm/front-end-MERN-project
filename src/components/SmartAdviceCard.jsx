/********************************************************************
 FILE: SmartAdviceCard.jsx
 PURPOSE:
 Displays financial warnings or smart suggestions to the user
 based on budgeting analysis.
********************************************************************/

function SmartAdviceCard({ message, type = "warning" }) {
  return (
    <div
      className={`p-4 rounded shadow ${
        type === "warning"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      <strong>{type === "warning" ? "Warning" : "Good Job!"}</strong>
      <p className="mt-1">{message}</p>
    </div>
  );
}

export default SmartAdviceCard;
