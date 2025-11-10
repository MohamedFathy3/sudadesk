// app/teacher/report/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from '@/lib/api';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  Award, 
  Clock, 
  School, 
  UserCheck,
  TrendingUp,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useTranslation } from 'react-i18next';
// استيراد مكونات shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Class {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
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
  school: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
  };
  classes: Class[];
  created_at: string;
  updated_at: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exams: any[];
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function TeacherReport() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [reportLoading, setReportLoading] = useState(true);
  const { t, i18n } = useTranslation();

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

  // إعداد بيانات الرسوم البيانية
  const chartData = teacherData?.classes.map((classItem, index) => ({
    name: classItem.name.length > 10 ? classItem.name.substring(0, 10) + '...' : classItem.name,
    fullName: classItem.name,
    students: parseInt(classItem.count),
    fill: COLORS[index % COLORS.length],
  })) || [];

  const classDistributionData = [
    { name: 'Active Classes', value: teacherData?.classes.filter(cls => cls.active).length || 0 },
    { name: 'Inactive Classes', value: teacherData?.classes.filter(cls => !cls.active).length || 0 },
  ];

  const studentProgressData = [
    { month: 'Jan', students: 65 },
    { month: 'Feb', students: 78 },
    { month: 'Mar', students: 90 },
    { month: 'Apr', students: 81 },
    { month: 'May', students: 56 },
    { month: 'Jun', students: 55 },
    { month: 'Jul', students: 40 },
  ];

  if (loading || reportLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
<p className="text-lg text-muted-foreground">{t('loading_report')}</p>      </div>
    );
  }

  // حساب الإحصائيات
  const totalStudents = teacherData?.classes.reduce((sum, cls) => sum + parseInt(cls.count), 0) || 0;
  const activeClasses = teacherData?.classes.filter(cls => cls.active).length || 0;
  const totalClasses = teacherData?.classes.length || 0;
  const activePercentage = (activeClasses / Math.max(totalClasses, 1)) * 100;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{t('teacher_dashboard')}</h1>
                  <p className="text-muted-foreground mt-2">
                    {t('overview')}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  Active across all classes
                </p>
              </CardContent>
            </Card>

            {/* Classes Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Classes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClasses}</div>
                <p className="text-xs text-muted-foreground">
                  {activeClasses} active • {totalClasses - activeClasses} inactive
                </p>
                <Progress value={activePercentage} className="h-1 mt-2" />
              </CardContent>
            </Card>

            {/* School Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">School</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold truncate">{teacherData?.school.name}</div>
                <p className="text-xs text-muted-foreground truncate">
                  {teacherData?.school.address}
                </p>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {teacherData ? new Date(teacherData.created_at).toLocaleDateString() : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Teaching for {teacherData ? Math.floor((new Date().getTime() - new Date(teacherData.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0} days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pie Chart - Class Distribution */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Class Distribution</CardTitle>
                    <CardDescription>Active vs Inactive classes</CardDescription>
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
                    <CardTitle>Students per Class</CardTitle>
                    <CardDescription>Distribution of students across your classes</CardDescription>
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
                          <Tooltip 
                            formatter={(value, name) => [value, 'Students']}
                            labelFormatter={(label, payload) => {
                              const data = payload?.[0]?.payload;
                              return data?.fullName || label;
                            }}
                          />
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
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress Trend</CardTitle>
                  <CardDescription>Monthly student engagement overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentProgressData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <CardTitle>My Classes ({totalClasses})</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <CardDescription>Manage and view your assigned classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData?.classes.map((classItem) => (
                      <Card key={classItem.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{classItem.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{classItem.count} students</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(classItem.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={classItem.active ? "default" : "secondary"}>
                              {classItem.active ? 'Active' : 'Inactive'}
                            </Badge>
                          
                             
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {(!teacherData?.classes || teacherData.classes.length === 0) && (
                      <Card className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <CardDescription>No classes assigned yet</CardDescription>
                        <Button className="mt-4">Create First Class</Button>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <CardTitle>Performance Summary</CardTitle>
                  </div>
                  <CardDescription>Your teaching performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Class Coverage</p>
                          <p className="text-2xl font-bold text-blue-600">{activePercentage.toFixed(1)}%</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-blue-600 opacity-60" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-green-900 dark:text-green-100">Student Reach</p>
                          <p className="text-2xl font-bold text-green-600">{totalStudents}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600 opacity-60" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Active Status</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {teacherData?.active ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600 opacity-60" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Last Activity</p>
                          <p className="text-lg font-bold text-orange-600">
                            {teacherData ? new Date(teacherData.updated_at).toLocaleDateString() : 'N/A'}
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
                  <div className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-purple-600" />
                    <CardTitle>School Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="font-medium">{teacherData?.school.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="font-medium text-sm">{teacherData?.school.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="font-medium">{teacherData?.school.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{teacherData?.school.email}</p>
                  </div>
                </CardContent>
              </Card>

            

              {/* Status Badge */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 border-0">
                <CardContent className="p-6 text-primary-foreground">
                  <div className="flex items-center space-x-3 mb-4">
                    <UserCheck className="h-6 w-6" />
                    <CardTitle className="text-primary-foreground">Teacher Status</CardTitle>
                  </div>
                  <p className="text-primary-foreground/80 mb-4 text-sm">
                    You are currently <strong>{teacherData?.active ? 'active' : 'inactive'}</strong> and teaching <strong>{totalClasses}</strong> classes
                  </p>
                  <div className="bg-primary-foreground/20 rounded-lg p-4 text-center">
                    <p className="font-bold text-2xl">{totalStudents}</p>
                    <p className="text-primary-foreground/80 text-sm">Students under your guidance</p>
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