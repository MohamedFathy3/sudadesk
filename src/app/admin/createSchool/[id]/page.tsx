// app/schools/[id]/expenses-report/page.tsx
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
import { ArrowLeft, Download, Calendar, DollarSign, TrendingUp, BarChart3, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MonthlyExpense {
  month: string;
  amount: string | number;
}

interface ExpensesReport {
  year: number;
  school_id: number | null;
  data: MonthlyExpense[];
  total: number;
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

// Custom Tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, language }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <p className="text-blue-900 font-medium">{label}</p>
        <p className="text-blue-600">
          {language === 'ar' ? 'المبلغ:' : 'Amount:'} 
          <span className="font-semibold ml-1">
            {typeof payload[0].value === 'number' ? 
              payload[0].value.toLocaleString() : 
              parseFloat(payload[0].value || '0').toLocaleString()
            } 
            {language === 'ar' ? ' جنيه' : ' EGP'}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SchoolExpensesReport() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const [reportData, setReportData] = useState<ExpensesReport | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Translations
  const t = {
    pageTitle: language === 'ar' ? 'تقرير المصروفات الشهرية' : 'Monthly Expenses Report',
    backToSchools: language === 'ar' ? 'العودة إلى المدارس' : 'Back to Schools',
    loading: language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...',
    error: language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data',
    tryAgain: language === 'ar' ? 'حاول مرة أخرى' : 'Try Again',
    schoolInfo: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    expensesReport: language === 'ar' ? 'تقرير المصروفات' : 'Expenses Report',
    totalExpenses: language === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses',
    monthlyExpenses: language === 'ar' ? 'المصروفات الشهرية' : 'Monthly Expenses',
    monthlyTrend: language === 'ar' ? 'الاتجاه الشهري' : 'Monthly Trend',
    expenseDistribution: language === 'ar' ? 'توزيع المصروفات' : 'Expense Distribution',
    amount: language === 'ar' ? 'المبلغ' : 'Amount',
    month: language === 'ar' ? 'الشهر' : 'Month',
    noData: language === 'ar' ? 'لا توجد بيانات' : 'No data available',
    downloadReport: language === 'ar' ? 'تحميل التقرير' : 'Download Report',
    year: language === 'ar' ? 'سنة' : 'Year',
    egp: language === 'ar' ? 'جنيه' : 'EGP',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    manager: language === 'ar' ? 'المدير' : 'Manager',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
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

  // Fetch expenses report
  const fetchExpensesReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const report: ExpensesReport = await apiFetch(`/reports/monthly-expenses?X-School-ID=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setReportData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching expenses report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExpensesReport();
    }
  }, [id]);

  // Format chart data
  const chartData = reportData?.data?.map(item => ({
    month: item.month,
    amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
    formattedAmount: typeof item.amount === 'string' ? 
      parseFloat(item.amount).toLocaleString() : 
      item.amount.toLocaleString()
  })) || [];

  const handleDownload = () => {
    // Implement PDF download functionality here
    alert(language === 'ar' ? 'سيتم تنزيل التقرير قريباً' : 'Report download will be available soon');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-blue-700 font-medium text-lg">{t.loading}</p>
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
                <BarChart3 className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-red-700 font-medium text-lg mb-2">{t.error}</p>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => fetchExpensesReport()} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                onClick={() => router.push('/schools')}
                className={`flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backToSchools}
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
                  {t.pageTitle}
                </h1>
                {schoolInfo && (
                  <p className="text-blue-600 font-medium">
                    {schoolInfo.name} - {t.year} {reportData?.year}
                  </p>
                )}
              </div>
            </div>

            <Button 
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {t.downloadReport}
            </Button>
          </div>

          {/* School Information Card */}
          {/* {schoolInfo && (
            <Card className="border-blue-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t.schoolInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {schoolInfo.logo ? (
                        <img 
                          src={schoolInfo.logo} 
                          alt={schoolInfo.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {schoolInfo?.name?.charAt(0) || 'S'}
                        </div>
                      )}
                    </div>
                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                      <p className="text-sm text-blue-600">{t.schoolName}</p>
                      <p className="font-semibold text-blue-900">{schoolInfo.name}</p>
                    </div>
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-blue-600">{t.manager}</p>
                    <p className="font-semibold text-blue-900">{schoolInfo.data?.manager_name || t.notAvailable}</p>
                    {schoolInfo.manager_email && (
                      <p className="text-xs text-blue-600">{schoolInfo.data?.manager_email}</p>
                    )}
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-blue-600">{t.email}</p>
                    <p className="font-semibold text-blue-900">{schoolInfo.data?.email || t.notAvailable}</p>
                    <p className="text-xs text-blue-600">{schoolInfo.data?.phone || t.notAvailable}</p>
                  </div>

                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-blue-600">{t.address}</p>
                    <p className="font-semibold text-blue-900 text-sm">
                      {schoolInfo.data?.address || t.notAvailable}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Total Expenses Card */}
          <Card className="border-green-200 shadow-sm">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-green-600 font-medium">{t.totalExpenses}</p>
                    <p className="text-3xl font-bold text-green-900">
                      {reportData?.total?.toLocaleString() || '0'} {t.egp}
                    </p>
                    <p className="text-green-600 text-sm">
                      {t.year} {reportData?.year}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-4 py-2">
                  {reportData?.data?.filter(item => (typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount) > 0).length || 0} {language === 'ar' ? 'شهر' : 'months'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trend Chart */}
            <Card className="border-blue-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 py-4">
                <CardTitle className="text-blue-800 flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4" />
                  {t.monthlyTrend}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
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
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip content={<CustomTooltip language={language} />} />
                    <Line
                      dataKey="amount"
                      type="monotone"
                      stroke="hsl(221, 83%, 53%)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "hsl(221, 83%, 53%)", stroke: "white", strokeWidth: 1 }}
                      activeDot={{ r: 6, fill: "hsl(221, 83%, 53%)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Distribution Chart */}
            <Card className="border-blue-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 py-4">
                <CardTitle className="text-blue-800 flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" />
                  {t.expenseDistribution}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip content={<CustomTooltip language={language} />} />
                    <Bar 
                      dataKey="amount" 
                      fill="hsl(221, 83%, 53%)" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Breakdown Cards */}
          <Card className="border-blue-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t.monthlyExpenses}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {reportData?.data && reportData.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {reportData.data.map((item, index) => {
                    const amount = typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount;
                    return (
                      <Card 
                        key={index} 
                        className="border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      >
                        <CardContent className="p-4">
                          <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                <DollarSign className={`h-5 w-5 ${
                                  amount > 0 ? 'text-green-600' : 'text-gray-400'
                                }`} />
                              </div>
                              <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                                <p className="font-semibold text-blue-900">{item.month}</p>
                                <p className={`text-sm font-medium ${
                                  amount > 0 ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {amount.toLocaleString()} {t.egp}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              variant={amount > 0 ? "default" : "secondary"}
                              className={`${
                                amount > 0 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              {amount > 0 ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'لا يوجد' : 'No Data')}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">{t.noData}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}