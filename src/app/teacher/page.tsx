// app/teacher/report/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/api';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  Clock, 
  School, 
  UserCheck,
  TrendingUp,
  FileText,
  PlusCircle,
  Download
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// استيراد مكونات shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Student {
  id: number;
  name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attendance_report: any[];
  exam_results: ExamResult[];
}

interface ExamResult {
  exam_id: number;
  exam_name: string;
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

interface TeacherData {
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
  exams: Exam[];
  created_at: string;
  updated_at: string;
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Custom Tooltip component - multi-language
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, language }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <p className="text-green-900 font-medium">{label}</p>
        <p className="text-green-600">
          {language === 'ar' ? 'الطلاب:' : 'Students:'} <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function TeacherReport() {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [reportLoading, setReportLoading] = useState(true);

  // الترجمات
  const t = {
    teacher_dashboard: language === 'ar' ? 'لوحة المعلم' : 'Teacher Dashboard',
    overview: language === 'ar' ? 'نظرة عامة على الأداء والاحصائيات' : 'Performance overview and statistics',
    loading_report: language === 'ar' ? 'جاري تحميل التقرير...' : 'Loading report...',
    total_students: language === 'ar' ? 'إجمالي الطلاب' : 'Total Students',
    classes: language === 'ar' ? 'الفصول' : 'Classes',
    school: language === 'ar' ? 'المدرسة' : 'School',
    member_since: language === 'ar' ? 'عضو منذ' : 'Member Since',
    active_across_classes: language === 'ar' ? 'نشط عبر جميع الفصول' : 'Active across all classes',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    class_distribution: language === 'ar' ? 'توزيع الفصول' : 'Class Distribution',
    active_vs_inactive: language === 'ar' ? 'الفصول النشطة مقابل غير النشطة' : 'Active vs Inactive classes',
    students_per_class: language === 'ar' ? 'الطلاب في كل فصل' : 'Students per Class',
    distribution_across_classes: language === 'ar' ? 'توزيع الطلاب عبر فصولك' : 'Distribution of students across your classes',
    student_progress_trend: language === 'ar' ? 'اتجاه تقدم الطلاب' : 'Student Progress Trend',
    monthly_engagement: language === 'ar' ? 'نظرة شهرية على مشاركة الطلاب' : 'Monthly student engagement overview',
    my_classes: language === 'ar' ? 'فصولي' : 'My Classes',
    manage_view_classes: language === 'ar' ? 'إدارة وعرض الفصول المخصصة لك' : 'Manage and view your assigned classes',
    view_all: language === 'ar' ? 'عرض الكل' : 'View All',
    students: language === 'ar' ? 'طلاب' : 'students',
    performance_summary: language === 'ar' ? 'ملخص الأداء' : 'Performance Summary',
    teaching_metrics: language === 'ar' ? 'مقاييس أداء التدريس' : 'Your teaching performance metrics',
    class_coverage: language === 'ar' ? 'تغطية الفصول' : 'Class Coverage',
    student_reach: language === 'ar' ? 'الوصول للطلاب' : 'Student Reach',
    active_status: language === 'ar' ? 'الحالة النشطة' : 'Active Status',
    last_activity: language === 'ar' ? 'آخر نشاط' : 'Last Activity',
    school_information: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    name: language === 'ar' ? 'الاسم' : 'Name',
    address: language === 'ar' ? 'العنوان' : 'Address',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    quick_actions: language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions',
    create_exam: language === 'ar' ? 'إنشاء اختبار' : 'Create Exam',
    add_students: language === 'ar' ? 'إضافة طلاب' : 'Add Students',
    view_reports: language === 'ar' ? 'عرض التقارير' : 'View Reports',
    manage_classes: language === 'ar' ? 'إدارة الفصول' : 'Manage Classes',
    teacher_status: language === 'ar' ? 'حالة المعلم' : 'Teacher Status',
    currently_active: language === 'ar' ? 'أنت حالياً نشط وتدرس' : 'You are currently active and teaching',
    classes_count: language === 'ar' ? 'فصول' : 'classes',
    students_guidance: language === 'ar' ? 'طالب تحت إشرافك' : 'students under your guidance',
    teaching_days: language === 'ar' ? 'يوم في التدريس' : 'days teaching',
    no_classes_assigned: language === 'ar' ? 'لا توجد فصول مخصصة بعد' : 'No classes assigned yet',
    create_first_class: language === 'ar' ? 'إنشاء أول فصل' : 'Create First Class',
    
    // Tab labels
    overview_tab: language === 'ar' ? 'نظرة عامة' : 'Overview',
    analytics_tab: language === 'ar' ? 'التحليلات' : 'Analytics',
    reports_tab: language === 'ar' ? 'التقارير' : 'Reports',

    // Exam related
    exams: language === 'ar' ? 'الاختبارات' : 'Exams',
    total_exams: language === 'ar' ? 'إجمالي الاختبارات' : 'Total Exams',
    average_score: language === 'ar' ? 'متوسط الدرجات' : 'Average Score',
    exam_performance: language === 'ar' ? 'أداء الاختبارات' : 'Exam Performance',
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchTeacherReport = async () => {
      try {
        setReportLoading(true);
        const data = await apiFetch('/user/check-auth');
        
        if (data && data.data) {
          setTeacherData(data.data);
        }
      } catch (error) {
        console.error('Error fetching teacher report:', error);
      } finally {
        setReportLoading(false);
      }
    };

    if (user) {
      fetchTeacherReport();
    }
  }, [user]);

