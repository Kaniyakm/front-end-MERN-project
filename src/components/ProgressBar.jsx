import { useEffect, useState } from "react";

const ProgressBar = ({ label, percentage, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(percentage);
    }, 300);
  }, [percentage]);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
