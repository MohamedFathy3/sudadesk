// app/exams/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useLanguage } from '@/contexts/LanguageContext';

import { 
  Calendar, 
  FileText, 
  Users, 
  Award, 
  BookOpen,
  ArrowLeft,
  Download,
  Share2,
  BarChart3,
  Clock,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

// Types - مطابقة لـ API response بالضبط
interface ExamDetails {
  id: number;
  exam_name: string;
  total_mark: number;
  class: string;
  course_id: number;
  course: string;
  created_at: string;
}

interface ApiResponse {
  result: string;
  message: string;
  data: ExamDetails;
}

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const id = params.id as string;
  
  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // الترجمات
  const t = {
    // العناوين الرئيسية
    exam_details: language === 'ar' ? 'تفاصيل الامتحان' : 'Exam Details',
    back_to_exams: language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams',
    loading_exam_details: language === 'ar' ? 'جاري تحميل تفاصيل الامتحان...' : 'Loading exam details...',
    
    // رسائل الأخطاء
    error_loading_exam: language === 'ar' ? 'خطأ في تحميل الامتحان' : 'Error Loading Exam',
    exam_not_found: language === 'ar' ? 'الامتحان غير موجود' : 'Exam Not Found',
    exam_not_found_desc: language === 'ar' ? 'الامتحان المطلوب غير موجود' : 'The requested exam could not be found.',
    
    // معلومات الامتحان
    total_marks: language === 'ar' ? 'الدرجة الكلية' : 'Total Marks',
    class: language === 'ar' ? 'الفصل' : 'Class',
    course: language === 'ar' ? 'المادة' : 'Course',
    created_date: language === 'ar' ? 'تاريخ الإنشاء' : 'Created Date',
    
    // الإحصائيات
    exam_statistics: language === 'ar' ? 'إحصائيات الامتحان' : 'Exam Statistics',
    exam_id: language === 'ar' ? 'رقم الامتحان' : 'Exam ID',
    status: language === 'ar' ? 'الحالة' : 'Status',
    completed: language === 'ar' ? 'مكتمل' : 'Completed',
    duration: language === 'ar' ? 'المدة' : 'Duration',
    questions: language === 'ar' ? 'الأسئلة' : 'Questions',
    class_information: language === 'ar' ? 'معلومات الفصل' : 'Class Information',
    class_name: language === 'ar' ? 'اسم الفصل' : 'Class Name',
    students: language === 'ar' ? 'الطلاب' : 'Students',
    participation: language === 'ar' ? 'المشاركة' : 'Participation',
    
    // النشاط الحديث
    recent_activity: language === 'ar' ? 'النشاط الحديث' : 'Recent Activity',
    exam_created: language === 'ar' ? 'تم إنشاء الامتحان' : 'Exam created',
    students_enrolled: language === 'ar' ? 'تم تسجيل الطلاب' : 'Students enrolled',
    results_published: language === 'ar' ? 'تم نشر النتائج' : 'Results published',
    students_added_to_exam: language === 'ar' ? 'طالب مضافين للامتحان' : 'students added to exam',
    all_results_available: language === 'ar' ? 'جميع النتائج متاحة الآن' : 'All results are now available',
    
    // إجراءات
    download_results: language === 'ar' ? 'تحميل النتائج' : 'Download Results',
    share_exam: language === 'ar' ? 'مشاركة الامتحان' : 'Share Exam',
    view_analytics: language === 'ar' ? 'عرض التحليلات' : 'View Analytics',
  };

  // Fetch exam details
  const fetchExamDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiFetch(`/exams/${id}`);
      setExam(response.data);
    } catch (err) {
      console.error('Error fetching exam details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load exam details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExamDetails();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className={`ml-4 text-green-600 font-medium ${language === 'ar' ? 'mr-4 ml-0' : ''}`}>
              {t.loading_exam_details}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-500 text-4xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">{t.error_loading_exam}</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              href="/exams"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back_to_exams}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <div className="text-yellow-500 text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">{t.exam_not_found}</h2>
            <p className="text-yellow-600 mb-6">{t.exam_not_found_desc}</p>
            <Link
              href="/exams"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back_to_exams}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Navigation */}
          <div className="mb-8">
            <Link
              href="/exams"
              className={`inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back_to_exams}
            </Link>
          </div>

          {/* Exam Header Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <h1 className="text-3xl font-bold text-gray-900">{exam.exam_name}</h1>
                    <p className="text-green-600 font-medium">{t.exam_details}</p>
                  </div>
                </div>

                {/* Exam Information Grid - كل البيانات من API */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-600">{t.total_marks}</p>
                        <p className="text-2xl font-bold text-green-600">{exam.total_mark}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-600">{t.class}</p>
                        <p className="text-xl font-bold text-blue-600">{exam.class}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-600">{t.course}</p>
                        <p className="text-xl font-bold text-purple-600">{exam.course}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-600">{t.created_date}</p>
                        <p className="text-lg font-bold text-orange-600">{formatDate(exam.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           
            </div>
          </div>

          {/* Additional Information Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exam Statistics Card - بيانات حقيقية من API */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <BarChart3 className="w-5 h-5 text-green-500" />
                {t.exam_statistics}
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">{t.exam_id}</span>
                  <span className="font-mono font-bold text-green-600">#{exam.id}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">{t.status}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {t.completed}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">{t.course}</span>
                  <span className="font-bold text-purple-600">{exam.course}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">{t.created_date}</span>
                  <span className="font-bold text-orange-600">{formatDate(exam.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Class Information Card - بيانات حقيقية من API */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Users className="w-5 h-5 text-blue-500" />
                {t.class_information}
              </h2>
              
              <div className="space-y-4">
                <div className={`flex items-center gap-3 p-4 bg-blue-50 rounded-xl ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <h3 className="font-semibold text-gray-900">{exam.class}</h3>
                    <p className="text-sm text-gray-600">{t.class_name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{exam.total_mark}</div>
                    <div className="text-sm text-gray-600">{t.total_marks}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{exam.course_id}</div>
                    <div className="text-sm text-gray-600">{t.course} ID</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </MainLayout>
  );
}