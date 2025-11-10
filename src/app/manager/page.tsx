"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Users, Calendar, RefreshCw, UserCheck, BookOpen, GraduationCap, Briefcase, Shield, DollarSign, UserCog } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for our data
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

// Role configuration with green theme
const roleConfig = {
  reception: {
    label: "Reception",
    color: "hsl(142, 76%, 36%)",
    icon: UserCog,
    description: "Front desk and reception staff",
  },
  hr: {
    label: "HR",
    color: "hsl(142, 76%, 36%)",
    icon: Users,
    description: "Human Resources department",
  },
  accountant: {
    label: "Accountant",
    color: "hsl(142, 76%, 36%)",
    icon: DollarSign,
    description: "Finance and accounting team",
  },
  director: {
    label: "Director",
    color: "hsl(142, 76%, 36%)",
    icon: Shield,
    description: "School directors and management",
  },
  class_supervisor: {
    label: "Class Supervisor",
    color: "hsl(142, 76%, 36%)",
    icon: UserCheck,
    description: "Class supervisors and coordinators",
  },
  teacher: {
    label: "Teacher",
    color: "hsl(142, 76%, 36%)",
    icon: BookOpen,
    description: "Teaching staff and educators",
  },
  student: {
    label: "Student",
    color: "hsl(142, 76%, 36%)",
    icon: GraduationCap,
    description: "Student registrations",
  }
};

// Chart configurations
const lineChartConfig = {
  count: {
    label: "Number of Users",
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
          Users: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function RolesMonthlyReport() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [reportData, setReportData] = useState<RolesReportData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeRole, setActiveRole] = useState<keyof typeof roleConfig>('reception');

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
        const cachedData = localStorage.getItem('rolesReport');
        const cacheTimestamp = localStorage.getItem('rolesReportTimestamp');
        
        if (cachedData && cacheTimestamp) {
          const cacheAge = Date.now() - parseInt(cacheTimestamp);
          const TEN_MINUTES = 10 * 60 * 1000;
          
          if (cacheAge < TEN_MINUTES) {
            const parsedData: RolesReportData = JSON.parse(cachedData);
            setReportData(parsedData);
            setLastUpdated(new Date(parseInt(cacheTimestamp)));
            setDataLoading(false);
            return;
          }
        }
      }

      const data: RolesReportData = await apiFetch('/reports/roles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('rolesReport', JSON.stringify(data));
      localStorage.setItem('rolesReportTimestamp', Date.now().toString());

      setReportData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching roles report data:', err);
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

  // Calculate totals
  const totalUsers = Object.values(reportData?.reports || {}).reduce(
    (sum, role) => sum + (role?.total_count || 0), 0
  );

  const activeRoles = Object.values(reportData?.reports || {}).filter(
    role => (role?.total_count || 0) > 0
  ).length;

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
                <p className="text-green-700 font-medium text-lg">Loading Roles Report...</p>
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
                <Users className="h-6 w-6 text-red-500" />
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
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Roles Monthly Report
                </h1>
                <p className="text-green-600 font-medium">
                  Welcome back, {user?.name}! User roles overview and analytics.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 flex-wrap">
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

          {/* Overall Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-green-700">Total Users</CardTitle>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-2">{totalUsers}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">Across all roles</span>
                  <span className="text-green-400">•</span>
                  <span className="text-green-500">7 role types</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-emerald-700">Active Roles</CardTitle>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-900 mb-2">{activeRoles}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-600">With registered users</span>
                  <span className="text-emerald-400">•</span>
                  <span className="text-emerald-500">Out of 7 roles</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-teal-50 border-teal-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-teal-700">System Status</CardTitle>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-teal-900 mb-2">Optimal</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-teal-600">All systems operational</span>
                  <span className="text-teal-400">•</span>
                  <span className="text-teal-500">Monitoring</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Role Selection Tabs - Fixed Height Container */}
          <Card className="border-green-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Role Analytics
              </CardTitle>
              <CardDescription className="text-green-600">
                Select a role to view detailed monthly reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as keyof typeof roleConfig)} className="space-y-6">
                {/* Tabs List - Fixed with better spacing */}
                <div className="bg-green-50 rounded-lg p-2">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 w-full h-auto">
                    {Object.entries(roleConfig).map(([key, role]) => {
                      const IconComponent = role.icon;
                      const roleData = reportData?.reports?.[key as keyof typeof roleConfig];
                      return (
                        <TabsTrigger 
                          key={key} 
                          value={key}
                          className="flex flex-col items-center gap-1 h-auto p-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 data-[state=active]:border-green-300 border border-transparent rounded-md transition-all"
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

                {/* Tab Content with proper spacing */}
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
                      {/* Role Header - Compact */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-green-900">
                              {role.label} Report
                            </h3>
                            <p className="text-green-600 text-sm">{role.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-900">
                            {roleData?.total_count || 0}
                          </div>
                          <p className="text-green-600 text-sm">Total Users</p>
                        </div>
                      </div>

                      {/* Charts Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-green-200 shadow-sm">
                          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 py-4">
                            <CardTitle className="text-green-800 flex items-center gap-2 text-base">
                              <TrendingUp className="h-4 w-4" />
                              Monthly Growth
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
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                  dataKey="count"
                                  type="monotone"
                                  stroke="hsl(142, 76%, 36%)"
                                  strokeWidth={2}
                                  dot={({ payload, ...props }) => {
                                    return (
                                      <Dot
                                        key={payload.month}
                                        r={4}
                                        cx={props.cx}
                                        cy={props.cy}
                                        fill="hsl(142, 76%, 36%)"
                                        stroke="white"
                                        strokeWidth={1}
                                      />
                                    )
                                  }}
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
                              Distribution
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
                                <Tooltip content={<CustomTooltip />} />
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

                      {/* Monthly Breakdown Cards - Compact */}
                      <div>
                        <h4 className="text-lg font-semibold text-green-800 mb-4">Monthly Breakdown</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {roleData?.monthly_report?.map((item: MonthlyReportItem, index: number) => (
                            <Card 
                              key={index} 
                              className="border-green-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300"
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-3 w-3 text-green-500" />
                                    <span className="text-sm font-medium text-green-900">{item.month}</span>
                                  </div>
                                  <Badge 
                                    variant={item.count > 0 ? "default" : "secondary"}
                                    className="text-xs bg-green-100 text-green-700 border-green-200"
                                  >
                                    {item.count} {item.count === 1 ? 'user' : 'users'}
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