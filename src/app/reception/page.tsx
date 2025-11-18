// app/reception/report/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/api';
import { 
  Users, 
  Calendar, 
  Clock,
  School, 
  UserCheck,
  TrendingUp,
  FileText,
  Phone,
  Mail,
  MapPin,
  UserPlus,
  CalendarDays
} from 'lucide-react';

// استيراد المكونات الأساسية
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/button";

interface ReceptionData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  school_id: number;
  active: boolean;
  avatar: string | null;
  school: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
  };
  created_at: string;
  updated_at: string;
}

// Badge component بديل
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'secondary' }) => {
  const baseClasses = "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default function ReceptionReport() {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [receptionData, setReceptionData] = useState<ReceptionData | null>(null);
  const [reportLoading, setReportLoading] = useState(true);

  // الترجمات
  const t = {
    // العناوين الرئيسية
    pageTitle: language === 'ar' ? 'لوحة تحكم شئون الطلاب' : 'Reception Dashboard',
    welcome: language === 'ar' ? 'مرحباً بك في لوحة إدارة شئون الطلاب' : 'Welcome to your reception management panel',
    
    // البطاقات الإحصائية
    workingDays: language === 'ar' ? 'أيام العمل' : 'Working Days',
    accountStatus: language === 'ar' ? 'حالة الحساب' : 'Account Status',
    school: language === 'ar' ? 'المدرسة' : 'School',
    memberSince: language === 'ar' ? 'عضو منذ' : 'Member Since',
    daysOfService: language === 'ar' ? 'يوم خدمة' : 'days of service',
    since: language === 'ar' ? 'منذ' : 'Since',
    
    // حالات الحساب
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    fullyOperational: language === 'ar' ? 'يعمل بكامل طاقته' : 'Fully operational',
    accountSuspended: language === 'ar' ? 'الحساب موقوف' : 'Account suspended',
    
    // معلومات الشخصية
    personalInfo: language === 'ar' ? 'معلومات مسئول شئون الطلاب' : 'Receptionist Information',
    personalDetails: language === 'ar' ? 'بياناتك الشخصية ومعلومات الاتصال' : 'Your personal and contact details',
    fullName: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
    emailAddress: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
    phoneNumber: language === 'ar' ? 'رقم الهاتف' : 'Phone Number',
    address: language === 'ar' ? 'العنوان' : 'Address',
    
    // ملخص النشاط
    activitySummary: language === 'ar' ? 'ملخص النشاط' : 'Activity Summary',
    activityDescription: language === 'ar' ? 'أنشطتك وأداؤك في شئون الطلاب' : 'Your reception activities and performance',
    workingPeriod: language === 'ar' ? 'فترة العمل' : 'Working Period',
    lastActivity: language === 'ar' ? 'آخر نشاط' : 'Last Activity',
    role: language === 'ar' ? 'الدور' : 'Role',
    
    // معلومات المدرسة
    schoolInfo: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    
    // حالات التحميل
    loadingReport: language === 'ar' ? 'جاري تحميل التقرير...' : 'Loading your report...',
    
    // الإجراءات السريعة
    quickActions: language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions',
    manageStudents: language === 'ar' ? 'إدارة الطلاب' : 'Manage Students',
    viewReports: language === 'ar' ? 'عرض التقارير' : 'View Reports',
    generateReport: language === 'ar' ? 'إنشاء تقرير' : 'Generate Report',
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchReceptionReport = async () => {
      try {
        setReportLoading(true);
        const data = await apiFetch('/user/check-auth');
        
        if (data && data.data) {
          setReceptionData(data.data);
        }
      } catch (error) {
        console.error('Error fetching reception report:', error);
      } finally {
        setReportLoading(false);
      }
    };

    if (user) {
      fetchReceptionReport();
    }
  }, [user]);

  if (loading || reportLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-muted-foreground">{t.loadingReport}</p>
      </div>
    );
  }

  // حساب مدة العمل
  const getWorkingDays = () => {
    if (!receptionData) return 0;
    const startDate = new Date(receptionData.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const workingDays = getWorkingDays();

  // دالة لتحديد الاتجاه
  const getDirectionClass = (baseClass: string) => {
    if (language === 'ar') {
      return baseClass.replace('space-x-', 'space-x-reverse-');
    }
    return baseClass;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                  <h1 className="text-3xl font-bold tracking-tight">{t.pageTitle}</h1>
                  <p className="text-muted-foreground mt-2">
                    {t.welcome}
                  </p>
                </div>
                <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse gap-4' : 'gap-4'}`}>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {language === 'ar' ? 'شئون الطلاب' : user.role}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
            {/* Working Days Card */}
            <Card className="relative overflow-hidden">
              <CardHeader className={`flex items-center justify-between pb-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <CardTitle className="text-sm font-medium">{t.workingDays}</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workingDays}</div>
                <p className="text-xs text-muted-foreground">
                  {t.since} {receptionData ? new Date(receptionData.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </CardContent>
            </Card>

            {/* Active Status Card */}
            <Card>
              <CardHeader className={`flex items-center justify-between pb-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <CardTitle className="text-sm font-medium">{t.accountStatus}</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge variant={receptionData?.active ? "default" : "secondary"}>
                    {receptionData?.active ? t.active : t.inactive}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {receptionData?.active ? t.fullyOperational : t.accountSuspended}
                </p>
              </CardContent>
            </Card>

            {/* School Card */}
            <Card>
              <CardHeader className={`flex items-center justify-between pb-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <CardTitle className="text-sm font-medium">{t.school}</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold truncate">{receptionData?.school.name}</div>
                <p className="text-xs text-muted-foreground truncate">
                  {receptionData?.school.address}
                </p>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card>
              <CardHeader className={`flex items-center justify-between pb-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <CardTitle className="text-sm font-medium">{t.memberSince}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {receptionData ? new Date(receptionData.created_at).toLocaleDateString() : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {workingDays} {t.daysOfService}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Reception Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <CardTitle>{t.personalInfo}</CardTitle>
                  </div>
                  <CardDescription>{t.personalDetails}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className={`flex items-center p-3 bg-blue-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-blue-900">{t.fullName}</p>
                          <p className="font-semibold text-blue-700">{receptionData?.name}</p>
                        </div>
                      </div>
                      <div className={`flex items-center p-3 bg-green-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-5 w-5 text-green-600" />
                        </div>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-green-900">{t.emailAddress}</p>
                          <p className="font-semibold text-green-700">{receptionData?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className={`flex items-center p-3 bg-purple-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Phone className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-purple-900">{t.phoneNumber}</p>
                          <p className="font-semibold text-purple-700">{receptionData?.phone}</p>
                        </div>
                      </div>
                      <div className={`flex items-center p-3 bg-orange-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-orange-900">{t.address}</p>
                          <p className="font-semibold text-orange-700">{receptionData?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <CardTitle>{t.activitySummary}</CardTitle>
                  </div>
                  <CardDescription>{t.activityDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center p-4 bg-blue-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-blue-900">{t.accountStatus}</p>
                          <p className="text-xl font-bold text-blue-600">
                            {receptionData?.active ? t.active : t.inactive}
                          </p>
                        </div>
                        <UserCheck className="h-8 w-8 text-blue-600 opacity-60" />
                      </div>
                      <div className={`flex justify-between items-center p-4 bg-green-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-green-900">{t.workingPeriod}</p>
                          <p className="text-xl font-bold text-green-600">{workingDays} {language === 'ar' ? 'يوم' : 'days'}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-green-600 opacity-60" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center p-4 bg-purple-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-purple-900">{t.lastActivity}</p>
                          <p className="text-lg font-bold text-purple-600">
                            {receptionData ? new Date(receptionData.updated_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-600 opacity-60" />
                      </div>
                      <div className={`flex justify-between items-center p-4 bg-orange-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-orange-900">{t.role}</p>
                          <p className="text-xl font-bold text-orange-600">
                            {language === 'ar' ? 'شئون الطلاب' : receptionData?.role}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-orange-600 opacity-60" />
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
                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                    <School className="h-5 w-5 text-purple-600" />
                    <CardTitle>{t.schoolInfo}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.schoolName}</p>
                    <p className="font-medium">{receptionData?.school.name}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.address}</p>
                    <p className="font-medium text-sm">{receptionData?.school.address}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.phoneNumber}</p>
                    <p className="font-medium">{receptionData?.school.phone}</p>
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">{t.emailAddress}</p>
                    <p className="font-medium">{receptionData?.school.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                    <UserPlus className="h-5 w-5 text-green-600" />
                    <CardTitle>{t.quickActions}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className={`w-full justify-start ${language === 'ar' ? 'flex-row-reverse' : ''}`} variant="outline">
                    <Users className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t.manageStudents}
                  </Button>
                  <Button className={`w-full justify-start ${language === 'ar' ? 'flex-row-reverse' : ''}`} variant="outline">
                    <FileText className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t.viewReports}
                  </Button>
                  <Button className={`w-full justify-start ${language === 'ar' ? 'flex-row-reverse' : ''}`} variant="outline">
                    <TrendingUp className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t.generateReport}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}