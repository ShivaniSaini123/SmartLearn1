import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-60 h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <ul>
        {["Attendance", "Assignments", "Projects", "Timetable", "Exam","Pomodoro"].map((item) => (
          <li key={item} className="mb-3">
            <Link to={`/${item.toLowerCase()}`} className="block p-2 rounded hover:bg-gray-700">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
