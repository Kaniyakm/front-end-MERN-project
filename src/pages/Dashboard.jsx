import Navbar from "../components/layout/Navbar";
import ProgressBar from "../components/ProgressBar";
import FinanceChart from "../components/FinanceChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-semibold">
          Financial Overview
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <ProgressBar
            label="Needs (50%)"
            percentage={50}
            color="bg-green-500"
          />
          <ProgressBar
            label="Wants (30%)"
            percentage={30}
            color="bg-yellow-500"
          />
          <ProgressBar
            label="Savings (20%)"
            percentage={20}
            color="bg-blue-500"
          />
        </div>

        <FinanceChart />
      </div>
    </div>
  );
};

export default Dashboard;
