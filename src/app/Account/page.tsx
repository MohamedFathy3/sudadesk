// app/revenue/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { TrendingUp, Filter, DollarSign, ShoppingCart, Package, BarChart3, Users, CreditCard, Target } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, PieChart, Pie, Cell, Area, AreaChart, ResponsiveContainer } from "recharts";

interface MonthlyRevenueData {
  [key: string]: string;
}

interface RevenueReportData {
  monthly_revenue: MonthlyRevenueData;
  revenue_per_month: MonthlyRevenueData;
  total_revenue: string;
  average_monthly: string;
  peak_month: string;
  peak_amount: string;
  growth_rate: string;
}

export default function RevenuePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reportData, setReportData] = useState<RevenueReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState<number>(6);

  // الألوان المستخدمة في التصميم
  const primaryColor = "#10b981"; // الأخضر الأساسي
  const secondaryColor = "#039fb3"; // الأزرق الفاتح

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // بيانات تجريبية مع بيانات أكثر واقعية
        const mockData: RevenueReportData = {
          monthly_revenue: {
            "January": "150.50",
            "February": "180.25", 
            "March": "220.75",
            "April": "190.30",
            "May": "210.45",
            "June": "195.60",
            "July": "230.80",
            "August": "245.90",
            "September": "260.15",
            "October": "240.70",
            "November": "222.17",
            "December": "280.40"
          },
          revenue_per_month: {
            "January": "150.50",
            "February": "180.25",
            "March": "220.75", 
            "April": "190.30",
            "May": "210.45",
            "June": "195.60",
            "July": "230.80",
            "August": "245.90",
            "September": "260.15",
            "October": "240.70",
            "November": "222.17",
            "December": "280.40"
          },
          total_revenue: "2658.02",
          average_monthly: "221.50",
          peak_month: "December",
          peak_amount: "280.40",
          growth_rate: "12.3"
        };
        
        setReportData(mockData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchRevenueData();
    }
  }, [user]);

  // تحويل البيانات للرسوم البيانية
  const transformMonthlyData = (data: MonthlyRevenueData): Array<{ month: string; revenue: number }> => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map(month => ({
      month: month.slice(0, 3), 
      revenue: parseFloat(data[month] || "0"),
      fullMonth: month
    }));
  };

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-700 dark:text-gray-300">Checking your login status...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  const prepareChartData = (data: Array<{ month: string; revenue: number }>) => {
    return data.slice(-selectedMonths);
  };

  const lineChartConfig = {
    revenue: {
      label: "Revenue",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const barChartConfig = {
    revenue: {
      label: "Revenue",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const pieChartConfig = {
    revenue: {
      label: "Revenue",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const areaChartConfig = {
    revenue: {
      label: "Revenue",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  // ألوان للـ Pie Chart
  const PIE_COLORS = [
    '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', 
    '#059669', '#047857', '#065f46', '#064e3b',
    '#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7'
  ];

  // مكونات الرسوم البيانية المعدلة

  const RevenueLineChart = ({ data, title, description, total }: { 
    data: Array<{ month: string; revenue: number }>, 
    title: string, 
    description: string,
    total: string 
  }) => {
    const chartData = prepareChartData(data);
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="currentColor" 
                strokeOpacity={0.2}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="revenue"
                type="monotone"
                stroke={`var(--color-revenue)`}
                strokeWidth={3}
                dot={{
                  fill: `var(--color-revenue)`,
                  strokeWidth: 2,
                  r: 5,
                  stroke: '#fff'
                }}
                activeDot={{
                  r: 7,
                  stroke: '#fff',
                  strokeWidth: 2,
                  fill: `var(--color-revenue)`,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Last {selectedMonths} months <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            {chartData.filter(item => item.revenue > 0).length} months with revenue
          </div>
        </CardFooter>
      </Card>
    );
  };

  const RevenueBarChart = ({ title, description }: { 
    title: string, 
    description: string,
  }) => {
    const revenueData = transformMonthlyData(reportData?.revenue_per_month || {});
    const chartData = prepareChartData(revenueData);

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${reportData?.total_revenue || "0"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart 
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="currentColor" 
                strokeOpacity={0.2}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar 
                dataKey="revenue" 
                fill="var(--color-revenue)" 
                stroke="var(--color-revenue)"
                strokeWidth={1}
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Revenue Distribution <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Last {selectedMonths} months revenue
          </div>
        </CardFooter>
      </Card>
    );
  };

  const RevenuePieChart = ({ data, title, description, total }: { 
    data: Array<{ month: string; revenue: number }>, 
    title: string, 
    description: string,
    total: string 
  }) => {
    const chartData = prepareChartData(data)
      .filter(item => item.revenue > 0) // عرض فقط الأشهر ذات الإيرادات
      .map(item => ({
        name: item.month,
        value: item.revenue
      }));

    return (
      <Card>
        <CardHeader className="items-center pb-4">
          <div className="flex justify-between items-center w-full">
            <div className="text-center flex-1">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <Target className="h-5 w-5" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          {chartData.length > 0 ? (
        <ChartContainer
  config={pieChartConfig}
  className="mx-auto aspect-square max-h-[250px]"
>
  <PieChart>
    <ChartTooltip
      cursor={false}
      content={<ChartTooltipContent />}
    />
    <Pie
      data={chartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
      labelLine={false}
    >
      {chartData.map((entry, index) => (
        <Cell 
          key={`cell-${index}`} 
          fill={PIE_COLORS[index % PIE_COLORS.length]} 
        />
      ))}
    </Pie>
  </PieChart>
</ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-gray-500">
              No revenue data available for the selected period
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Revenue Distribution <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            Last {selectedMonths} months
          </div>
        </CardFooter>
      </Card>
    );
  };

  const RevenueAreaChart = ({ data, title, description, total }: { 
    data: Array<{ month: string; revenue: number }>, 
    title: string, 
    description: string,
    total: string 
  }) => {
    const chartData = prepareChartData(data);
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${total}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaChartConfig}>
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="currentColor" 
                strokeOpacity={0.2}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Area
                dataKey="revenue"
                type="monotone"
                stroke={`var(--color-revenue)`}
                strokeWidth={3}
                fill={`var(--color-revenue)`}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Revenue trends <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Last {selectedMonths} months trend
          </div>
        </CardFooter>
      </Card>
    );
  };

  const monthlyData = transformMonthlyData(reportData?.monthly_revenue || {});

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Revenue Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and analyze your revenue performance and trends.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by months:
              </span>
            </div>
            <div className="flex gap-2">
              {[3, 6, 12].map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedMonths(months)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedMonths === months
                      ? 'bg-[#10b981] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Last {months} months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-xl p-4 border text-center">
            <div className="text-2xl font-bold text-[#10b981]">${reportData?.total_revenue || "0"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Revenue</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-[#039fb3]">${reportData?.average_monthly || "0"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Monthly</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-[#f59e0b]">{reportData?.peak_month || "N/A"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Peak Month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-[#ef4444]">{reportData?.growth_rate || "0"}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Growth Rate</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueLineChart 
            data={monthlyData}
            title="Revenue Growth Trend"
            description="Monthly revenue progression over time"
            total={reportData?.total_revenue || "0"}
          />

          <RevenueBarChart 
            title="Revenue Distribution"
            description="Monthly revenue breakdown and comparison"
          />

          <RevenuePieChart 
            data={monthlyData}
            title="Revenue Share"
            description="Revenue distribution by month"
            total={reportData?.total_revenue || "0"}
          />

          <RevenueAreaChart 
            data={monthlyData}
            title="Revenue Trends"
            description="Cumulative revenue visualization"
            total={reportData?.total_revenue || "0"}
          />
        </div>

        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
            <CardDescription>Detailed revenue for each month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
        {monthlyData.map((monthData, index) => (
  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
      />
      <span className="font-medium">{monthData.month}</span> {/* استخدام month بدلاً من fullMonth */}
    </div>
    <span className={`font-semibold ${monthData.revenue > 0 ? 'text-green-600' : 'text-gray-500'}`}>
      ${monthData.revenue.toFixed(2)}
    </span>
  </div>
))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}