// app/students/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  School, 
  Phone,
  Briefcase,
  Award,
  ClipboardCheck,
  Users
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

interface Parent {
  name: string;
  phone: string;
  job: string;
}

interface Reception {
  id: number;
  name: string;
  email: string;
}

interface StudentData {
  id: number;
  name: string;
  age: number;
  email: string;
  education_stage: string;
  previous_school: string;
  term: string;
  school_id: number;
  school: {
    id: number;
    name: string;
  };
  classroom: string;
  father: Parent;
  mother: Parent;
  reception: Reception;
  payments: unknown[];
  active: boolean;
  created_at: string;
  attendance_report: {
    [month: string]: AttendanceMonth;
  };
  exam_results: ExamResult[];
}

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const studentId = params.id as string;

  const translations = {
    en: {
      backToClasses: 'Back to Classes',
      studentProfile: 'Student Profile',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      parentsInfo: 'Parents Information',
      academicInfo: 'Academic Information',
      attendanceReport: 'Attendance Report',
      examResults: 'Exam Results',
      age: 'Age',
      email: 'Email',
      educationStage: 'Education Stage',
      previousSchool: 'Previous School',
      term: 'Term',
      school: 'School',
      class: 'Class',
      reception: 'Reception',
      father: 'Father',
      mother: 'Mother',
      phone: 'Phone',
      job: 'Job',
      present: 'Present',
      absent: 'Absent',
      leave: 'Leave',
      attendanceRate: 'Attendance Rate',
      recentAttendance: 'Recent Attendance',
      noAttendance: 'No attendance records',
      examName: 'Exam Name',
      totalMark: 'Total Mark',
      studentMark: 'Student Mark',
      percentage: 'Percentage',
      teacher: 'Teacher',
      examDate: 'Exam Date',
      status: 'Status',
      pass: 'Pass',
      fail: 'Fail',
      noExams: 'No exam results',
      loading: 'Loading student profile...',
      error: 'Error loading student profile'
    },
    ar: {
      backToClasses: 'العودة إلى الفصول',
      studentProfile: 'ملف الطالب',
      personalInfo: 'المعلومات الشخصية',
      contactInfo: 'معلومات الاتصال',
      parentsInfo: 'معلومات الوالدين',
      academicInfo: 'المعلومات الأكاديمية',
      attendanceReport: 'تقرير الحضور',
      examResults: 'نتائج الامتحانات',
      age: 'العمر',
      email: 'البريد الإلكتروني',
      educationStage: 'المرحلة التعليمية',
      previousSchool: 'المدرسة السابقة',
      term: 'الفصل الدراسي',
      school: 'المدرسة',
      class: 'الفصل',
      reception: 'الاستقبال',
      father: 'الأب',
      mother: 'الأم',
      phone: 'الهاتف',
      job: 'الوظيفة',
      present: 'حاضر',
      absent: 'غائب',
      leave: 'إجازة',
      attendanceRate: 'معدل الحضور',
      recentAttendance: 'الحضور الحديث',
      noAttendance: 'لا توجد سجلات حضور',
      examName: 'اسم الامتحان',
      totalMark: 'الدرجة الكلية',
      studentMark: 'درجة الطالب',
      percentage: 'النسبة المئوية',
      teacher: 'المعلم',
      examDate: 'تاريخ الامتحان',
      status: 'الحالة',
      pass: 'ناجح',
      fail: 'راسب',
      noExams: 'لا توجد نتائج امتحانات',
      loading: 'جاري تحميل ملف الطالب...',
      error: 'خطأ في تحميل ملف الطالب'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/student/${studentId}`);
        setStudent(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-green-600 font-medium">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium">{t.error}</div>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => router.push('/students')}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {t.backToClasses}
          </button>
        </div>
      </div>
    );
  }

  const latestMonth = Object.keys(student.attendance_report)[0];
  const attendanceData = latestMonth ? student.attendance_report[latestMonth] : null;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/students')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.backToClasses}
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t.studentProfile}</h1>
                <p className="text-green-600 font-medium">{student.name}</p>
              </div>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                {t.personalInfo}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.age}</span>
                  <span className="font-semibold text-gray-900">{student.age}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.email}</span>
                  <span className="font-semibold text-gray-900">{student.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.educationStage}</span>
                  <span className="font-semibold text-gray-900">{student.education_stage}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{t.previousSchool}</span>
                  <span className="font-semibold text-gray-900">{student.previous_school}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                {t.contactInfo}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.school}</span>
                  <span className="font-semibold text-gray-900">{student.school.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t.class}</span>
                  <span className="font-semibold text-gray-900">{student.classroom}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{t.reception}</span>
                  <span className="font-semibold text-gray-900">{student.reception.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Parents, Academic, Attendance & Exams */}
          <div className="lg:col-span-2 space-y-6">
            {/* Parents Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                {t.parentsInfo}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    {t.father}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t.phone}:</span>
                      <span className="font-semibold">{student.father.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t.job}:</span>
                      <span className="font-semibold">{student.father.job}</span>
                    </div>
                  </div>
                </div>
                {/* Mother */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-pink-500" />
                    {t.mother}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t.phone}:</span>
                      <span className="font-semibold">{student.mother.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t.job}:</span>
                      <span className="font-semibold">{student.mother.job}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                {t.academicInfo}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.keys(student.attendance_report).length}
                  </div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Months' : 'شهور'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {student.exam_results.length}
                  </div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Exams' : 'امتحانات'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {student.term}
                  </div>
                  <div className="text-sm text-gray-600">{t.term}</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${student.active ? 'text-emerald-600' : 'text-red-600'}`}>
                    {student.active ? (language === 'en' ? 'Active' : 'نشط') : (language === 'en' ? 'Inactive' : 'غير نشط')}
                  </div>
                  <div className="text-sm text-gray-600">{t.status}</div>
                </div>
              </div>
            </div>

            {/* Attendance Report */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-green-500" />
                {t.attendanceReport}
              </h2>
              
              {attendanceData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p>{t.noAttendance}</p>
                </div>
              )}
            </div>

            {/* Exam Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                {t.examResults}
              </h2>
              
              {student.exam_results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.examName}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.totalMark}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.studentMark}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.percentage}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.teacher}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.examDate}
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-purple-700 bg-purple-100">
                          {t.status}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.exam_results.map((exam, index) => {
                        const percentage = (exam.student_mark / exam.total_mark) * 100;
                        const isPassing = percentage >= 50;

                        return (
                          <tr key={exam.exam_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                              {exam.exam_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-center font-semibold text-gray-700">
                              {exam.total_mark}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-center font-semibold">
                              <span className={isPassing ? 'text-green-600' : 'text-red-600'}>
                                {exam.student_mark}
                              </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                              <span className="font-semibold text-blue-600">
                                {percentage.toFixed(1)}%
                              </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                              {exam.teacher_name}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                              {new Date(exam.exam_date).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-sm text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isPassing 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-red-100 text-red-800 border border-red-200'
                              }`}>
                                {isPassing ? t.pass : t.fail}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p>{t.noExams}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}