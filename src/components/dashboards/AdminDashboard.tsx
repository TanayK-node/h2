import React, { useState } from 'react';
import { User, StudentData, TeacherData, ExamRoom, DepartmentStats } from '../../types';
import { 
  Settings, 
  LogOut, 
  Users, 
  GraduationCap, 
  School,
  BookOpen,
  BarChart3,
  Calendar,
  PlusCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const students: StudentData[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      class: 'X-A',
      rollNumber: '2024001',
      attendance: 92,
      performanceData: [
        { subject: 'Mathematics', score: 85 },
        { subject: 'Physics', score: 78 },
        { subject: 'Chemistry', score: 92 }
      ]
    },
    // Add more students...
  ];

  const teachers: TeacherData[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah@example.com',
      department: 'Mathematics',
      subjects: ['Calculus', 'Linear Algebra'],
      joinDate: '2022-08-15'
    },
    // Add more teachers...
  ];

  const examRooms: ExamRoom[] = [
    {
      id: '1',
      roomNumber: '101',
      capacity: 40,
      floor: '1st',
      building: 'Main Block',
      status: 'available'
    },
    // Add more rooms...
  ];

  const departmentStats: DepartmentStats[] = [
    {
      name: 'Mathematics',
      studentCount: 150,
      teacherCount: 8,
      averagePerformance: 82
    },
    {
      name: 'Physics',
      studentCount: 120,
      teacherCount: 6,
      averagePerformance: 78
    },
    {
      name: 'Chemistry',
      studentCount: 130,
      teacherCount: 7,
      averagePerformance: 85
    }
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Department Performance</h3>
          <BarChart3 className="h-6 w-6 text-primary-700" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averagePerformance" fill="#0077B6" name="Avg. Performance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Student Distribution</h3>
          <Users className="h-6 w-6 text-primary-700" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="studentCount" fill="#00B4D8" name="Students" />
              <Bar dataKey="teacherCount" fill="#90E0EF" name="Teachers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Quick Actions</h3>
          <Settings className="h-6 w-6 text-primary-700" />
        </div>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors">
            <span className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-primary-700" />
              <span className="text-primary-900">Add New Student</span>
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors">
            <span className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-primary-700" />
              <span className="text-primary-900">Add New Teacher</span>
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-700" />
              <span className="text-primary-900">Schedule Exam</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-900">Student Management</h2>
        <button className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Roll Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{student.attendance}%</span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 rounded-full h-2"
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-700 hover:text-primary-900 mr-3">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-900">Teacher Management</h2>
        <button className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Teacher
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Subjects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      <div className="text-sm text-gray-500">{teacher.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {teacher.subjects.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(teacher.joinDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-700 hover:text-primary-900 mr-3">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderExamRooms = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-900">Exam Room Management</h2>
        <button className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Room
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examRooms.map((room) => (
          <div key={room.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Room {room.roomNumber}</h3>
                <p className="text-sm text-gray-500">{room.building} - {room.floor} Floor</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                room.status === 'available' ? 'bg-green-100 text-green-800' :
                room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {room.status}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Capacity: {room.capacity} students</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-300 transition-colors">
                Schedule
              </button>
              <button className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-300 transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'students':
        return renderStudents();
      case 'teachers':
        return renderTeachers();
      case 'examRooms':
        return renderExamRooms();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-primary-300" />
              <div className="ml-4">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-primary-300">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center text-primary-300 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'students', icon: GraduationCap, label: 'Students' },
              { id: 'teachers', icon: Users, label: 'Teachers' },
              { id: 'examRooms', icon: School, label: 'Exam Rooms' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  activeTab === id
                    ? 'text-primary-700 border-b-2 border-primary-700'
                    : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;