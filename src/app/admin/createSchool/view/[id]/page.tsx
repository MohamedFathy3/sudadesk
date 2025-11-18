// app/schools/[id]/roles-report/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Calendar, Users, TrendingUp, BarChart3, Building2, UserCog, UserCheck, BookOpen, GraduationCap, Shield, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MonthlyReportItem {
  month: string;
  count: number;
}

interface RoleReport {
  monthly_report: MonthlyReportItem[];
  total_count: number;
}

interface RolesReportData {
  message: string;
  reports: {
    reception: RoleReport;
    hr: RoleReport;
    accountant: RoleReport;
    director: RoleReport;
    class_supervisor: RoleReport;
    teacher: RoleReport;
    student: RoleReport;
  };
}

interface SchoolInfo {
  id: number;
  name: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  manager_name?: string;
  manager_email?: string;
}

interface SchoolApiResponse {
  result: string;
  data: SchoolInfo;
  message: string;
  status: number;
}

// Role configuration with green theme - multi-language
const getRoleConfig = (language: string) => ({
  reception: {
    label: language === 'ar' ? 'الاستقبال' : "Reception",
    color: "hsl(142, 76%, 36%)",
    icon: UserCog,
    description: language === 'ar' ? 'موظفي الاستقبال والمكتب الأمامي' : "Front desk and reception staff",
  },
  hr: {
    label: language === 'ar' ? 'الموارد البشرية' : "HR",
    color: "hsl(142, 76%, 36%)",
    icon: Users,
    description: language === 'ar' ? 'قسم الموارد البشرية' : "Human Resources department",
  },
  accountant: {
    label: language === 'ar' ? 'المحاسب' : "Accountant",
    color: "hsl(142, 76%, 36%)",
    icon: DollarSign,
    description: language === 'ar' ? 'فريق المالية والمحاسبة' : "Finance and accounting team",
  },
  director: {
    label: language === 'ar' ? 'المدير' : "Director",
    color: "hsl(142, 76%, 36%)",
    icon: Shield,
    description: language === 'ar' ? 'مديري المدارس والإدارة' : "School directors and management",
  },
  class_supervisor: {
    label: language === 'ar' ? 'مشرف الفصل' : "Class Supervisor",
    color: "hsl(142, 76%, 36%)",
    icon: UserCheck,
    description: language === 'ar' ? 'مشرفي الفصول ومنسقين' : "Class supervisors and coordinators",
  },
  teacher: {
    label: language === 'ar' ? 'المعلم' : "Teacher",
    color: "hsl(142, 76%, 36%)",
    icon: BookOpen,
    description: language === 'ar' ? 'الكادر التدريسي والمعلمين' : "Teaching staff and educators",
  },
  student: {
    label: language === 'ar' ? 'الطالب' : "Student",
    color: "hsl(142, 76%, 36%)",
    icon: GraduationCap,
    description: language === 'ar' ? 'تسجيلات الطلاب' : "Student registrations",
  }
});