  // إعداد بيانات الرسوم البيانية من البيانات الحقيقية
  const chartData = teacherData?.classes.map((classItem, index) => ({
    name: classItem.name.length > 10 ? classItem.name.substring(0, 10) + '...' : classItem.name,
    fullName: classItem.name,
    students: parseInt(classItem.count),
    fill: COLORS[index % COLORS.length],
  })) || [];

  const classDistributionData = [
    { 
      name: language === 'ar' ? 'فصول نشطة' : 'Active Classes', 
      value: teacherData?.classes.filter(cls => cls.active).length || 0 
    },
    { 
      name: language === 'ar' ? 'فصول غير نشطة' : 'Inactive Classes', 
      value: teacherData?.classes.filter(cls => !cls.active).length || 0 
    },
  ];

  // بيانات تقدم الطلاب بناءً على نتائج الاختبارات الحقيقية
  const getStudentProgressData = () => {
    if (!teacherData) return [];

    const monthlyData: { [key: string]: { total: number; count: number } } = {};
    
    teacherData.classes.forEach(classItem => {
      classItem.students.forEach(student => {
        student.exam_results.forEach(exam => {
          const month = new Date(exam.exam_date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { 
            month: 'short',
            year: 'numeric'
          });
          
          if (!monthlyData[month]) {
            monthlyData[month] = { total: 0, count: 0 };
          }
          
          monthlyData[month].total += exam.student_mark;
          monthlyData[month].count += 1;
        });
      });
    });

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        students: data.count > 0 ? Math.round((data.total / data.count) / 10) : 0 // تحويل لمتوسط نسبة
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  };

  const studentProgressData = getStudentProgressData();

  // حساب متوسط درجات الاختبارات
  const calculateAverageScore = () => {
    if (!teacherData) return 0;
    
    let totalScore = 0;
    let totalExams = 0;
    
    teacherData.classes.forEach(classItem => {
      classItem.students.forEach(student => {
        student.exam_results.forEach(exam => {
          totalScore += (exam.student_mark / exam.total_mark) * 100;
          totalExams++;
        });
      });
    });
    
    return totalExams > 0 ? Math.round(totalScore / totalExams) : 0;
  };

