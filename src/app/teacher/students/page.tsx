// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Eye, ClipboardList, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApiData } from '@/hook/useApiData';
import { useApiMutation } from '@/hook/useApiMutation';
import { Entity } from '@/types/generic-data-manager';
import toast from 'react-hot-toast'; // ✅ إضافة الـ toaster

// Types (تبقى كما هي)
interface Student {
  id: number;
  name: string;
  attendance_report: unknown[];
  exam_results: unknown[];
}

interface ClassItem extends Entity {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
  students: Student[];
}

interface Exam {
  id: number;
  name: string;
  subject: string;
  date: string;
  exam_name: string;
  total_mark: number;
}

interface AttendanceData {
  [key: number]: string;
}

interface ExamResults {
  [key: number]: number;
}

export default function StudentsPage() {
  const { user } = useAuth();
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
  const [examResults, setExamResults] = useState<ExamResults>({});
  const [selectedExamId, setSelectedExamId] = useState<number>(0);

  // استخدام الـ hook علشان نجيب بيانات الامتحانات
  const {
    data: exams = [],
    isLoading: isLoadingExams,
    error: examsError
  } = useApiData<Exam>('list/exams', {
    paginate: false,
    perPage: 100,
    orderBy: "id",
    orderByDirection: "desc"
  });

  // استخدام الـ hook للإضافة
  const attendanceMutation = useApiMutation('attendance', {
    successMessage: 'Attendance submitted successfully!',
    errorMessage: 'Failed to submit attendance'
  });

  const examResultsMutation = useApiMutation('add/exam-results', {
    successMessage: 'Exam results submitted successfully!',
    errorMessage: 'Failed to submit exam results'
  });

  // تعريف دالة renderActions أولاً
  const renderActions = (item: Entity) => {
    const classItem = item as ClassItem;
    
    return (
      <div className="flex items-center space-x-2">
        {/* View Students */}
        <Link href={`/teacher/students/${classItem.id}`}>
          <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
            <Eye size={16} />
            <span>View</span>
          </button>
        </Link>

        {/* Attendance Action */}
        <button
          onClick={() => handleAttendance(classItem)}
          className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          <ClipboardList size={16} />
          <span>Attendance</span>
        </button>

        {/* Exam Results Action */}
        <button
          onClick={() => handleExamResults(classItem)}
          className="flex items-center space-x-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
        >
          <Award size={16} />
          <span>Results</span>
        </button>
      </div>
    );
  };

  // Set default exam when exams are loaded
  useEffect(() => {
    if (exams.length > 0 && selectedExamId === 0) {
      setSelectedExamId(exams[0].id);
    }
  }, [exams, selectedExamId]);

  // Attendance handler function
  const handleAttendance = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    
    // Initialize attendance data with "present" as default
    const initialAttendance: AttendanceData = {};
    classItem.students?.forEach((student: Student) => {
      initialAttendance[student.id] = "present";
    });
    setAttendanceData(initialAttendance);
    
    setIsAttendanceModalOpen(true);
  };

  // Exam results handler function
  const handleExamResults = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    
    // Initialize exam results with 0 as default
    const initialResults: ExamResults = {};
    classItem.students?.forEach((student: Student) => {
      initialResults[student.id] = 0;
    });
    setExamResults(initialResults);
    
    setIsExamModalOpen(true);
  };

  // Submit attendance using mutation
  const submitAttendance = async () => {
    if (!selectedClass) {
      toast.error('No class selected'); // ✅ Toaster بدل alert
      return;
    }

    const attendancePayload = {
      class_id: selectedClass.id,
      attendances: Object.entries(attendanceData).map(([studentId, status]) => ({
        student_id: parseInt(studentId),
        status: status
      }))
    };

    console.log('🎯 Sending attendance payload:', JSON.stringify(attendancePayload, null, 2));

    attendanceMutation.mutate(attendancePayload, {
      onSuccess: (data) => {
        console.log('✅ Attendance submitted successfully:', data);
        toast.success('Attendance submitted successfully!'); // ✅ Toaster بدل alert
        setIsAttendanceModalOpen(false);
        setSelectedClass(null);
        setAttendanceData({});
        window.location.reload();
      },
      onError: (error) => {
        console.error('❌ Attendance submission error:', error);
        toast.error(`Failed to submit attendance: ${error.message}`); // ✅ Toaster بدل alert
      }
    });
  };

  // Submit exam results using mutation
  const submitExamResults = async () => {
    if (!selectedClass) {
      toast.error('No class selected'); // ✅ Toaster بدل alert
      return;
    }

    if (selectedExamId === 0) {
      toast.error("Please select an exam"); // ✅ Toaster بدل alert
      return;
    }

    const examResultsPayload = {
      exam_id: selectedExamId,
      results: Object.entries(examResults).map(([studentId, mark]) => ({
        student_id: parseInt(studentId),
        mark: mark
      }))
    };

    console.log('🎯 Sending exam results payload:', JSON.stringify(examResultsPayload, null, 2));

    examResultsMutation.mutate(examResultsPayload, {
      onSuccess: (data) => {
        console.log('✅ Exam results submitted successfully:', data);
        toast.success('Exam results submitted successfully!'); // ✅ Toaster بدل alert
        setIsExamModalOpen(false);
        setSelectedClass(null);
        setExamResults({});
        setSelectedExamId(0);
        window.location.reload();
      },
      onError: (error) => {
        console.error('❌ Exam results submission error:', error);
        toast.error(`Failed to submit exam results: ${error.message}`); // ✅ Toaster بدل alert
      }
    });
  };

  // Update attendance status
  const updateAttendanceStatus = (studentId: number, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Update exam mark
  const updateExamMark = (studentId: number, mark: number) => {
    setExamResults(prev => ({
      ...prev,
      [studentId]: mark
    }));
  };

  return (
    <>
      <GenericDataManager
        endpoint="list/classes"
        title="Students Management"
        columns={[
          { 
            key: 'id', 
            label: 'ID', 
            sortable: true,
          },
          { 
            key: 'name', 
            label: 'Class Name', 
            sortable: true,
          },
          { 
            key: 'count', 
            label: 'Student Count', 
            sortable: false,
          },
          { 
            key: 'school_name', 
            label: 'School', 
            sortable: true,
          },
          { 
            key: 'actions', 
            label: 'Actions', 
            sortable: false,
            render: renderActions
          },
        ]}
        
        showAddButton={false}
        showEditButton={false}
        showDeleteButton={false}
        showActiveToggle={false}
        showSearch={false}
        showBulkActions={false}
        showDeletedToggle={false}

        initialData={{
          filters: {},
          orderBy: "id",
          orderByDirection: "asc",
          perPage: 5,
          paginate: true,
          delete: false
        }}
      />

      {/* Attendance Modal */}
      {isAttendanceModalOpen && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Attendance for {selectedClass.name}</h2>
              <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Class ID: {selectedClass.id}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Date: {new Date().toLocaleDateString()}</p>
            
            <div className="flex-1 overflow-y-auto mb-4">
              {selectedClass.students?.length > 0 ? (
                selectedClass.students.map((student: Student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border-b">
                    <div>
                      <span className="font-medium">{student.name}</span>
                      <span className="text-xs text-gray-500 ml-2">ID: {student.id}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateAttendanceStatus(student.id, "present")}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          attendanceData[student.id] === "present" 
                            ? "bg-green-500 text-white border-2 border-green-600" 
                            : "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-green-50"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => updateAttendanceStatus(student.id, "absent")}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          attendanceData[student.id] === "absent" 
                            ? "bg-red-500 text-white border-2 border-red-600" 
                            : "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-red-50"
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No students found in this class.
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4">
              <div className="text-sm text-green-800">
                <strong>Ready to submit:</strong> {Object.keys(attendanceData).length} students | Class ID: {selectedClass.id}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <button
                onClick={() => {
                  setIsAttendanceModalOpen(false);
                  setSelectedClass(null);
                  setAttendanceData({});
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitAttendance}
                disabled={attendanceMutation.isPending || selectedClass.students?.length === 0}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors flex items-center gap-2"
              >
                {attendanceMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Attendance'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Results Modal */}
      {isExamModalOpen && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Exam Results for {selectedClass.name}</h2>
              <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Class ID: {selectedClass.id}
              </div>
            </div>
            
            {/* Exam Selection Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Exam *</label>
              {isLoadingExams ? (
                <div className="text-gray-500">Loading exams...</div>
              ) : examsError ? (
                <div className="text-red-500">Error loading exams</div>
              ) : exams.length === 0 ? (
                <div className="text-yellow-500">No exams available</div>
              ) : (
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Choose an exam...</option>
                  {exams.map((exam: Exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.exam_name || exam.name} - Total: {exam.total_mark} marks
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex-1 overflow-y-auto mb-4">
              {selectedClass.students?.length > 0 ? (
                selectedClass.students.map((student: Student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border-b">
                    <div>
                      <span className="font-medium">{student.name}</span>
                      <span className="text-xs text-gray-500 ml-2">ID: {student.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Mark:</span>
                      <input
                        type="number"
                        value={examResults[student.id] || 0}
                        onChange={(e) => updateExamMark(student.id, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No students found in this class.
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4">
              <div className="text-sm text-green-800">
                <strong>Ready to submit:</strong> {Object.keys(examResults).length} students | Exam ID: {selectedExamId}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <button
                onClick={() => {
                  setIsExamModalOpen(false);
                  setSelectedClass(null);
                  setExamResults({});
                  setSelectedExamId(0);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitExamResults}
                disabled={
                  selectedExamId === 0 || 
                  examResultsMutation.isPending || 
                  selectedClass.students?.length === 0
                }
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors flex items-center gap-2"
              >
                {examResultsMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Results'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}