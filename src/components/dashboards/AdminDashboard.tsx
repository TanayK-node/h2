import React, { useState } from 'react';
import { BarChart3, Calendar, PlusCircle, Edit, Trash2, Users, Settings, GraduationCap, School, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, StudentData, TeacherData, ExamRoom, DepartmentStats } from '../../types';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

interface ExamSchedule {
  id: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  roomIds: string[];
}

// Mock data
const initialStudents: StudentData[] = [
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
];

const initialTeachers: TeacherData[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah@example.com',
    department: 'Mathematics',
    subjects: ['Calculus', 'Linear Algebra'],
    joinDate: '2022-08-15'
  },
];

const initialExamRooms: ExamRoom[] = [
  {
    id: '1',
    roomNumber: '101',
    capacity: 40,
    floor: '1st',
    building: 'Main Block',
    status: 'available'
  },
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [teachers, setTeachers] = useState<TeacherData[]>(initialTeachers);
  const [examRooms, setExamRooms] = useState<ExamRoom[]>(initialExamRooms);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<TeacherData | null>(null);
  const [editingRoom, setEditingRoom] = useState<ExamRoom | null>(null);
  const [exams, setExams] = useState<ExamSchedule[]>([]);
  const [showScheduleExam, setShowScheduleExam] = useState(false);

  // Student Handlers
  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleAddStudent = (newStudent: StudentData) => {
    setStudents([...students, newStudent]);
    setShowAddStudent(false);
  };

  const handleEditStudent = (updatedStudent: StudentData) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  // Teacher Handlers
  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const handleAddTeacher = (newTeacher: TeacherData) => {
    setTeachers([...teachers, newTeacher]);
    setShowAddTeacher(false);
  };

  const handleEditTeacher = (updatedTeacher: TeacherData) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
    setEditingTeacher(null);
  };

  // Exam Room Handlers
  const handleAddExamRoom = (newRoom: ExamRoom) => {
    setExamRooms([...examRooms, newRoom]);
    setShowAddRoom(false);
  };

  const handleDeleteRoom = (id: string) => {
    setExamRooms(examRooms.filter(room => room.id !== id));
  };

  const handleEditExamRoom = (updatedRoom: ExamRoom) => {
    setExamRooms(examRooms.map(room => 
      room.id === updatedRoom.id ? updatedRoom : room
    ));
    setEditingRoom(null);
  };

  const handleScheduleExam = (newExam: ExamSchedule) => {
    setExams([...exams, newExam]);
    setShowScheduleExam(false);
  };

  // Render Functions
  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Department Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Faculty Performance</h3>
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

      {/* Student Distribution Chart */}
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

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Quick Actions</h3>
          <Settings className="h-6 w-6 text-primary-700" />
        </div>
        <div className="space-y-4">
          <button 
            onClick={() => setShowAddStudent(true)}
            className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors"
          >
            <span className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-primary-700" />
              <span className="text-primary-900">Add New Student</span>
            </span>
          </button>
          <button 
            onClick={() => setShowAddTeacher(true)}
            className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors"
          >
            <span className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2 text-primary-700" />
              <span className="text-primary-900">Add New Teacher</span>
            </span>
          </button>
          <button 
            onClick={() => setShowScheduleExam(true)}
            className="w-full flex items-center justify-between p-3 bg-primary-100 rounded-md hover:bg-primary-300 transition-colors"
          >
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
        <button 
          onClick={() => setShowAddStudent(true)}
          className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center"
        >
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
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="text-primary-700 hover:text-primary-900 mr-3"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
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
        <button 
          onClick={() => setShowAddTeacher(true)}
          className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center"
        >
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
                  <button
                    onClick={() => setEditingTeacher(teacher)}
                    className="text-primary-700 hover:text-primary-900 mr-3"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="text-red-600 hover:text-red-900"
                  >
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
        <button 
          onClick={() => setShowAddRoom(true)}
          className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-900 transition-colors flex items-center"
        >
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
              {exams.filter(exam => exam.roomIds.includes(room.id)).length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Scheduled Exams:</p>
                  {exams.filter(exam => exam.roomIds.includes(room.id)).map(exam => (
                    <div key={exam.id} className="text-sm text-gray-600 mt-1">
                      <p>{exam.courseName}</p>
                      <p>{format(new Date(exam.date), 'MMM dd, yyyy')}</p>
                      <p>{exam.startTime} - {exam.endTime}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-300 transition-colors">
                Schedule
              </button>
              <button 
                onClick={() => setEditingRoom(room)}
                className="flex-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-300 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModals = () => (
    <>
      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Student</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newStudent: StudentData = {
                id: Date.now().toString(),
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                class: formData.get('class') as string,
                rollNumber: formData.get('rollNumber') as string,
                attendance: Number(formData.get('attendance')),
                performanceData: []
              };
              handleAddStudent(newStudent);
            }}>
              <input name="name" placeholder="Name" className="input-field" required />
              <input name="email" type="email" placeholder="Email" className="input-field" required />
              <input name="class" placeholder="Class" className="input-field" required />
              <input name="rollNumber" placeholder="Roll Number" className="input-field" required />
              <input name="attendance" type="number" placeholder="Attendance %" className="input-field" required />
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddStudent(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Student</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedStudent: StudentData = {
                ...editingStudent,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                class: formData.get('class') as string,
                rollNumber: formData.get('rollNumber') as string,
                attendance: Number(formData.get('attendance'))
              };
              handleEditStudent(updatedStudent);
            }}>
              <input name="name" defaultValue={editingStudent.name} className="input-field" required />
              <input name="email" type="email" defaultValue={editingStudent.email} className="input-field" required />
              <input name="class" defaultValue={editingStudent.class} className="input-field" required />
              <input name="rollNumber" defaultValue={editingStudent.rollNumber} className="input-field" required />
              <input 
                name="attendance" 
                type="number" 
                defaultValue={editingStudent.attendance} 
                className="input-field" 
                required 
              />
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Teacher</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newTeacher: TeacherData = {
                id: Date.now().toString(),
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                department: formData.get('department') as string,
                subjects: (formData.get('subjects') as string).split(',').map(s => s.trim()),
                joinDate: new Date().toISOString()
              };
              handleAddTeacher(newTeacher);
            }}>
              <input name="name" placeholder="Name" className="input-field" required />
              <input name="email" type="email" placeholder="Email" className="input-field" required />
              <input name="department" placeholder="Department" className="input-field" required />
              <input 
                name="subjects" 
                placeholder="Subjects (comma separated)" 
                className="input-field" 
                required 
              />
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddTeacher(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Teacher</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedTeacher: TeacherData = {
                ...editingTeacher,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                department: formData.get('department') as string,
                subjects: (formData.get('subjects') as string).split(',').map(s => s.trim())
              };
              handleEditTeacher(updatedTeacher);
            }}>
              <input name="name" defaultValue={editingTeacher.name} className="input-field" required />
              <input name="email" defaultValue={editingTeacher.email} className="input-field" required />
              <input 
                name="department" 
                defaultValue={editingTeacher.department} 
                className="input-field" 
                required 
              />
              <input 
                name="subjects" 
                defaultValue={editingTeacher.subjects.join(', ')} 
                className="input-field" 
                required 
              />
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Exam Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Exam Room</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newRoom: ExamRoom = {
                id: Date.now().toString(),
                roomNumber: formData.get('roomNumber') as string,
                capacity: Number(formData.get('capacity')),
                floor: formData.get('floor') as string,
                building: formData.get('building') as string,
                status: formData.get('status') as 'available' | 'occupied' | 'under-maintenance'
              };
              handleAddExamRoom(newRoom);
            }}>
              <input name="roomNumber" placeholder="Room Number" className="input-field" required />
              <input 
                name="capacity" 
                type="number" 
                placeholder="Capacity" 
                className="input-field" 
                required 
              />
              <input name="floor" placeholder="Floor" className="input-field" required />
              <input name="building" placeholder="Building" className="input-field" required />
              <select name="status" className="input-field" required>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="under-maintenance">Under Maintenance</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddRoom(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Exam Room Modal */}
      {editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Exam Room</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedRoom: ExamRoom = {
                ...editingRoom,
                roomNumber: formData.get('roomNumber') as string,
                capacity: Number(formData.get('capacity')),
                floor: formData.get('floor') as string,
                building: formData.get('building') as string,
                status: formData.get('status') as 'available' | 'occupied' | 'under-maintenance'
              };
              handleEditExamRoom(updatedRoom);
            }}>
              <input 
                name="roomNumber" 
                defaultValue={editingRoom.roomNumber} 
                className="input-field" 
                required 
              />
              <input 
                name="capacity" 
                type="number" 
                defaultValue={editingRoom.capacity} 
                className="input-field" 
                required 
              />
              <input 
                name="floor" 
                defaultValue={editingRoom.floor} 
                className="input-field" 
                required 
              />
              <input 
                name="building" 
                defaultValue={editingRoom.building} 
                className="input-field" 
                required 
              />
              <select 
                name="status" 
                defaultValue={editingRoom.status} 
                className="input-field" 
                required
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="under-maintenance">Under Maintenance</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Exam Modal */}
      {showScheduleExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Schedule New Exam</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newExam: ExamSchedule = {
                id: Date.now().toString(),
                courseName: formData.get('courseName') as string,
                date: formData.get('date') as string,
                startTime: formData.get('startTime') as string,
                endTime: formData.get('endTime') as string,
                roomIds: Array.from(formData.getAll('rooms')).map(String)
              };
              handleScheduleExam(newExam);
            }}>
              <input name="courseName" placeholder="Course Name" className="input-field" required />
              <input name="date" type="date" className="input-field" required />
              <div className="flex gap-2">
                <input name="startTime" type="time" className="input-field flex-1" required />
                <input name="endTime" type="time" className="input-field flex-1" required />
              </div>
              <div className="mt-2">
                <h4 className="font-medium mb-2">Select Rooms:</h4>
                {examRooms.map(room => (
                  <label key={room.id} className="flex items-center space-x-2 mb-2">
                    <input 
                      type="checkbox" 
                      name="rooms" 
                      value={room.id} 
                      className="form-checkbox text-primary-600"
                    />
                    <span>{room.roomNumber} ({room.building})</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowScheduleExam(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Schedule Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'students': return renderStudents();
      case 'teachers': return renderTeachers();
      case 'examRooms': return renderExamRooms();
      default: return null;
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
        {renderModals()}
      </main>
    </div>
  );
};

export default AdminDashboard;