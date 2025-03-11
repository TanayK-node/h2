import React, { useState } from 'react';
import { User, TimeSlot, Assignment, Test, StudentSubmission } from '../../types';
import { ClipboardCheck as ChalkboardTeacher, LogOut, Calendar, GraduationCap, ClipboardList, Clock, CheckSquare, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('timetable');

  // Mock data
  const timetable: TimeSlot[] = [
    { id: '1', day: 'Monday', time: '09:00 AM', subject: 'Mathematics', class: 'Class X-A', room: 'Room 101' },
    { id: '2', day: 'Monday', time: '11:00 AM', subject: 'Mathematics', class: 'Class X-B', room: 'Room 102' },
    { id: '3', day: 'Tuesday', time: '10:00 AM', subject: 'Mathematics', class: 'Class XI-A', room: 'Room 201' },
    { id: '4', day: 'Wednesday', time: '09:00 AM', subject: 'Mathematics', class: 'Class XI-B', room: 'Room 202' },
  ];

  const assignments: Assignment[] = [
    { 
      id: '1', 
      title: 'Calculus Assignment', 
      subject: 'Mathematics', 
      dueDate: '2024-03-25', 
      status: 'pending',
      submissions: 15,
      description: 'Solve problems on differential equations'
    },
    { 
      id: '2', 
      title: 'Algebra Quiz', 
      subject: 'Mathematics', 
      dueDate: '2024-03-28', 
      status: 'submitted',
      submissions: 20,
      description: 'Complete the quiz on quadratic equations'
    },
  ];

  const tests: Test[] = [
    { 
      id: '1', 
      title: 'Mid-Term Test', 
      subject: 'Mathematics', 
      date: '2024-04-10', 
      duration: '2 hours',
      totalMarks: 50,
      class: 'Class X-A',
      status: 'scheduled'
    },
    { 
      id: '2', 
      title: 'Unit Test', 
      subject: 'Mathematics', 
      date: '2024-03-28', 
      duration: '1 hour',
      totalMarks: 25,
      class: 'Class XI-B',
      status: 'completed'
    },
  ];

  const submissions: StudentSubmission[] = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      assignmentId: '1',
      submissionDate: '2024-03-20',
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      assignmentId: '1',
      submissionDate: '2024-03-21',
      status: 'graded',
      grade: 'A',
      feedback: 'Excellent work on the problems!'
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Assignments</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Assignment
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {assignment.submissions} submissions
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</p>
                    <p className="text-sm text-gray-600">Class: {assignment.subject}</p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                      View Submissions
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200">
                      Grade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tests':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Tests</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule Test
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map((test) => (
                <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.subject} - {test.class}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      test.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      test.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Date: {format(new Date(test.date), 'MMM dd, yyyy')}</p>
                    <p className="text-sm text-gray-600">Duration: {test.duration}</p>
                    <p className="text-sm text-gray-600">Total Marks: {test.totalMarks}</p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                      View Details
                    </button>
                    {test.status === 'completed' && (
                      <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200">
                        Enter Marks
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'submissions':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Submissions</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                        <div className="text-sm text-gray-500">{submission.studentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(submission.submissionDate), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.grade || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        {submission.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-900">Grade</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChalkboardTeacher className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-800">Teacher Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
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
              { id: 'timetable', icon: Clock, label: 'Timetable' },
              { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
              { id: 'tests', icon: FileText, label: 'Tests' },
              { id: 'submissions', icon: CheckSquare, label: 'Submissions' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  activeTab === id
                    ? 'text-blue-600 border-b-2 border-blue-600'
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

export default TeacherDashboard;