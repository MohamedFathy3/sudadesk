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
  Languages,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, role } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [screenSize, setScreenSize] = useState('desktop');

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      installmentsCount: 'Installments Count',
      overview: 'Overview',
      examsResults: 'Exams Results',
      payments: 'Payments',
      attendanceTab: 'Attendance',
      parents: 'Parents',
      schoolInfo: 'School Info',
      quickNavigation: 'Quick Navigation',
      currentView: 'Current View',
      toggleNavigation: 'Toggle Navigation',
      closeMenu: 'Close Menu',
      viewDetails: 'View Details',
      collapse: 'Collapse',
      expand: 'Expand',
      deviceView: 'Device View'
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
      overdue: 'متأخر',
      cash: 'نقدي',
      card: 'بطاقة',
      transfer: 'تحويل',
      noPayments: 'لا توجد سجلات مدفوعات',
      noExamResults: 'لا توجد نتائج امتحانات',
      noAttendance: 'لا توجد سجلات حضور',
      installmentsCount: 'عدد الأقساط',
      overview: 'نظرة عامة',
      examsResults: 'نتائج الامتحانات',
      payments: 'المدفوعات',
      attendanceTab: 'الحضور',
      parents: 'الوالدان',
      schoolInfo: 'معلومات المدرسة',
      quickNavigation: 'تنقل سريع',
      currentView: 'العرض الحالي',
      toggleNavigation: 'تبديل التنقل',
      closeMenu: 'إغلاق القائمة',
      viewDetails: 'عرض التفاصيل',
      collapse: 'طي',
      expand: 'توسيع',
      deviceView: 'عرض الجهاز'
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Navigation items
  const navItems = [
    { id: 'overview', label: t.overview, icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'student-info', label: t.studentInformation, icon: <User className="w-4 h-4" /> },
    { id: 'exams', label: t.examsResults, icon: <Award className="w-4 h-4" /> },
    { id: 'payments', label: t.payments, icon: <DollarSign className="w-4 h-4" /> },
    { id: 'attendance', label: t.attendanceTab, icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'parents', label: t.parents, icon: <Users className="w-4 h-4" /> },
    { id: 'school', label: t.schoolInfo, icon: <School className="w-4 h-4" /> },
  ];

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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <p className="text-xs text-gray-600">{t.studentProfile}</p>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white pt-20 px-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t.quickNavigation}</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t.deviceView}</h3>
              <div className="flex gap-3">
                <button className="flex-1 flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                  <Smartphone className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-700">Mobile</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                  <Tablet className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-700">Tablet</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                  <Monitor className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-700">Desktop</span>
                </button>
              </div>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              {t.closeMenu}
            </button>
          </div>
        )}

        {/* Desktop Side Navigation */}
        <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
          <div className="bg-white rounded-2xl shadow-lg p-4 w-64">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.quickNavigation}</h3>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-72">
          {/* Header Section */}
          <div id="overview" className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-green-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Student Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
                
                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 md:mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">{user.name}</h1>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
                          {role}
                        </span>
                        <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                          {t.age} {user.age}
                        </span>
                      </div>
                    </div>
                    
                    {/* Language Toggle Button */}
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                    >
                      <Languages className="w-4 h-4" />
                      <span>{language === 'en' ? 'العربية' : 'English'}</span>
                    </button>
                  </div>
                  
                  <p className="text-green-600 font-medium mb-3 md:mb-4 text-sm sm:text-base">{t.studentProfile} - {user.classroom}</p>
                  
                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <School className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{user.school?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{user.education_stage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{user.term}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Summary */}
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-end">
                  <div className="text-center min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {attendanceData?.totals.attendance_rate || '0%'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.attendance}</div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {examStats?.totalExams || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.exams}</div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {averageScore.toFixed(1)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.average}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Personal Information */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
              
              {/* Student Information Card */}
              <div id="student-info" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  {t.studentInformation}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg sm:rounded-xl">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600">{t.email}</p>
                        <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg sm:rounded-xl">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">{t.educationStage}</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{user.education_stage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg sm:rounded-xl">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">{t.term}</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{user.term}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg sm:rounded-xl">
                      <School className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600">{t.previousSchool}</p>
                        <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{user.previous_school}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg sm:rounded-xl">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">{t.classroom}</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{user.classroom}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg sm:rounded-xl">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">{t.status}</p>
                        <p className={`font-medium text-sm sm:text-base ${user.active ? 'text-green-600' : 'text-red-600'}`}>
                          {user.active ? t.active : t.inactive}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Results Card */}
              <div id="exams" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    {t.examResults}
                  </h2>
                  <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    {t.viewDetails} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                {user.exam_results && user.exam_results.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {user.exam_results.slice(0, screenSize === 'mobile' ? 2 : 3).map((exam, index) => {
                      const percentage = (exam.student_mark / exam.total_mark) * 100;
                      const isPassing = percentage >= 50;
                      
                      return (
                        <div key={exam.exam_id || index} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{exam.exam_name}</h3>
                              <p className="text-xs text-gray-600">{t.teacher}: {exam.teacher_name}</p>
                              <p className="text-xs text-gray-600">
                                {t.date}: {new Date(exam.exam_date).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                              <div className="text-center">
                                <div className="text-base sm:text-lg font-bold text-gray-900">
                                  {exam.student_mark}/{exam.total_mark}
                                </div>
                                <div className="text-xs text-gray-600">{t.score}</div>
                              </div>
                              
                              <div className="text-center">
                                <div className={`text-base sm:text-lg font-bold ${
                                  isPassing ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {percentage.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-600">{t.percentage}</div>
                              </div>
                              
                              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isPassing ? t.pass : t.fail}
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-2 sm:mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                              <div 
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                                  isPassing ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {user.exam_results.length > 3 && (
                      <button className="w-full py-2 text-center text-green-600 hover:text-green-700 text-sm font-medium border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                        {t.viewDetails} (+{user.exam_results.length - 3})
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <Award className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-base">{t.noExamResults}</p>
                  </div>
                )}
              </div>

              {/* Payment History Card */}
              <div id="payments" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    {t.paymentHistory}
                  </h2>
                  <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    {t.viewDetails} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                {user.payments && user.payments.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {user.payments.slice(0, screenSize === 'mobile' ? 1 : 2).map((payment, index) => (
                      <div key={payment.id || index} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                          <div className="mb-2 sm:mb-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                              {t.paymentType}: {payment.type === 'installment' ? t.installment : t.fullPayment}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {t.installmentsCount}: {payment.installments_count}
                            </p>
                          </div>
                          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
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
                        
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                          <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                            <div className="text-base sm:text-lg font-bold text-blue-600">${payment.total_amount}</div>
                            <div className="text-xs text-gray-600">{t.totalAmount}</div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                            <div className="text-base sm:text-lg font-bold text-green-600">${payment.paid_amount}</div>
                            <div className="text-xs text-gray-600">{t.paidAmount}</div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                            <div className="text-base sm:text-lg font-bold text-red-600">${payment.remaining_amount}</div>
                            <div className="text-xs text-gray-600">{t.remainingAmount}</div>
                          </div>
                        </div>

                        {payment.transactions && payment.transactions.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">{t.transactions}:</h4>
                            <div className="space-y-2">
                              {payment.transactions.slice(0, 2).map((transaction, transIndex) => (
                                <div key={transaction.id || transIndex} className="bg-white rounded-lg p-2 sm:p-3 border">
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs sm:text-sm">
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
                                    <div className="mt-1 text-xs text-gray-500">
                                      {t.invoiceNumber}: {transaction.bdf_invoice_number}
                                    </div>
                                  )}
                                </div>
                              ))}
                              
                              {payment.transactions.length > 2 && (
                                <button className="text-xs text-green-600 hover:text-green-700">
                                  {t.viewDetails} (+{payment.transactions.length - 2})
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {user.payments.length > 2 && (
                      <button className="w-full py-2 text-center text-green-600 hover:text-green-700 text-sm font-medium border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                        {t.viewDetails} (+{user.payments.length - 2})
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-base">{t.noPayments}</p>
                  </div>
                )}
              </div>

              {/* Parents Information Card */}
              <div id="parents" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  {t.parentsInformation}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {/* Father Information */}
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      {t.father}
                    </h3>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-600">{t.name}:</span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.father?.name || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{user.father?.phone || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{user.father?.job || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mother Information */}
                  <div className="bg-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-pink-200">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-pink-600" />
                      {t.mother}
                    </h3>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-600">{t.name}:</span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.mother?.name || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{user.mother?.phone || 'Not specified'}</span>
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
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              
              {/* Attendance Card */}
              <div id="attendance" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  {t.attendanceReport}
                </h2>
                
                {attendanceData ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-green-600">{attendanceData.totals.present}</div>
                        <div className="text-xs text-gray-600">{t.present}</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-red-600">{attendanceData.totals.absent}</div>
                        <div className="text-xs text-gray-600">{t.absent}</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">{attendanceData.totals.leave}</div>
                        <div className="text-xs text-gray-600">{t.leave}</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">{attendanceData.totals.attendance_rate}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t.overallAttendanceRate}</div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">{t.recentAttendance}:</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {Object.entries(attendanceData.days).slice(-5).map(([date, status]) => (
                          <div key={date} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs sm:text-sm">
                            <span className="text-gray-600 truncate">
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
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <ClipboardCheck className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-base">{t.noAttendance}</p>
                  </div>
                )}
              </div>

              {/* School Information Card */}
              <div id="school" className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <School className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  {t.schoolInformation}
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg sm:rounded-xl">
                    <School className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">{t.schoolName}</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user.school?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg sm:rounded-xl">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">{t.schoolID}</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">#{user.school_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reception Information Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  {t.receptionContact}
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg sm:rounded-xl">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">{t.receptionist}</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user.reception?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg sm:rounded-xl">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">{t.email}</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.reception?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Summary Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  {t.performanceSummary}
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {examStats.passedExams}/{examStats.totalExams}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.examsPassed}</div>
                  </div>
                  
                  <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {examStats.highestScore.toFixed(1)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.highestScore}</div>
                  </div>
                  
                  <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {new Date(user.created_at).getFullYear()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{t.registrationYear}</div>
                  </div>

                  {/* Payment Summary */}
                  <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-orange-600">
                      ${paymentStats.totalPaid}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{language === 'en' ? 'Total Paid' : 'إجمالي المدفوع'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleMobileMenu}
            className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
            aria-label={t.toggleNavigation}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 640px) {
          /* Mobile optimizations */
          .rtl {
            direction: rtl;
          }
          
          .ltr {
            direction: ltr;
          }
          
          /* Improve touch targets */
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Better text readability on mobile */
          p, span {
            line-height: 1.6;
          }
          
          /* Optimize spacing for mobile */
          .space-y-3 > * + * {
            margin-top: 0.75rem;
          }
          
          /* Improve form elements */
          input, select, textarea {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
        
        @media (min-width: 641px) and (max-width: 1023px) {
          /* Tablet optimizations */
          .lg\\:hidden {
            display: none;
          }
        }
        
        /* Scrollbar styling */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #10B981 transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #10B981;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

// Helper component for ChevronRight
const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);