  if (loading || reportLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-muted-foreground">{t.loading_report}</p>
      </div>
    );
  }

  // حساب الإحصائيات من البيانات الحقيقية
  const totalStudents = teacherData?.classes.reduce((sum, cls) => sum + parseInt(cls.count), 0) || 0;
  const activeClasses = teacherData?.classes.filter(cls => cls.active).length || 0;
  const totalClasses = teacherData?.classes.length || 0;
  const totalExams = teacherData?.exams.length || 0;
  const activePercentage = (activeClasses / Math.max(totalClasses, 1)) * 100;
  const teachingDays = teacherData ? Math.floor((new Date().getTime() - new Date(teacherData.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const averageScore = calculateAverageScore();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                  <h1 className="text-3xl font-bold tracking-tight">{t.teacher_dashboard}</h1>
                  <p className="text-muted-foreground mt-2">
                    {t.overview}
                  </p>
                </div>
                <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Students Card */}
            <Card className="relative overflow-hidden">
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <CardTitle className="text-sm font-medium">{t.total_students}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className={`h-3 w-3 ${language === 'ar' ? 'ml-1' : 'mr-1'} text-green-600`} />
                  {t.active_across_classes}
                </p>
              </CardContent>
            </Card>

            {/* Classes Card */}
            <Card>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <CardTitle className="text-sm font-medium">{t.classes}</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClasses}</div>
                <p className="text-xs text-muted-foreground">
                  {activeClasses} {t.active} • {totalClasses - activeClasses} {t.inactive}
                </p>
                <Progress value={activePercentage} className="h-1 mt-2" />
              </CardContent>
            </Card>

            {/* Exams Card */}
            <Card>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <CardTitle className="text-sm font-medium">{t.exams}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalExams}</div>
                <p className="text-xs text-muted-foreground">
                  {t.average_score}: {averageScore}%
                </p>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card>
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <CardTitle className="text-sm font-medium">{t.member_since}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {teacherData ? new Date(teacherData.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {teachingDays} {t.teaching_days}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">{t.overview_tab}</TabsTrigger>
              <TabsTrigger value="analytics">{t.analytics_tab}</TabsTrigger>
              <TabsTrigger value="reports">{t.reports_tab}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pie Chart - Class Distribution */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>{t.class_distribution}</CardTitle>
                    <CardDescription>{t.active_vs_inactive}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={classDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {classDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Bar Chart - Students per Class */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{t.students_per_class}</CardTitle>
                    <CardDescription>{t.distribution_across_classes}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip language={language} />} />
                          <Bar 
                            dataKey="students" 
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Line Chart - Student Progress */}
              {studentProgressData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.student_progress_trend}</CardTitle>
                    <CardDescription>{t.monthly_engagement}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={studentProgressData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip language={language} />} />
                          <Line 
                            type="monotone" 
                            dataKey="students" 
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={{ fill: "var(--primary)", strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Classes Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Classes List */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <CardTitle>{t.my_classes} ({totalClasses})</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      {t.view_all}
                    </Button>
                  </div>
                  <CardDescription>{t.manage_view_classes}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData?.classes.map((classItem) => (
                      <Card key={classItem.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                              <h3 className="font-semibold text-lg">{classItem.name}</h3>
                              <div className={`flex items-center space-x-4 text-sm text-muted-foreground mt-1 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`flex items-center space-x-1 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                  <Users className="h-3 w-3" />
                                  <span>{classItem.count} {t.students}</span>
                                </div>
                                <div className={`flex items-center space-x-1 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(classItem.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={classItem.active ? "default" : "secondary"}>
                              {classItem.active ? t.active : t.inactive}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {(!teacherData?.classes || teacherData.classes.length === 0) && (
                      <Card className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <CardDescription>{t.no_classes_assigned}</CardDescription>
                        <Button className="mt-4">{t.create_first_class}</Button>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <CardTitle>{t.performance_summary}</CardTitle>
                  </div>
                  <CardDescription>{t.teaching_metrics}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{t.class_coverage}</p>
                          <p className="text-2xl font-bold text-blue-600">{activePercentage.toFixed(1)}%</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-blue-600 opacity-60" />
                      </div>
                      <div className={`flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-green-900 dark:text-green-100">{t.student_reach}</p>
                          <p className="text-2xl font-bold text-green-600">{totalStudents}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600 opacity-60" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">{t.active_status}</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {teacherData?.active ? t.active : t.inactive}
                          </p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600 opacity-60" />
                      </div>
                      <div className={`flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-orange-900 dark:text-orange-100">{t.last_activity}</p>
                          <p className="text-lg font-bold text-orange-600">
                            {teacherData ? new Date(teacherData.updated_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') : 'N/A'}
                          </p>
                        </div>
                        <Calendar className="h-8 w-8 text-orange-600 opacity-60" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* School Info */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <School className="h-5 w-5 text-purple-600" />
                    <CardTitle>{t.school_information}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.name}</p>
                    <p className="font-medium">{teacherData?.school.name}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.address}</p>
                    <p className="font-medium text-sm">{teacherData?.school.address}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.phone}</p>
                    <p className="font-medium">{teacherData?.school.phone}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.email}</p>
                    <p className="font-medium">{teacherData?.school.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Status Badge */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 border-0">
                <CardContent className="p-6 text-primary-foreground">
                  <div className={`flex items-center space-x-3 mb-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <UserCheck className="h-6 w-6" />
                    <CardTitle className="text-primary-foreground">{t.teacher_status}</CardTitle>
                  </div>
                  <p className="text-primary-foreground/80 mb-4 text-sm">
                    {t.currently_active} <strong>{totalClasses}</strong> {t.classes_count}
                  </p>
                  <div className="bg-primary-foreground/20 rounded-lg p-4 text-center">
                    <p className="font-bold text-2xl">{totalStudents}</p>
                    <p className="text-primary-foreground/80 text-sm">{t.students_guidance}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}