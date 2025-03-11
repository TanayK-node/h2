import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import ExamRoomAllocation from "../components/ExamRoomAllocation";
import TimetableManagement from "../components/TimetableManagement";
import UserManagement from "../components/UserManagement";
import EventManagement from "../components/EventManagement";
import FeedbackSystem from "../components/FeedbackSystem";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <Routes>
          <Route path="exam-room" element={<ExamRoomAllocation />} />
          <Route path="timetable" element={<TimetableManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="feedback" element={<FeedbackSystem />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
