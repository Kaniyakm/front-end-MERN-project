import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <FaSpinner className="animate-spin text-blue-600 text-2xl" />
    </div>
  );
};

export default Spinner;
