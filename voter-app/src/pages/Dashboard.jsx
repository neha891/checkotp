import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard/self-nomination" className="block p-2 hover:bg-gray-700">
              📝 Self-Nomination
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/election-voting" className="block p-2 hover:bg-gray-700">
              🗳️ Election Voting
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/results" className="block p-2 hover:bg-gray-700">
              📊 Results
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This will render the selected page */}
      </div>
    </div>
  );
};

export default Dashboard;
