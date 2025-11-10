'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  School, 
  Eye,
  BookOpen,
  Building,
  X,
  Calendar,
  FileText,
  Award,
  ClipboardCheck,
  Languages
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface ClassItem {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
  students: Student[];
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

interface ApiResponse {
  data: ClassItem[];
  meta: PaginationMeta;
  message: string;
  result: string;
}

interface Filters {
  search?: string;
  orderBy: string;
  orderByDirection: 'asc' | 'desc';
  perPage: number;
  paginate: boolean;
  page?: number;
}

// Student Details Modal Component
function StudentDetailsModal({ 
  student, 
  isOpen, 
  onClose 
}: { 
  student: Student; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const { language, setLanguage } = useLanguage();

  const translations = {
    en: {
      title: 'Student Details',
      studentId: 'Student ID',
      attendanceReport: 'Attendance Report',
      present: 'Present',
      absent: 'Absent',
      leave: 'Leave',
      attendanceRate: 'Attendance Rate',
      recentAttendance: 'Recent Attendance',
      noAttendance: 'No attendance records available',
      examResults: 'Exam Results',
      score: 'Score',
      percentage: 'Percentage',
      teacher: 'Teacher',
      pass: 'Pass',
      fail: 'Fail',
      noExams: 'No exam results available'
    },
    ar: {
      title: 'تفاصيل الطالب',
      studentId: 'رقم الطالب',
      attendanceReport: 'تقرير الحضور',
      present: 'حاضر',
      absent: 'غائب',
      leave: 'إجازة',
      attendanceRate: 'معدل الحضور',
      recentAttendance: 'الحضور الحديث',
      noAttendance: 'لا توجد سجلات حضور متاحة',
      examResults: 'نتائج الامتحانات',
      score: 'الدرجة',
      percentage: 'النسبة المئوية',
      teacher: 'المعلم',
      pass: 'ناجح',
      fail: 'راسب',
      noExams: 'لا توجد نتائج امتحانات متاحة'
    }
  };

  const t = translations[language];

  if (!isOpen) return null;

  const latestMonth = Object.keys(student.attendance_report)[0];
  const attendanceData = latestMonth ? student.attendance_report[latestMonth] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{student.name}</h2>
                <p className="text-green-100">{t.studentId}: {student.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Attendance Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-green-500" />
              {t.attendanceReport}
            </h3>
            
            {attendanceData ? (
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{attendanceData.totals.present}</div>
                    <div className="text-sm text-gray-600">{t.present}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{attendanceData.totals.absent}</div>
                    <div className="text-sm text-gray-600">{t.absent}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{attendanceData.totals.leave}</div>
                    <div className="text-sm text-gray-600">{t.leave}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{attendanceData.totals.attendance_rate}</div>
                    <div className="text-sm text-gray-600">{t.attendanceRate}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{t.recentAttendance}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(attendanceData.days).slice(0, 10).map(([date, status]) => (
                      <div
                        key={date}
                        className={`px-3 py-1 rounded-full text-sm ${
                          status === 'present'
                            ? 'bg-green-100 text-green-700'
                            : status === 'absent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {new Date(date).toLocaleDateString()} - {status === 'present' ? t.present : status === 'absent' ? t.absent : t.leave}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 text-center">
                <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-yellow-700">{t.noAttendance}</p>
              </div>
            )}
          </div>

          {/* Exam Results Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              {t.examResults}
            </h3>
            
            {student.exam_results.length > 0 ? (
              <div className="space-y-4">
                {student.exam_results.map((exam) => {
                  const percentage = (exam.student_mark / exam.total_mark) * 100;
                  const isPassing = percentage >= 50;
                  
                  return (
                    <div key={exam.exam_id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{exam.exam_name}</h4>
                          <p className="text-sm text-gray-600">{t.teacher}: {exam.teacher_name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isPassing ? t.pass : t.fail}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t.score}:</span>
                          <span className="font-semibold">{exam.student_mark}/{exam.total_mark}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isPassing ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{t.percentage}:</span>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-700">{t.noExams}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Class Details Modal Component
function ClassDetailsModal({ 
  classItem, 
  isOpen, 
  onClose 
}: { 
  classItem: ClassItem; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const { language, setLanguage } = useLanguage();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentModalOpen, setStudentModalOpen] = useState(false);

  const translations = {
    en: {
      studentsInClass: 'Students in Class',
      totalStudents: 'Total Students',
      withAttendance: 'With Attendance',
      withExams: 'With Exams',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      attendance: 'Attendance',
      exams: 'Exams',
      id: 'ID'
    },
    ar: {
      studentsInClass: 'الطلاب في الفصل',
      totalStudents: 'إجمالي الطلاب',
      withAttendance: 'بسجلات حضور',
      withExams: 'بنتائج امتحانات',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      attendance: 'الحضور',
      exams: 'الامتحانات',
      id: 'الرقم'
    }
  };

  const t = translations[language];

  if (!isOpen) return null;

  const openStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setStudentModalOpen(true);
  };

  const closeStudentDetails = () => {
    setStudentModalOpen(false);
    setSelectedStudent(null);
  };

  // Calculate class statistics
  const totalStudents = classItem.students.length;
  const studentsWithAttendance = classItem.students.filter(s => 
    Object.keys(s.attendance_report).length > 0
  ).length;
  const studentsWithExams = classItem.students.filter(s => 
    s.exam_results.length > 0
  ).length;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{classItem.name}</h2>
                  <p className="text-green-100">
                    {classItem.count} {t.studentsInClass} • {classItem.school_name}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Class Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
                <div className="text-sm text-gray-600">{t.totalStudents}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                <ClipboardCheck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{studentsWithAttendance}</div>
                <div className="text-sm text-gray-600">{t.withAttendance}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{studentsWithExams}</div>
                <div className="text-sm text-gray-600">{t.withExams}</div>
              </div>
              <div className={`p-4 rounded-xl border text-center ${
                classItem.active 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  classItem.active ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className={`text-2xl font-bold ${
                  classItem.active ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {classItem.active ? t.active : t.inactive}
                </div>
                <div className="text-sm text-gray-600">{t.status}</div>
              </div>
            </div>

            {/* Students List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.studentsInClass}</h3>
              <div className="grid gap-4">
                {classItem.students.map((student) => {
                  const latestMonth = Object.keys(student.attendance_report)[0];
                  const attendanceData = latestMonth ? student.attendance_report[latestMonth] : null;
                  const hasExams = student.exam_results.length > 0;

                  return (
                    <div 
                      key={student.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => openStudentDetails(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">{t.id}: {student.id}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {/* Attendance Badge */}
                          <div className="text-center">
                            <div className={`text-sm font-semibold ${
                              attendanceData ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              {attendanceData ? attendanceData.totals.attendance_rate : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">{t.attendance}</div>
                          </div>
                          
                          {/* Exams Badge */}
                          <div className="text-center">
                            <div className={`text-sm font-semibold ${
                              hasExams ? 'text-purple-600' : 'text-gray-400'
                            }`}>
                              {hasExams ? student.exam_results.length : '0'}
                            </div>
                            <div className="text-xs text-gray-500">{t.exams}</div>
                          </div>
                          
                          <ChevronUp className="w-5 h-5 text-gray-400 transform -rotate-90" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          isOpen={studentModalOpen}
          onClose={closeStudentDetails}
        />
      )}
    </>
  );
}

export default function ClassesView() {
  const { language, setLanguage } = useLanguage();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState<Filters>({
    orderBy: 'id',
    orderByDirection: 'asc',
    perPage: 5,
    paginate: true
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [classModalOpen, setClassModalOpen] = useState(false);

  // Translations
  const translations = {
    en: {
      title: 'Classes Overview',
      subtitle: 'View all classes and student information',
      totalClasses: 'Total Classes',
      totalStudents: 'Total Students',
      activeClasses: 'Active Classes',
      schools: 'Schools',
      searchPlaceholder: 'Search classes by name, school...',
      viewOptions: 'View Options',
      itemsPerPage: 'Items Per Page',
      sortBy: 'Sort By',
      order: 'Order',
      ascending: 'Ascending',
      descending: 'Descending',
      classInformation: 'Class Information',
      students: 'Students',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'View Details',
      loading: 'Loading classes...',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      classes: 'classes',
      page: 'Page',
      ofPage: 'of',
      previous: 'Previous',
      next: 'Next',
      withAttendance: 'with attendance',
      active: 'Active',
      inactive: 'Inactive',
      id: 'ID',
      className: 'Class Name',
      studentCount: 'Student Count',
      schoolName: 'School Name'
    },
    ar: {
      title: 'نظرة عامة على الفصول',
      subtitle: 'عرض جميع الفصول ومعلومات الطلاب',
      totalClasses: 'إجمالي الفصول',
      totalStudents: 'إجمالي الطلاب',
      activeClasses: 'الفصول النشطة',
      schools: 'المدارس',
      searchPlaceholder: 'ابحث في الفصول بالاسم، المدرسة...',
      viewOptions: 'خيارات العرض',
      itemsPerPage: 'عناصر في الصفحة',
      sortBy: 'ترتيب حسب',
      order: 'الاتجاه',
      ascending: 'تصاعدي',
      descending: 'تنازلي',
      classInformation: 'معلومات الفصل',
      students: 'الطلاب',
      status: 'الحالة',
      actions: 'الإجراءات',
      viewDetails: 'عرض التفاصيل',
      loading: 'جاري تحميل الفصول...',
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      classes: 'فصل',
      page: 'صفحة',
      ofPage: 'من',
      previous: 'السابق',
      next: 'التالي',
      withAttendance: 'بسجلات حضور',
      active: 'نشط',
      inactive: 'غير نشط',
      id: 'الرقم',
      className: 'اسم الفصل',
      studentCount: 'عدد الطلاب',
      schoolName: 'اسم المدرسة'
    }
  };

  const t = translations[language];

  // Fetch classes data
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await apiFetch('/list/classes/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters)
      });
      
      setClasses(response.data);
      setPagination(response.meta);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [filters]);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1
    }));
  };

  // Handle sort
  const handleSort = (field: string) => {
    setFilters(prev => ({
      ...prev,
      orderBy: field,
      orderByDirection: prev.orderBy === field && prev.orderByDirection === 'asc' ? 'desc' : 'asc',
      page: 1
    }));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Handle per page change
  const handlePerPageChange = (perPage: number) => {
    setFilters(prev => ({ 
      ...prev, 
      perPage,
      page: 1
    }));
  };

  // Open class details modal
  const openClassDetails = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setClassModalOpen(true);
  };

  // Close class details modal
  const closeClassDetails = () => {
    setClassModalOpen(false);
    setSelectedClass(null);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Calculate statistics
  const totalStudents = classes.reduce((sum, classItem) => sum + parseInt(classItem.count), 0);
  const activeClasses = classes.filter(classItem => classItem.active).length;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (!pagination) return [];
    
    const pages = [];
    const current = pagination.current_page;
    const last = pagination.last_page;
    
    pages.push(1);
    
    for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
      if (i > 1 && i < last) {
        pages.push(i);
      }
    }
    
    if (last > 1) {
      pages.push(last);
    }
    
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
                  <p className="text-green-600 font-medium">{t.subtitle}</p>
                </div>
                
                {/* Language Toggle Button */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Languages className="w-5 h-5" />
                  <span>{language === 'en' ? 'العربية' : 'English'}</span>
                </button>
              </div>
              
              {/* Statistics Cards */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-green-50 px-6 py-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <School className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.totalClasses}</p>
                      <p className="text-2xl font-bold text-green-600">{pagination?.total || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 px-6 py-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.totalStudents}</p>
                      <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 px-6 py-4 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.activeClasses}</p>
                      <p className="text-2xl font-bold text-emerald-600">{activeClasses}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t.schools}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {[...new Set(classes.map(c => c.school_id))].length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Box */}
            <div className="flex-1 relative">
              <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl border border-green-200 hover:bg-green-100 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>{t.viewOptions}</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.itemsPerPage}</label>
                  <select
                    value={filters.perPage}
                    onChange={(e) => handlePerPageChange(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.sortBy}</label>
                  <select
                    value={filters.orderBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, orderBy: e.target.value, page: 1 }))}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="id">{t.id}</option>
                    <option value="name">{t.className}</option>
                    <option value="count">{t.studentCount}</option>
                    <option value="school_name">{t.schoolName}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.order}</label>
                  <select
                    value={filters.orderByDirection}
                    onChange={(e) => setFilters(prev => ({ ...prev, orderByDirection: e.target.value as 'asc' | 'desc', page: 1 }))}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="asc">{t.ascending}</option>
                    <option value="desc">{t.descending}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Classes Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <span className="ml-4 text-green-600 font-medium">{t.loading}</span>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.classInformation}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.students}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.status}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classes.map((classItem) => (
                      <tr key={classItem.id} className="hover:bg-green-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{classItem.name}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {classItem.school_name}
                              </div>
                              <div className="text-xs text-gray-500">{t.id}: {classItem.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-blue-600">{classItem.count}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{classItem.count} {t.students}</div>
                              <div className="text-xs text-gray-500">
                                {classItem.students.filter(s => Object.keys(s.attendance_report).length > 0).length} {t.withAttendance}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            classItem.active 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              classItem.active ? 'bg-green-500' : 'bg-red-500'
                            }`}></span>
                            {classItem.active ? t.active : t.inactive}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => openClassDetails(classItem)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            {t.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && pagination.last_page > 1 && (
                <div className="bg-green-50 px-6 py-4 border-t border-green-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="text-sm text-gray-700">
                      {t.showing} <span className="font-semibold text-green-600">{pagination.from}</span> {t.to}{' '}
                      <span className="font-semibold text-green-600">{pagination.to}</span> {t.of}{' '}
                      <span className="font-semibold text-green-600">{pagination.total}</span> {t.classes}
                      <span className="text-gray-500 ml-2">
                        ({t.page} {pagination.current_page} {t.ofPage} {pagination.last_page})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          pagination.current_page === 1
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500'
                        }`}
                      >
                        <ChevronUp className={`w-4 h-4 ${language === 'ar' ? '-rotate-90' : 'rotate-90'}`} />
                        {t.previous}
                      </button>

                      {getPageNumbers().map((pageNumber, index, array) => {
                        const showEllipsis = index > 0 && pageNumber - array[index - 1] > 1;
                        
                        return (
                          <div key={pageNumber} className="flex items-center">
                            {showEllipsis && (
                              <span className="px-2 text-gray-500">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(pageNumber)}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                pageNumber === pagination.current_page
                                  ? 'bg-green-500 text-white border-green-500 shadow-sm'
                                  : 'bg-white text-gray-700 border-green-200 hover:bg-green-50 hover:text-green-700'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          </div>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          pagination.current_page === pagination.last_page
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500'
                        }`}
                      >
                        {t.next}
                        <ChevronUp className={`w-4 h-4 ${language === 'ar' ? 'rotate-90' : '-rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <ClassDetailsModal
          classItem={selectedClass}
          isOpen={classModalOpen}
          onClose={closeClassDetails}
        />
      )}
    </div>
  );
}