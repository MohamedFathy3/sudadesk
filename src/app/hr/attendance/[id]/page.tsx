'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/MainLayout';
interface AttendanceReport {
  message: string;
  employee: {
    id: number;
    name: string;
    role: string;
  };
  attendance_report: Array<{
    month: string;
    details: Array<{
      attendance_date: string;
      status: 'present' | 'absent';
    }>;
    summary: {
      total_days: number;
      present_days: number;
      absent_days: number;
      leave_days: number;
    };
  }>;
}

export default function EmployeeAttendanceReport() {
  const params = useParams();
  const id = params.id;
  const { language } = useLanguage();
  const [report, setReport] = useState<AttendanceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const t = {
    // Loading and Error States
    loading: language === 'ar' ? 'جاري تحميل تقرير الحضور...' : 'Loading attendance report...',
    error: language === 'ar' ? 'فشل في تحميل تقرير الحضور' : 'Failed to fetch attendance report',
    noReport: language === 'ar' ? 'لم يتم العثور على تقرير' : 'No report found',
    noData: language === 'ar' ? 'لا توجد بيانات حضور' : 'No attendance data',
    
    // Header
    attendanceReport: language === 'ar' ? 'تقرير الحضور' : 'Attendance Report',
    employeeId: language === 'ar' ? 'رقم الموظف:' : 'Employee ID:',
    generatedOn: language === 'ar' ? 'تم الإنشاء في:' : 'Generated on:',
    
    // Summary Cards
    totalDays: language === 'ar' ? 'إجمالي الأيام' : 'Total Days',
    presentDays: language === 'ar' ? 'أيام الحضور' : 'Present Days',
    absentDays: language === 'ar' ? 'أيام الغياب' : 'Absent Days',
    leaveDays: language === 'ar' ? 'أيام الإجازة' : 'Leave Days',
    
    // Details Section
    dailyAttendance: language === 'ar' ? 'الحضور اليومي' : 'Daily Attendance',
    present: language === 'ar' ? 'حاضر' : 'PRESENT',
    absent: language === 'ar' ? 'غائب' : 'ABSENT',
    
    // No Data Message
    noAttendanceData: language === 'ar' ? 'لا توجد سجلات حضور لهذا الموظف' : 'No attendance records found for this employee.'
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [id]);

  const fetchAttendanceReport = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/employees-attendance/${id}`);
      setReport(data);
    } catch (err) {
      setError(t.error);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-green-700">{t.loading}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    </div>
  );

  if (!report) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <p className="text-xl">{t.noReport}</p>
      </div>
    </div>
  );

  // Function to format month name based on language
  const formatMonthName = (monthString: string) => {
    const date = new Date(monthString + '-01');
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Function to format day name based on language
  const formatDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { 
      month: 'short' 
    });
  };

  return (

    <MainLayout>  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={language === 'ar' ? 'text-right' : ''}>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                {t.attendanceReport}
              </h1>
              <p className="text-green-600">
                {report.employee.name} - {report.employee.role}
              </p>
            </div>
            <div className={language === 'ar' ? 'text-left' : 'text-right'}>
              <p className="text-sm text-green-600">{t.employeeId} EMP{report.employee.id}</p>
              <p className="text-sm text-green-600">
                {t.generatedOn} {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Reports */}
        <div className="space-y-6">
          {report.attendance_report.map((monthReport, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Month Header */}
              <div className="bg-green-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {formatMonthName(monthReport.month)}
                </h2>
              </div>

              <div className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {monthReport.summary.total_days}
                    </div>
                    <div className="text-sm text-green-600">{t.totalDays}</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-800">
                      {monthReport.summary.present_days}
                    </div>
                    <div className="text-sm text-green-700">{t.presentDays}</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-700">
                      {monthReport.summary.absent_days}
                    </div>
                    <div className="text-sm text-red-600">{t.absentDays}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {monthReport.summary.leave_days}
                    </div>
                    <div className="text-sm text-blue-600">{t.leaveDays}</div>
                  </div>
                </div>

                {/* Attendance Details */}
                <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  {t.dailyAttendance}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {monthReport.details.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`p-3 rounded-lg text-center ${
                        day.status === 'present'
                          ? 'bg-green-100 border border-green-300'
                          : 'bg-red-100 border border-red-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-700">
                        {new Date(day.attendance_date).getDate()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDayName(day.attendance_date)}
                      </div>
                      <div className={`text-xs font-bold mt-1 ${
                        day.status === 'present' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {day.status === 'present' ? t.present : t.absent}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Data Message */}
        {report.attendance_report.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t.noData}
            </h3>
            <p className="text-gray-500">
              {t.noAttendanceData}
            </p>
          </div>
        )}
      </div>
    </div></MainLayout>
  
  );
}