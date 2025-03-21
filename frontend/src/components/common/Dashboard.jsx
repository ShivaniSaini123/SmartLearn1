import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />  {/* This will render the selected section */}
      </div>
    </div>
  );
};

export default Dashboard;
