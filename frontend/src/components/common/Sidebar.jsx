import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard/attendance">📅 Attendance</Link></li>
        <li><Link to="/dashboard/assignments">📚 Assignments</Link></li>
        <li><Link to="/dashboard/timetable">🕒 Timetable</Link></li>
        <li><Link to="/dashboard/exams">📝 Exams</Link></li>
        <li><Link to="/dashboard/pomodoro">⏳ Pomodoro</Link></li>
        <li><Link to="/dashboard/virtual-room">🎥 Virtual Room</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
