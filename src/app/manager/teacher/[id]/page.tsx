// app/teachers/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  BookOpen, 
  Calendar, 
  School, 
  User, 
  Clock, 
  Edit, 
  GraduationCap,
  Award,
  ClipboardCheck,
  DollarSign,
  Eye,
  Languages
} from 'lucide-react';
import Link from 'next/link';
import MainLayout from "@/components/MainLayout";
import { apiFetch } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

interface Student {
  id: number;
  name: string;
  attendance_report: unknown[];
  exam_results: ExamResult[];
}

interface ExamResult {
  exam_id: number;
  exam_name: string;
  course: string;
  total_mark: number;
  student_mark: number;
  class_name: string;
  teacher_name: string;
  exam_date: string;
}

interface Class {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
  students: Student[];
  created_at: string;
  updated_at: string;
}

interface School {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  active: boolean;
  logo: string;
  manager_name: string;
  manager_email: string;
  created_at: string;
  updated_at: string;
}

interface Exam {
  id: number;
  exam_name: string;
  total_mark: number;
  class: string;
  results: {
    student_id: number;
    student_name: string;
    mark: number;
    total_mark: number;
  }[];
}

interface Attendance {
  date: string;
  status: string;
  marked_by: string;
}

interface Salary {
  month: string;
  base_salary: string;
  bonus: string;
  deduction: string;
  final_salary: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  school_id: number;
  active: boolean;
  avatar: string | null;
  school: School;
  classes: Class[];
  created_at: string;
  updated_at: string;
  exams: Exam[];
  attendances: Attendance[];
  salaries: Salary[];
}

