'use client';

import { apiFetch } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
// Types
interface ExamResult {
  exam_id: number;
  exam_name: string;
  total_mark: number;
  student_mark: number;
  class_name: string;
  teacher_name: string;
  exam_date: string;
}

interface AttendanceMonth {
  days: {
    [date: string]: string;
  };
  totals: {
    present: number;
    absent: number;
    leave: number;
    attendance_rate: string;
  };
}

interface Student {
  id: number;
  name: string;
  attendance_report: {
    [month: string]: AttendanceMonth;
  };
  exam_results: ExamResult[];
}

interface ClassData {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
  students: Student[];
}

// Attendance Report Component
function AttendanceReport({ report }: { report: Student['attendance_report'] }) {
  return (
    <div className="mt-6">
      <h4 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">
        📊 Attendance Report
      </h4>
      {Object.entries(report).map(([month, data]) => (
        <div key={month} className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100">
          <h5 className="font-semibold text-green-700 text-lg mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            {month}
          </h5>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">{data.totals.present}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-500">{data.totals.absent}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
              <p className="text-sm text-gray-600 mb-1">Leave</p>
              <p className="text-2xl font-bold text-blue-500">{data.totals.leave}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500">
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-emerald-600">{data.totals.attendance_rate}</p>
            </div>
          </div>

          {/* Daily Details */}
          <div className="mt-4">
        <strong><h6 className="font-bold  text-gray-700 mb-3 text-sm uppercase tracking-wide">Daily Details:</h6></strong>
            <div className="flex flex-wrap gap-3">
              {Object.entries(data.days).map(([date, status]) => (
                <div
                  key={date}
                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all hover:scale-105 ${
                    status === 'present'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : status === 'absent'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  📅 {new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}: 
                  <span className={`ml-1 ${
                    status === 'present' ? 'text-green-600' : 
                    status === 'absent' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Exam Results Component
function ExamResults({ exams }: { exams: ExamResult[] }) {
  if (exams.length === 0) {
    return (
      <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-center">
          <span className="text-amber-500 text-xl mr-3">📝</span>
          <p className="text-amber-700 font-medium">No exam results available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">
        🎯 Exam Results
      </h4>
      <div className="grid gap-4">
        {exams.map((exam) => {
          const percentage = (exam.student_mark / exam.total_mark) * 100;
          const isPassing = percentage >= 50;
          const progressColor = isPassing ? 'bg-green-500' : 'bg-red-500';
          
          return (
            <div key={exam.exam_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 text-lg mb-2">{exam.exam_name}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">👨‍🏫</span>
                      Teacher: {exam.teacher_name}
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">📅</span>
                      Date: {new Date(exam.exam_date).toLocaleDateString('en-US')}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 lg:mt-0 lg:text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold ${
                    isPassing ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isPassing ? '✅ Pass' : '❌ Fail'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Score: {exam.student_mark}/{exam.total_mark}</span>
                  <span className="font-semibold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Student Card Component
function StudentCard({ student }: { student: Student }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="mr-3">👤</span>
          {student.name}
          <span className="ml-auto bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            ID: {student.id}
          </span>
        </h3>
      </div>
      
      <div className="p-6">
        <AttendanceReport report={student.attendance_report} />
        <ExamResults exams={student.exam_results} />
      </div>
    </div>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <span className="ml-4 text-green-600 font-medium">Loading class data...</span>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h2>
          <p className="text-red-600">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function ClassPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClassData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiFetch(`/classe/${id}`);
        setClassData(response.data);
      } catch (err) {
        console.error('Error fetching class data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load class data');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchClassData();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!classData) {
    return <ErrorMessage message="Class not found" />;
  }

  return (
    <MainLayout>  <div className="min-h-screen  via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🏫</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
                  <p className="text-green-600 font-medium">{classData.school_name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-green-600 mr-2">👥</span>
                  <span className="font-semibold text-gray-700">{classData.count} Students</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-green-600 mr-2">🆔</span>
                  <span className="font-semibold text-gray-700">Class ID: {classData.id}</span>
                </div>
                <div className={`flex items-center px-4 py-2 rounded-lg ${
                  classData.active ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <span className={`mr-2 ${classData.active ? 'text-green-600' : 'text-red-600'}`}>
                    {classData.active ? '✅' : '❌'}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {classData.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:text-right">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="text-sm opacity-90">School ID</p>
                <p className="text-2xl font-bold">{classData.school_id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Students List</h2>
            <span className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {classData.students.length} students
            </span>
          </div>
          
          <div className="grid gap-6">
            {classData.students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-4">🎉</span>
            <div>
              <h3 className="text-xl font-bold">Data Loaded Successfully!</h3>
              <p className="opacity-90">Class information has been successfully retrieved and displayed.</p>
            </div>
          </div>
        </div>

      </div>
    </div></MainLayout>
  
  );
}