// Custom Tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, language }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <p className="text-green-900 font-medium">{label}</p>
        <p className="text-green-600">
          {language === 'ar' ? 'المستخدمين:' : 'Users:'} <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SchoolRolesReport() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const [reportData, setReportData] = useState<RolesReportData | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<keyof ReturnType<typeof getRoleConfig>>('reception');

  // Translations
  const t = {
    pageTitle: language === 'ar' ? 'تقرير الأدوار الشهري' : 'Roles Monthly Report',
    backToSchools: language === 'ar' ? 'العودة إلى المدارس' : 'Back to Schools',
    loading: language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...',
    error: language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data',
    tryAgain: language === 'ar' ? 'حاول مرة أخرى' : 'Try Again',
    schoolInfo: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    rolesReport: language === 'ar' ? 'تقرير الأدوار' : 'Roles Report',
    totalUsers: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
    monthlyUsers: language === 'ar' ? 'المستخدمين الشهري' : 'Monthly Users',
    monthlyTrend: language === 'ar' ? 'الاتجاه الشهري' : 'Monthly Trend',
    userDistribution: language === 'ar' ? 'توزيع المستخدمين' : 'User Distribution',
    users: language === 'ar' ? 'المستخدمين' : 'Users',
    month: language === 'ar' ? 'الشهر' : 'Month',
    noData: language === 'ar' ? 'لا توجد بيانات' : 'No data available',
    downloadReport: language === 'ar' ? 'تحميل التقرير' : 'Download Report',
    year: language === 'ar' ? 'سنة' : 'Year',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    manager: language === 'ar' ? 'المدير' : 'Manager',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
    roleAnalytics: language === 'ar' ? 'تحليلات الأدوار' : 'Role Analytics',
    selectRole: language === 'ar' ? 'اختر دوراً لعرض التقارير الشهرية' : 'Select a role to view monthly reports',
    report: language === 'ar' ? 'تقرير' : 'Report',
    monthlyGrowth: language === 'ar' ? 'النمو الشهري' : 'Monthly Growth',
    distribution: language === 'ar' ? 'التوزيع' : 'Distribution',
    monthlyBreakdown: language === 'ar' ? 'تفصيل شهري' : 'Monthly Breakdown',
    user: language === 'ar' ? 'مستخدم' : 'user',
  };

  // Fetch school information
  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const response: SchoolApiResponse = await apiFetch(`/schools/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setSchoolInfo(response.data);
      } catch (err) {
        console.error('Error fetching school info:', err);
        setSchoolInfo(null);
      }
    };

    if (id) {
      fetchSchoolInfo();
    }
  }, [id]);

  // Fetch roles report
  const fetchRolesReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const report: RolesReportData = await apiFetch('/reports/roles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-School-ID': id as string,
        },
      });
      
      setReportData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching roles report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRolesReport();
    }
  }, [id]);

  // Calculate totals
  const totalUsers = Object.values(reportData?.reports || {}).reduce(
    (sum, role) => sum + (role?.total_count || 0), 0
  );

  const activeRoles = Object.values(reportData?.reports || {}).filter(
    role => (role?.total_count || 0) > 0
  ).length;

  // Get role config based on current language
  const roleConfig = getRoleConfig(language);

  const handleDownload = () => {
    alert(language === 'ar' ? 'سيتم تنزيل التقرير قريباً' : 'Report download will be available soon');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-green-700 font-medium text-lg">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-red-700 font-medium text-lg mb-2">{t.error}</p>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => fetchRolesReport()} 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {t.tryAgain}
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                onClick={() => router.push('/schools')}
                className={`flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backToSchools}
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  {t.pageTitle}
                </h1>
                {schoolInfo && (
                  <p className="text-green-600 font-medium">
                    {schoolInfo.name}
                  </p>
                )}
              </div>
            </div>

            <Button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {t.downloadReport}
            </Button>
          </div>

          {/* Success Message */}
          {reportData?.message && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-center shadow-lg">
              <div className={`flex items-center justify-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <p className="font-semibold text-lg">
                  {reportData.message}
                </p>
              </div>
            </div>
          )}

          {/* School Information Card */}
          {/* {schoolInfo && (
            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t.schoolInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      {schoolInfo.logo ? (
                        <img 
                          src={schoolInfo.logo} 
                          alt={schoolInfo.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {schoolInfo?.name?.charAt(0) || 'S'}
                        </div>
                      )}
                    </div>
                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                      <p className="text-sm text-green-600">{t.schoolName}</p>
                      <p className="font-semibold text-green-900">{schoolInfo.data.name}</p>
                    </div>
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-green-600">{t.manager}</p>
                    <p className="font-semibold text-green-900">{schoolInfo.data?.manager_name || t.notAvailable}</p>
                    {schoolInfo.manager_email && (
                      <p className="text-xs text-green-600">{schoolInfo.data?.manager_email}</p>
                    )}
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-green-600">{t.email}</p>
                    <p className="font-semibold text-green-900">{schoolInfo.data?.email || t.notAvailable}</p>
                    <p className="text-xs text-green-600">{schoolInfo.data?.phone || t.notAvailable}</p>
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-green-600">{t.address}</p>
                    <p className="font-semibold text-green-900 text-sm">
                      {schoolInfo.address || t.notAvailable}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Overall Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-sm">
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-4 ${
                language === 'ar' ? 'flex-row-reverse' : ''
              }`}>
                <CardTitle className="text-sm font-semibold text-green-700">{t.totalUsers}</CardTitle>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-2">{totalUsers}</div>
                <p className="text-green-600 text-sm">
                  {language === 'ar' ? 'عبر جميع الأدوار' : 'Across all roles'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-sm">
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-4 ${
                language === 'ar' ? 'flex-row-reverse' : ''
              }`}>
                <CardTitle className="text-sm font-semibold text-emerald-700">
                  {language === 'ar' ? 'الأدوار النشطة' : 'Active Roles'}
                </CardTitle>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-900 mb-2">{activeRoles}</div>
                <p className="text-emerald-600 text-sm">
                  {language === 'ar' ? 'من أصل 7 أدوار' : 'Out of 7 role types'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-teal-50 border-teal-200 shadow-sm">
              <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-4 ${
                language === 'ar' ? 'flex-row-reverse' : ''
              }`}>
                <CardTitle className="text-sm font-semibold text-teal-700">
                  {language === 'ar' ? 'نوع الأدوار' : 'Role Types'}
                </CardTitle>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-teal-900 mb-2">7</div>
                <p className="text-teal-600 text-sm">
                  {language === 'ar' ? 'مجموع أنواع الأدوار' : 'Total role categories'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Role Selection Tabs */}
          <Card className="border-green-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t.roleAnalytics}
              </CardTitle>
              <CardDescription className="text-green-600">
                {t.selectRole}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as keyof typeof roleConfig)} className="space-y-6">
                {/* Tabs List */}
                <div className="bg-green-50 rounded-lg p-2">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 w-full h-auto">
                    {Object.entries(roleConfig).map(([key, role]) => {
                      const IconComponent = role.icon;
                      const roleData = reportData?.reports?.[key as keyof typeof roleConfig];
                      return (
                        <TabsTrigger 
                          key={key} 
                          value={key}
                          className={`flex flex-col items-center gap-1 h-auto p-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 data-[state=active]:border-green-300 border border-transparent rounded-md transition-all ${
                            language === 'ar' ? 'text-xs' : ''
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="text-xs font-medium leading-tight">{role.label}</span>
                          <Badge variant="secondary" className="text-xs bg-green-200 text-green-800 border-green-300 h-4 px-1">
                            {roleData?.total_count || 0}
                          </Badge>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                {/* Tab Content */}
                {Object.entries(roleConfig).map(([key, role]) => {
                  const IconComponent = role.icon;
                  const roleData = reportData?.reports?.[key as keyof typeof roleConfig];
                  const chartData = roleData?.monthly_report?.map(item => ({
                    month: item.month,
                    count: item.count,
                    fill: role.color
                  })).reverse() || [];

                  return (
                    <TabsContent key={key} value={key} className="space-y-6 m-0">
                      {/* Role Header */}
                      <div className={`flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 ${
                        language === 'ar' ? 'flex-row-reverse' : ''
                      }`}>
                        <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                            <h3 className="text-xl font-bold text-green-900">
                              {role.label} {t.report}
                            </h3>
                            <p className="text-green-600 text-sm">{role.description}</p>
                          </div>
                        </div>
                        <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                          <div className="text-2xl font-bold text-green-900">
                            {roleData?.total_count || 0}
                          </div>
                          <p className="text-green-600 text-sm">{t.totalUsers}</p>
                        </div>
                      </div>

                      {/* Charts Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-green-200 shadow-sm">
                          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 py-4">
                            <CardTitle className="text-green-800 flex items-center gap-2 text-base">
                              <TrendingUp className="h-4 w-4" />
                              {t.monthlyGrowth}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <ResponsiveContainer width="100%" height={250}>
                              <LineChart
                                data={chartData}
                                margin={{
                                  top: 16,
                                  left: 16,
                                  right: 16,
                                  bottom: 16,
                                }}
                              >
                                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="month" 
                                  tickFormatter={(value: string) => value.split(' ')[0]}
                                  stroke="#6b7280"
                                  fontSize={12}
                                />
                                <Tooltip content={<CustomTooltip language={language} />} />
                                <Line
                                  dataKey="count"
                                  type="monotone"
                                  stroke="hsl(142, 76%, 36%)"
                                  strokeWidth={2}
                                  dot={{ r: 4, fill: "hsl(142, 76%, 36%)", stroke: "white", strokeWidth: 1 }}
                                  activeDot={{ r: 6, fill: "hsl(142, 76%, 36%)" }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>

                        <Card className="border-green-200 shadow-sm">
                          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 py-4">
                            <CardTitle className="text-green-800 flex items-center gap-2 text-base">
                              <Users className="h-4 w-4" />
                              {t.distribution}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <ResponsiveContainer width="100%" height={250}>
                              <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="month" 
                                  tickFormatter={(value: string) => value.split(' ')[0]}
                                  stroke="#6b7280"
                                  fontSize={12}
                                />
                                <Tooltip content={<CustomTooltip language={language} />} />
                                <Bar 
                                  dataKey="count" 
                                  fill="hsl(142, 76%, 36%)" 
                                  radius={[2, 2, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Monthly Breakdown Cards */}
                      <div>
                        <h4 className={`text-lg font-semibold text-green-800 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {t.monthlyBreakdown}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {roleData?.monthly_report?.map((item: MonthlyReportItem, index: number) => (
                            <Card 
                              key={index} 
                              className="border-green-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300"
                            >
                              <CardContent className="p-3">
                                <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <IconComponent className="h-3 w-3 text-green-500" />
                                    <span className="text-sm font-medium text-green-900">{item.month}</span>
                                  </div>
                                  <Badge 
                                    variant={item.count > 0 ? "default" : "secondary"}
                                    className="text-xs bg-green-100 text-green-700 border-green-200"
                                  >
                                    {item.count} {item.count === 1 ? t.user : t.users}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}