export default function TeacherShowPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);

  const teacherId = params.id;

  // الترجمات
  const translations = {
    en: {
      backToTeachers: 'Back to Teachers',
      teacherDetails: 'Teacher Details',
      completeInfo: 'Complete information about the teacher',
      editTeacher: 'Edit Teacher',
      active: 'Active',
      inactive: 'Inactive',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      address: 'Address',
      role: 'Role',
      schoolInformation: 'School Information',
      assignedClasses: 'Assigned Classes',
      students: 'Students',
      created: 'Created',
      teacherSummary: 'Teacher Summary',
      totalClasses: 'Total Classes',
      memberSince: 'Member Since',
      lastUpdated: 'Last Updated',
      exams: 'Exams',
      examName: 'Exam Name',
      totalMark: 'Total Mark',
      class: 'Class',
      results: 'Results',
      noResults: 'No results',
      attendances: 'Attendances',
      date: 'Date',
      status: 'Status',
      markedBy: 'Marked By',
      noAttendances: 'No attendance records',
      salaries: 'Salaries',
      month: 'Month',
      baseSalary: 'Base Salary',
      bonus: 'Bonus',
      deduction: 'Deduction',
      finalSalary: 'Final Salary',
      noSalaries: 'No salary records',
      viewStudents: 'View Students',
      studentName: 'Student Name',
      attendanceRate: 'Attendance Rate',
      examResults: 'Exam Results',
      noStudents: 'No students in this class',
      close: 'Close',
      loading: 'Loading teacher information...',
      teacherNotFound: 'Teacher Not Found',
      present: 'Present',
      absent: 'Absent',
      leave: 'Leave'
    },
    ar: {
      backToTeachers: 'العودة إلى المدرسين',
      teacherDetails: 'تفاصيل المدرس',
      completeInfo: 'معلومات كاملة عن المدرس',
      editTeacher: 'تعديل المدرس',
      active: 'نشط',
      inactive: 'غير نشط',
      emailAddress: 'البريد الإلكتروني',
      phoneNumber: 'رقم الهاتف',
      address: 'العنوان',
      role: 'الدور',
      schoolInformation: 'معلومات المدرسة',
      assignedClasses: 'الفصول المخصصة',
      students: 'الطلاب',
      created: 'تاريخ الإنشاء',
      teacherSummary: 'ملخص المدرس',
      totalClasses: 'إجمالي الفصول',
      memberSince: 'عضو منذ',
      lastUpdated: 'آخر تحديث',
      exams: 'الامتحانات',
      examName: 'اسم الامتحان',
      totalMark: 'الدرجة الكلية',
      class: 'الفصل',
      results: 'النتائج',
      noResults: 'لا توجد نتائج',
      attendances: 'سجلات الحضور',
      date: 'التاريخ',
      status: 'الحالة',
      markedBy: 'مسجل بواسطة',
      noAttendances: 'لا توجد سجلات حضور',
      salaries: 'الرواتب',
      month: 'الشهر',
      baseSalary: 'الراتب الأساسي',
      bonus: 'المكافأة',
      deduction: 'الخصم',
      finalSalary: 'الراتب النهائي',
      noSalaries: 'لا توجد سجلات رواتب',
      viewStudents: 'عرض الطلاب',
      studentName: 'اسم الطالب',
      attendanceRate: 'معدل الحضور',
      examResults: 'نتائج الامتحانات',
      noStudents: 'لا يوجد طلاب في هذا الفصل',
      close: 'إغلاق',
      loading: 'جاري تحميل معلومات المدرس...',
      teacherNotFound: 'المدرس غير موجود',
      present: 'حاضر',
      absent: 'غائب',
      leave: 'إجازة'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/teacher/${teacherId}`);
        
        if (data && data.data) {
          setTeacher(data.data);
        } else {
          throw new Error('Teacher data not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teacher');
        console.error('Error fetching teacher:', err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const openStudentsModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowStudentsModal(true);
  };

  const closeStudentsModal = () => {
    setShowStudentsModal(false);
    setSelectedClass(null);
  };

  const getAttendanceRate = (student: Student) => {
    const months = Object.values(student.attendance_report);
    if (months.length === 0) return '0%';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const latestMonth = months[0] as any;
    return latestMonth.totals?.attendance_rate || '0%';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t.loading}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !teacher) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.teacherNotFound}</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/manager/teacher/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t.backToTeachers}
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={`min-h-screen bg-gray-50 py-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/manager/teacher/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg border shadow-sm"
              >
                <ArrowLeft size={20} />
                <span>{t.backToTeachers}</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.teacherDetails}</h1>
                <p className="text-gray-600 text-sm">{t.completeInfo}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {/* Language Toggle */}
            
          
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Teacher Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Teacher Basic Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {teacher.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                      <p className="text-gray-600">{language === 'en' ? 'Teacher ID' : 'رقم المدرس'}: TCH{String(teacher.id).padStart(3, '0')}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                    teacher.active 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {teacher.active ? `🟢 ${t.active}` : `🔴 ${t.inactive}`}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">{t.emailAddress}</p>
                        <p className="text-gray-900 font-medium">{teacher.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">{t.phoneNumber}</p>
                        <p className="text-gray-900 font-medium">{teacher.phone || (language === 'en' ? 'Not provided' : 'غير متوفر')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-orange-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">{t.address}</p>
                        <p className="text-gray-900 font-medium">{teacher.address || (language === 'en' ? 'Not provided' : 'غير متوفر')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">{t.role}</p>
                        <p className="text-gray-900 font-medium capitalize">{teacher.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <School className="text-blue-600" size={24} />
                  <span>{t.schoolInformation}</span>
                </h3>
                
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  {teacher.school.logo && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md">
                      <img 
                        src={teacher.school.logo} 
                        alt={teacher.school.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{teacher.school.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.manager_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classes Section */}
              {teacher.classes && teacher.classes.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <BookOpen className="text-green-600" size={24} />
                    <span>{t.assignedClasses} ({teacher.classes.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.classes.map((classItem) => (
                      <div key={classItem.id} className="border-2 border-gray-100 rounded-lg p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 text-lg">{classItem.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            classItem.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {classItem.active ? t.active : t.inactive}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <Users size={14} />
                              <span>{t.students}</span>
                            </span>
                            <span className="text-gray-900 font-medium">{classItem.count}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <School size={14} />
                              <span>{language === 'en' ? 'School' : 'المدرسة'}</span>
                            </span>
                            <span className="text-gray-900 font-medium text-sm">{classItem.school_name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{t.created}</span>
                            </span>
                            <span className="text-gray-900 font-medium text-sm">
                              {new Date(classItem.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => openStudentsModal(classItem)}
                          className="w-full mt-4 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Eye size={16} />
                          <span>{t.viewStudents}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exams Section */}
              {teacher.exams && teacher.exams.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Award className="text-purple-600" size={24} />
                    <span>{t.exams} ({teacher.exams.length})</span>
                  </h3>
                  <div className="space-y-4">
                    {teacher.exams.map((exam) => (
                      <div key={exam.id} className="border-2 border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{exam.exam_name}</h4>
                          <span className="text-sm text-gray-600">{t.totalMark}: {exam.total_mark}</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">{t.class}: {exam.class}</span>
                          <span className="text-sm text-gray-600">{t.results}: {exam.results.length}</span>
                        </div>
                        {exam.results.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-right pb-2">{t.studentName}</th>
                                  <th className="text-center pb-2">{language === 'en' ? 'Mark' : 'الدرجة'}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {exam.results.map((result, index) => (
                                  <tr key={result.student_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-2 pr-4">{result.student_name}</td>
                                    <td className="py-2 text-center">
                                      <span className={`font-semibold ${
                                        result.mark >= exam.total_mark * 0.5 ? 'text-green-600' : 'text-red-600'
                                      }`}>
                                        {result.mark}/{exam.total_mark}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attendances Section */}
              {teacher.attendances && teacher.attendances.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <ClipboardCheck className="text-orange-600" size={24} />
                    <span>{t.attendances} ({teacher.attendances.length})</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right pb-2">{t.date}</th>
                          <th className="text-center pb-2">{t.status}</th>
                          <th className="text-right pb-2">{t.markedBy}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacher.attendances.map((attendance, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="py-2 pr-4">{new Date(attendance.date).toLocaleDateString()}</td>
                            <td className="py-2 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                attendance.status === 'present' 
                                  ? 'bg-green-100 text-green-800'
                                  : attendance.status === 'absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {attendance.status === 'present' ? t.present : 
                                 attendance.status === 'absent' ? t.absent : t.leave}
                              </span>
                            </td>
                            <td className="py-2 pr-4">{attendance.marked_by}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Salaries Section */}
              {teacher.salaries && teacher.salaries.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <DollarSign className="text-green-600" size={24} />
                    <span>{t.salaries} ({teacher.salaries.length})</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right pb-2">{t.month}</th>
                          <th className="text-center pb-2">{t.baseSalary}</th>
                          <th className="text-center pb-2">{t.bonus}</th>
                          <th className="text-center pb-2">{t.deduction}</th>
                          <th className="text-center pb-2">{t.finalSalary}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacher.salaries.map((salary, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="py-2 pr-4">{salary.month}</td>
                            <td className="py-2 text-center">${salary.base_salary}</td>
                            <td className="py-2 text-center text-green-600">+${salary.bonus}</td>
                            <td className="py-2 text-center text-red-600">-${salary.deduction}</td>
                            <td className="py-2 text-center font-semibold">${salary.final_salary}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Summary */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <GraduationCap className="text-blue-600" size={20} />
                  <span>{t.teacherSummary}</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t.status}</span>
                    <span className={`font-medium ${
                      teacher.active ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {teacher.active ? t.active : t.inactive}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t.totalClasses}</span>
                    <span className="text-gray-900 font-bold">{teacher.classes?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t.memberSince}</span>
                    <span className="text-gray-900 text-sm">
                      {new Date(teacher.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{t.lastUpdated}</span>
                    <span className="text-gray-900 text-sm">
                      {new Date(teacher.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{language === 'en' ? 'Quick Stats' : 'إحصائيات سريعة'}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{language === 'en' ? 'Total Exams' : 'إجمالي الامتحانات'}</span>
                    <span className="font-bold text-purple-600">{teacher.exams?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{language === 'en' ? 'Total Students' : 'إجمالي الطلاب'}</span>
                    <span className="font-bold text-blue-600">
                      {teacher.classes?.reduce((total, classItem) => total + parseInt(classItem.count), 0) || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{language === 'en' ? 'Attendance Records' : 'سجلات الحضور'}</span>
                    <span className="font-bold text-orange-600">{teacher.attendances?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{language === 'en' ? 'Salary Records' : 'سجلات الرواتب'}</span>
                    <span className="font-bold text-green-600">{teacher.salaries?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Modal */}
        {showStudentsModal && selectedClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {t.students} - {selectedClass.name}
                  </h3>
                  <button
                    onClick={closeStudentsModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {selectedClass.students && selectedClass.students.length > 0 ? (
                  <div className="space-y-4">
                    {selectedClass.students.map((student) => (
                      <div key={student.id} className="border-2 border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{student.name}</h4>
                          <span className="text-sm text-gray-600">ID: {student.id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{t.attendanceRate}</p>
                            <p className="font-semibold text-green-600">{getAttendanceRate(student)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{t.examResults}</p>
                            <p className="font-semibold text-purple-600">
                              {student.exam_results?.length || 0} {language === 'en' ? 'exams' : 'امتحان'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>{t.noStudents}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeStudentsModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}