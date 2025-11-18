'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  Phone, 
  Mail, 
  School, 
  BookOpen, 
  Users, 
  Calendar,
  Briefcase,
  Shield,
  Clock,
  Edit,
  Award,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Languages
} from 'lucide-react';

export default function ProfilePage() {
  const { user, role } = useAuth();
  const { language, setLanguage } = useLanguage();

  // الترجمات
  const translations = {
    en: {
      loading: 'Loading profile...',
      studentProfile: 'Student Profile',
      age: 'Age',
      attendance: 'Attendance',
      exams: 'Exams',
      average: 'Average',
      studentInformation: 'Student Information',
      email: 'Email',
      educationStage: 'Education Stage',
      term: 'Term',
      previousSchool: 'Previous School',
      classroom: 'Classroom',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      examResults: 'Exam Results',
      teacher: 'Teacher',
      date: 'Date',
      score: 'Score',
      percentage: 'Percentage',
      pass: 'Pass',
      fail: 'Fail',
      parentsInformation: 'Parents Information',
      father: 'Father',
      mother: 'Mother',
      name: 'Name',
      job: 'Job',
      attendanceReport: 'Attendance Report',
      present: 'Present',
      absent: 'Absent',
      leave: 'Leave',
      overallAttendanceRate: 'Overall Attendance Rate',
      recentAttendance: 'Recent Attendance',
      schoolInformation: 'School Information',
      schoolName: 'School Name',
      schoolID: 'School ID',
      receptionContact: 'Reception Contact',
      receptionist: 'Receptionist',
      performanceSummary: 'Performance Summary',
      examsPassed: 'Exams Passed',
      highestScore: 'Highest Score',
      registrationYear: 'Registration Year',
      paymentHistory: 'Payment History',
      totalAmount: 'Total Amount',
      paidAmount: 'Paid Amount',
      remainingAmount: 'Remaining Amount',
      paymentType: 'Payment Type',
      paymentStatus: 'Payment Status',
      transactions: 'Transactions',
      amount: 'Amount',
      method: 'Method',
      invoiceNumber: 'Invoice Number',
      paidDate: 'Paid Date',
      accountant: 'Accountant',
      installment: 'Installment',
      fullPayment: 'Full Payment',
      paid: 'Paid',
      pending: 'Pending',
      overdue: 'Overdue',
      cash: 'Cash',
      card: 'Card',
      transfer: 'Transfer',
      noPayments: 'No payment records available',
      noExamResults: 'No exam results available',
      noAttendance: 'No attendance records available',
      installmentsCount: 'Installments Count' 
    },
    ar: {
      loading: 'جاري تحميل الملف...',
      studentProfile: 'ملف الطالب',
      age: 'العمر',
      attendance: 'الحضور',
      exams: 'الامتحانات',
      average: 'المتوسط',
      studentInformation: 'المعلومات الشخصية',
      email: 'البريد الإلكتروني',
      educationStage: 'المرحلة التعليمية',
      term: 'الفصل الدراسي',
      previousSchool: 'المدرسة السابقة',
      classroom: 'الفصل',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      examResults: 'نتائج الامتحانات',
      teacher: 'المعلم',
      date: 'التاريخ',
      score: 'الدرجة',
      percentage: 'النسبة المئوية',
      pass: 'ناجح',
      fail: 'راسب',
      parentsInformation: 'معلومات الوالدين',
      father: 'الأب',
      mother: 'الأم',
      name: 'الاسم',
      job: 'الوظيفة',
      attendanceReport: 'تقرير الحضور',
      present: 'حاضر',
      absent: 'غائب',
      leave: 'إجازة',
      overallAttendanceRate: 'معدل الحضور الإجمالي',
      recentAttendance: 'الحضور الحديث',
      schoolInformation: 'معلومات المدرسة',
      schoolName: 'اسم المدرسة',
      schoolID: 'رقم المدرسة',
      receptionContact: 'معلومات الاستقبال',
      receptionist: 'مسؤول الاستقبال',
      performanceSummary: 'ملخص الأداء',
      examsPassed: 'الامتحانات الناجحة',
      highestScore: 'أعلى درجة',
      registrationYear: 'سنة التسجيل',
      paymentHistory: 'سجل المدفوعات',
      totalAmount: 'المبلغ الإجمالي',
      paidAmount: 'المبلغ المدفوع',
      remainingAmount: 'المبلغ المتبقي',
      paymentType: 'نوع الدفع',
      paymentStatus: 'حالة الدفع',
      transactions: 'المعاملات',
      amount: 'المبلغ',
      method: 'طريقة الدفع',
      invoiceNumber: 'رقم الفاتورة',
      paidDate: 'تاريخ الدفع',
      accountant: 'المحاسب',
      installment: 'قسط',
      fullPayment: 'دفعة كاملة',
      paid: 'مدفوع',
      pending: 'قيد الانتظار',
          installmentsCount: 'عدد الأقساط' ,
      overdue: 'متأخر',
      cash: 'نقدي',
      card: 'بطاقة',
      transfer: 'تحويل',
      noPayments: 'لا توجد سجلات مدفوعات',
      noExamResults: 'لا توجد نتائج امتحانات',
      noAttendance: 'لا توجد سجلات حضور'
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-green-600">{t.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  // حساب إحصائيات الامتحانات
  const examStats = user.exam_results?.reduce((acc, exam) => {
    if (exam && exam.student_mark !== undefined && exam.total_mark !== undefined && exam.total_mark > 0) {
      const percentage = (exam.student_mark / exam.total_mark) * 100;
      acc.totalExams++;
      acc.averageScore += percentage;
      if (percentage >= 50) acc.passedExams++;
      if (percentage > acc.highestScore) acc.highestScore = percentage;
    }
    return acc;
  }, { totalExams: 0, averageScore: 0, passedExams: 0, highestScore: 0 }) || {
    totalExams: 0,
    averageScore: 0,
    passedExams: 0,
    highestScore: 0
  };

  const averageScore = examStats.totalExams > 0 ? examStats.averageScore / examStats.totalExams : 0;

  const attendanceData = user.attendance_report ? Object.values(user.attendance_report)[0] : null;

  // حساب إحصائيات المدفوعات
  const paymentStats = user.payments?.reduce((acc, payment) => {
    acc.totalPayments++;
    acc.totalAmount += payment.total_amount;
    acc.totalPaid += payment.paid_amount;
    acc.totalRemaining += payment.remaining_amount;
    if (payment.status === 'paid') acc.paidPayments++;
    return acc;
  }, { totalPayments: 0, totalAmount: 0, totalPaid: 0, totalRemaining: 0, paidPayments: 0 }) || {
    totalPayments: 0,
    totalAmount: 0,
    totalPaid: 0,
    totalRemaining: 0,
    paidPayments: 0
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-6">
              {/* Student Avatar */}
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              
              {/* Student Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {role} - {t.age} {user.age}
                    </span>
                  </div>
                  
                  {/* Language Toggle Button */}
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Languages className="w-4 h-4" />
                    <span>{language === 'en' ? 'العربية' : 'English'}</span>
                  </button>
                </div>
                
                <p className="text-green-600 font-medium mb-4">{t.studentProfile} - {user.classroom}</p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <School className="w-4 h-4" />
                    <span>{user.school?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{user.education_stage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{user.term}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Summary */}
            <div className="mt-6 lg:mt-0 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceData?.totals.attendance_rate || '0%'}
                  </div>
                  <div className="text-sm text-gray-600">{t.attendance}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {examStats?.totalExams || 0}
                  </div>
                  <div className="text-sm text-gray-600">{t.exams}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {averageScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">{t.average}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Student Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                {t.studentInformation}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.email}</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.educationStage}</p>
                      <p className="font-medium text-gray-900">{user.education_stage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.term}</p>
                      <p className="font-medium text-gray-900">{user.term}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <School className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.previousSchool}</p>
                      <p className="font-medium text-gray-900">{user.previous_school}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.classroom}</p>
                      <p className="font-medium text-gray-900">{user.classroom}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                    <Shield className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">{t.status}</p>
                      <p className={`font-medium ${user.active ? 'text-green-600' : 'text-red-600'}`}>
                        {user.active ? t.active : t.inactive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Results Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                {t.examResults}
              </h2>
              
              {user.exam_results && user.exam_results.length > 0 ? (
                <div className="space-y-4">
                  {user.exam_results.map((exam, index) => {
                    const percentage = (exam.student_mark / exam.total_mark) * 100;
                    const isPassing = percentage >= 50;
                    
                    return (
                      <div key={exam.exam_id || index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{exam.exam_name}</h3>
                            <p className="text-sm text-gray-600">{t.teacher}: {exam.teacher_name}</p>
                            <p className="text-sm text-gray-600">
                              {t.date}: {new Date(exam.exam_date).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900">
                                {exam.student_mark}/{exam.total_mark}
                              </div>
                              <div className="text-sm text-gray-600">{t.score}</div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-lg font-bold ${
                                isPassing ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {percentage.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">{t.percentage}</div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isPassing ? t.pass : t.fail}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isPassing ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>{t.noExamResults}</p>
                </div>
              )}
            </div>

            {/* Payment History Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                {t.paymentHistory}
              </h2>
              
              {user.payments && user.payments.length > 0 ? (
                <div className="space-y-6">
                  {user.payments.map((payment, index) => (
                    <div key={payment.id || index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {t.paymentType}: {payment.type === 'installment' ? t.installment : t.fullPayment}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {t.installmentsCount}: {payment.installments_count}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status === 'paid' ? t.paid : 
                           payment.status === 'pending' ? t.pending : t.overdue}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-lg font-bold text-blue-600">${payment.total_amount}</div>
                          <div className="text-sm text-gray-600">{t.totalAmount}</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-lg font-bold text-green-600">${payment.paid_amount}</div>
                          <div className="text-sm text-gray-600">{t.paidAmount}</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-lg font-bold text-red-600">${payment.remaining_amount}</div>
                          <div className="text-sm text-gray-600">{t.remainingAmount}</div>
                        </div>
                      </div>

                      {payment.transactions && payment.transactions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">{t.transactions}:</h4>
                          <div className="space-y-2">
                            {payment.transactions.map((transaction, transIndex) => (
                              <div key={transaction.id || transIndex} className="bg-white rounded-lg p-3 border">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">{t.amount}: </span>
                                    <span className="font-semibold">${transaction.amount}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">{t.method}: </span>
                                    <span className="font-semibold capitalize">{transaction.method}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">{t.paidDate}: </span>
                                    <span className="font-semibold">{transaction.paid_at}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">{t.accountant}: </span>
                                    <span className="font-semibold">{transaction.accountant?.name}</span>
                                  </div>
                                </div>
                                {transaction.bdf_invoice_number && (
                                  <div className="mt-2 text-xs text-gray-500">
                                    {t.invoiceNumber}: {transaction.bdf_invoice_number}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>{t.noPayments}</p>
                </div>
              )}
            </div>

            {/* Parents Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                {t.parentsInformation}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Information */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    {t.father}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{t.name}:</span>
                      <span className="font-medium text-gray-900">{user.father?.name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user.father?.phone || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.father?.job || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Mother Information */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-pink-600" />
                    {t.mother}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{t.name}:</span>
                      <span className="font-medium text-gray-900">{user.mother?.name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user.mother?.phone || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.mother?.job || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-8">
            
            {/* Attendance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-green-500" />
                {t.attendanceReport}
              </h2>
              
              {attendanceData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{attendanceData.totals.present}</div>
                      <div className="text-xs text-gray-600">{t.present}</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-600">{attendanceData.totals.absent}</div>
                      <div className="text-xs text-gray-600">{t.absent}</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{attendanceData.totals.leave}</div>
                      <div className="text-xs text-gray-600">{t.leave}</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{attendanceData.totals.attendance_rate}</div>
                    <div className="text-sm text-gray-600">{t.overallAttendanceRate}</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t.recentAttendance}:</h4>
                    <div className="space-y-2">
                      {Object.entries(attendanceData.days).map(([date, status]) => (
                        <div key={date} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">
                            {new Date(date).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : status === 'absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {status === 'present' ? t.present : 
                             status === 'absent' ? t.absent : t.leave}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>{t.noAttendance}</p>
                </div>
              )}
            </div>

            {/* School Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <School className="w-5 h-5 text-purple-500" />
                {t.schoolInformation}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <School className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.schoolName}</p>
                    <p className="font-semibold text-gray-900">{user.school?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.schoolID}</p>
                    <p className="font-semibold text-gray-900">#{user.school_id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reception Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                {t.receptionContact}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                  <User className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.receptionist}</p>
                    <p className="font-semibold text-gray-900">{user.reception?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.email}</p>
                    <p className="font-medium text-gray-900">{user.reception?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                {t.performanceSummary}
              </h2>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {examStats.passedExams}/{examStats.totalExams}
                  </div>
                  <div className="text-sm text-gray-600">{t.examsPassed}</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {examStats.highestScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">{t.highestScore}</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date(user.created_at).getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600">{t.registrationYear}</div>
                </div>

                {/* Payment Summary */}
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    ${paymentStats.totalPaid}
                  </div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Total Paid' : 'إجمالي المدفوع'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}