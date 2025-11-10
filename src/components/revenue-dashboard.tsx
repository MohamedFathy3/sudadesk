// components/revenue-dashboard.tsx
"use client"

import { TrendingUp, DollarSign, Calendar, BarChart3, LineChart as LineChartIcon } from "lucide-react"
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Revenue data
const revenueData = {
  success: true,
  year: "2025",
  monthly: [
    { month: "January", total_amount: "0" },
    { month: "February", total_amount: "0" },
    { month: "March", total_amount: "0" },
    { month: "April", total_amount: "0" },
    { month: "May", total_amount: "0" },
    { month: "June", total_amount: "0" },
    { month: "July", total_amount: "0" },
    { month: "August", total_amount: "0" },
    { month: "September", total_amount: "0" },
    { month: "October", total_amount: "0" },
    { month: "November", total_amount: "222.17" },
    { month: "December", total_amount: "0" }
  ],
  total_all_months: "222.17"
}

// Chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(142, 76%, 36%)",
  },
} satisfies ChartConfig

const COLORS = ['#10b981', '#34d399', '#6ee7b7'];

export function RevenueDashboard() {
  // Prepare data
  const chartData = revenueData.monthly.map(item => ({
    month: item.month,
    revenue: parseFloat(item.total_amount),
  }))

  const activeMonths = revenueData.monthly.filter(item => parseFloat(item.total_amount) > 0).length
  const averageMonthly = parseFloat(revenueData.total_all_months) / 12

  return (
    <div className="space-y-6">
      {/* Total Revenue Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${revenueData.total_all_months}</div>
          <p className="text-xs text-muted-foreground">
            January - December 2025
          </p>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Months</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMonths}</div>
            <p className="text-xs text-muted-foreground">Months with revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageMonthly.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per month average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Month</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">November</div>
            <p className="text-xs text-muted-foreground">$222.17 revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="bar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
        </TabsList>

        {/* Bar Chart */}
        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue - Bar Chart</CardTitle>
              <CardDescription>Revenue distribution by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltipContent />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Line Chart */}
        <TabsContent value="line">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend - Line Chart</CardTitle>
              <CardDescription>Monthly revenue progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltipContent />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Area Chart */}
        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview - Area Chart</CardTitle>
              <CardDescription>Cumulative revenue visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltipContent />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Breakdown</CardTitle>
          <CardDescription>Detailed revenue per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {revenueData.monthly.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${parseFloat(month.total_amount) > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="font-medium">{month.month}</span>
                </div>
                <span className={`font-semibold ${parseFloat(month.total_amount) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  ${month.total_amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}