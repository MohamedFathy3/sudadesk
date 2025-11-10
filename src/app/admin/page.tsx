"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, School, Calendar, RefreshCw, Users, Building2, ArrowUp, Activity } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, BarChart, Bar, ResponsiveContainer, Dot, Tooltip } from 'recharts';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  ChartConfig,
  ChartContainer,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Types for our data
interface ReportItem {
  month: string;
  schools_count: number;
}

interface ReportData {
  message: string;
  report: ReportItem[];
  total_schools: number;
}

// Chart configurations
const lineChartConfig = {
  schools_count: {
    label: "Number of Schools",
    color: "hsl(142, 76%, 36%)",
  },
} satisfies ChartConfig;

// Custom Tooltip component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-sm">
        <p className="text-green-900 font-medium">{label}</p>
        <p className="text-green-600">
          Schools: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SchoolsMonthlyReport() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [authLoading, user, router]);

  // Function to fetch data from API using apiFetch
  const fetchReportData = async (forceRefresh = false) => {
    try {
      setDataLoading(true);
      setError(null);

      // Check cache if not forced refresh
      if (!forceRefresh) {
        const cachedData = localStorage.getItem('schoolsReport');
        const cacheTimestamp = localStorage.getItem('schoolsReportTimestamp');
        
        if (cachedData && cacheTimestamp) {
          const cacheAge = Date.now() - parseInt(cacheTimestamp);
          const TEN_MINUTES = 10 * 60 * 1000;
          
          if (cacheAge < TEN_MINUTES) {
            const parsedData: ReportData = JSON.parse(cachedData);
            setReportData(parsedData);
            setLastUpdated(new Date(parseInt(cacheTimestamp)));
            setDataLoading(false);
            return;
          }
        }
      }

      const data: ReportData = await apiFetch('/reports/schools-by-month', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('schoolsReport', JSON.stringify(data));
      localStorage.setItem('schoolsReportTimestamp', Date.now().toString());

      setReportData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching report data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch data on component mount after auth check
  useEffect(() => {
    if (user && !authLoading) {
      fetchReportData();
    }
  }, [user, authLoading]);

  // Prepare data for charts
  const chartData = reportData?.report?.map(item => ({
    month: item.month,
    schools_count: item.schools_count,
    fill: "hsl(142, 76%, 36%)"
  })).reverse() || [];

  // Calculate total schools
  const totalSchools = reportData?.total_schools || 0;
  const activeMonths = reportData?.report?.filter(item => item.schools_count > 0).length || 0;
  const totalMonths = reportData?.report?.length || 0;

  // Show loading while checking auth or loading data
  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-green-700 font-medium">Checking your login status...</p>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
                <p className="text-green-700 font-medium text-lg">Loading Schools Report...</p>
                <p className="text-green-600 text-sm mt-2">Fetching the latest data</p>
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
        <div className="container mx-auto p-6">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-red-700 font-medium text-lg mb-2">Error loading data</p>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => fetchReportData(true)} 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto p-6 space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-green-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Schools Monthly Report
                </h1>
                <p className="text-green-600 font-medium">
                  Welcome back, {user?.name}! Heres your educational overview.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => fetchReportData(true)}
                variant="outline"
                className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                disabled={dataLoading}
              >
                <RefreshCw className={`h-4 w-4 ${dataLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4" />
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {reportData?.message && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <p className="font-semibold text-lg">
                  {reportData.message}
                </p>
              </div>
            </div>
          )}

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Schools Card */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-green-700">Total Schools</CardTitle>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <School className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-2">{totalSchools}</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp className="h-3 w-3" />
                    <span>0% growth</span>
                  </div>
                  <span className="text-green-400">•</span>
                  <span className="text-green-500">All time</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Months Card */}
            <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-emerald-700">Active Months</CardTitle>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-900 mb-2">{activeMonths}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-600">{Math.round((activeMonths / totalMonths) * 100)}% active rate</span>
                  <span className="text-emerald-400">•</span>
                  <span className="text-emerald-500">{totalMonths} total months</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Card */}
            <Card className="bg-gradient-to-br from-white to-teal-50 border-teal-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-teal-700">Performance</CardTitle>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-teal-900 mb-2">Excellent</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-teal-600">Stable growth</span>
                  <span className="text-teal-400">•</span>
                  <span className="text-teal-500">Monitoring</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Line Chart with Dots */}
            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Growth Trend
                </CardTitle>
                <CardDescription className="text-green-600">
                  Visualizing school registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={lineChartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 24,
                        left: 24,
                        right: 24,
                        bottom: 24,
                      }}
                    >
                      <CartesianGrid vertical={false} stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        tickFormatter={(value: string) => value.split(' ')[0]}
                        stroke="#6b7280"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        dataKey="schools_count"
                        type="monotone"
                        stroke="hsl(142, 76%, 36%)"
                        strokeWidth={3}
                        dot={({ payload, ...props }) => {
                          return (
                            <Dot
                              key={payload.month}
                              r={6}
                              cx={props.cx}
                              cy={props.cy}
                              fill="hsl(142, 76%, 36%)"
                              stroke="white"
                              strokeWidth={2}
                            />
                          )
                        }}
                        activeDot={{ r: 8, fill: "hsl(142, 76%, 36%)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="bg-green-50 border-t border-green-200">
                <div className="flex items-center gap-3 text-sm text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Each dot represents a month with school activity</span>
                </div>
              </CardFooter>
            </Card>

            {/* Bar Chart */}
            <Card className="border-emerald-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Distribution Overview
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  School count comparison across months
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      tickFormatter={(value: string) => value.split(' ')[0]}
                      stroke="#6b7280"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="schools_count" 
                      fill="hsl(142, 76%, 36%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="bg-emerald-50 border-t border-emerald-200">
                <div className="flex items-center gap-3 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Bar height shows number of schools registered</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Monthly Report Cards Grid - جنب بعض */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reportData?.report?.map((item: ReportItem, index: number) => (
              <Card 
                key={index} 
                className="border-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-green-900">
                      {item.month}
                    </CardTitle>
                    <div className={`w-3 h-3 rounded-full ${item.schools_count > 0 ? 'bg-green-500 animate-pulse' : 'bg-green-200'}`}></div>
                  </div>
                  <CardDescription className="text-green-600">
                    School Registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <School className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold text-green-700">
                        {item.schools_count}
                      </span>
                    </div>
                    <Badge 
                      variant={item.schools_count > 0 ? "default" : "secondary"}
                      className={item.schools_count > 0 
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" 
                        : "bg-green-50 text-green-500 border-green-100"
                      }
                    >
                      {item.schools_count === 1 ? 'school' : 'schools'}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t border-green-100">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Calendar className="h-3 w-3" />
                    <span>Monthly report</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Alternative Detailed View - إذا كنت تفضل العرض التقليدي */}
          <Card className="border-green-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Breakdown - Detailed View
              </CardTitle>
              <CardDescription className="text-green-600">
                Complete school registration timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {reportData?.report?.map((item: ReportItem, index: number) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-green-100 hover:border-green-300 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${item.schools_count > 0 ? 'bg-green-500' : 'bg-green-200'}`}></div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-green-900">{item.month}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={item.schools_count > 0 ? "default" : "secondary"}
                      className={item.schools_count > 0 
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" 
                        : "bg-green-50 text-green-500 border-green-100"
                      }
                    >
                      {item.schools_count} {item.schools_count === 1 ? 'school' : 'schools'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}