import { useState } from "react";

const Attendance = () => {
  const [attendance, setAttendance] = useState([
    { date: "2025-03-21", status: "Present" },
    { date: "2025-03-20", status: "Absent" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📅 Attendance</h2>
      <ul>
        {attendance.map((day, index) => (
          <li key={index} className="p-2 border-b">
            {day.date} - {day.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
