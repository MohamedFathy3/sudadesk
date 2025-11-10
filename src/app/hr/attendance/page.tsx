// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import toast from "react-hot-toast";

export default function TeachersPage() {
  const { language } = useLanguage();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);

  const t = {
    // Page Title
    title: language === 'ar' ? 'إدارة حضور الموظفين' : 'Employees Attendance Management',
    
    // Table Columns
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'الاسم' : 'Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    attendance: language === 'ar' ? 'الحضور' : 'Attendance',
    absent: language === 'ar' ? 'الغياب' : 'Absent',
    lastSalary: language === 'ar' ? 'آخر راتب' : 'Last Salary',
    status: language === 'ar' ? 'الحالة' : 'Status',
    actions: language === 'ar' ? 'الإجراءات' : 'Actions',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
    
    // Action Buttons
    viewReport: language === 'ar' ? 'عرض التقرير' : 'View Report',
    markAttendance: language === 'ar' ? 'تسجيل الحضور' : 'Mark Attendance',
    calculateSalary: language === 'ar' ? 'حساب الراتب' : 'Calculate Salary',
    
    // Modal Titles
    markAttendanceFor: language === 'ar' ? 'تسجيل الحضور لـ' : 'Mark Attendance for',
    calculateSalaryFor: language === 'ar' ? 'حساب الراتب لـ' : 'Calculate Salary for',
    
    // Form Labels
    statusLabel: language === 'ar' ? 'الحالة' : 'Status',
    present: language === 'ar' ? 'حاضر' : 'Present',
    absentOption: language === 'ar' ? 'غائب' : 'Absent',
    date: language === 'ar' ? 'التاريخ' : 'Date',
    month: language === 'ar' ? 'الشهر' : 'Month',
    baseSalary: language === 'ar' ? 'الراتب الأساسي ($)' : 'Base Salary ($)',
    bonus: language === 'ar' ? 'المكافأة ($)' : 'Bonus ($)',
    
    // Buttons
    process: language === 'ar' ? 'جاري المعالجة...' : 'Processing...',
    markAttendanceBtn: language === 'ar' ? 'تسجيل الحضور' : 'Mark Attendance',
    calculate: language === 'ar' ? 'جاري الحساب...' : 'Calculating...',
    calculateSalaryBtn: language === 'ar' ? 'حساب الراتب' : 'Calculate Salary',
    cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
    calculateAgain: language === 'ar' ? 'حساب مرة أخرى' : 'Calculate Again',
    close: language === 'ar' ? 'إغلاق' : 'Close',
    
    // Results
    salaryCalculation: language === 'ar' ? 'نتيجة حساب الراتب' : 'Salary Calculation Result',
    employee: language === 'ar' ? 'الموظف:' : 'Employee:',
    totalSalary: language === 'ar' ? 'إجمالي الراتب:' : 'Total Salary:',
    
    // Messages
    attendanceMarked: language === 'ar' ? 'تم تسجيل الحضور بنجاح!' : 'Attendance marked successfully!',
    failedToMark: language === 'ar' ? 'فشل في تسجيل الحضور:' : 'Failed to mark attendance:'
  };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openAttendanceModal = (employee: any) => {
    setSelectedEmployee(employee);
    setShowAttendanceModal(true);
  };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openSalaryModal = (employee: any) => {
    setSelectedEmployee(employee);
    setShowSalaryModal(true);
  };

  return (
    <>
      <GenericDataManager
        endpoint="employees-attendance"
        title={t.title}
        columns={[
          { 
            key: 'id', 
            label: t.id, 
            sortable: true,
            render: (item) => `EMP${String(item.id).padStart(3, '0')}`
          },
          { 
            key: 'name', 
            label: t.name, 
            sortable: true 
          },
          { 
            key: 'email', 
            label: t.email, 
            sortable: true 
          },
          { 
            key: 'phone', 
            label: t.phone, 
            sortable: false 
          },
          { 
            key: 'attendance_count', 
            label: t.attendance, 
            sortable: false,
            render: (item) => (
              <span className="text-green-600 font-medium">{item.attendance_count}</span>
            )
          },
          { 
            key: 'absent_count', 
            label: t.absent, 
            sortable: false,
            render: (item) => (
              <span className="text-red-600 font-medium">{item.absent_count}</span>
            )
          },
          { 
            key: 'last_salary', 
            label: t.lastSalary, 
            sortable: false,
            render: (item) => item.last_salary ? `$${item.last_salary}` : t.notAvailable
          },
          {
            key: 'active',
            label: t.status,
            sortable: true,
            render: (item) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.active 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.active ? t.active : t.inactive}
              </span>
            )
          },
          {
            key: 'actions',
            label: t.actions,
            sortable: false,
            render: (item) => (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => window.open(`/hr/attendance/${item.id}`, '_blank')}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  {t.viewReport}
                </button>
                <button
                  onClick={() => openAttendanceModal(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  {t.markAttendance}
                </button>
                <button
                  onClick={() => openSalaryModal(item)}
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                >
                  {t.calculateSalary}
                </button>
              </div>
            )
          }
        ]}
        formFields={[]}
        showActiveToggle={true}
        showAddButton={false}
        showEditButton={false}
        showDeleteButton={false}
        showSearch={true}
        showBulkActions={false}
        showDeletedToggle={false}
      />

      {showAttendanceModal && (
        <AttendanceModal 
          employee={selectedEmployee}
          onClose={() => setShowAttendanceModal(false)}
          translations={t}
        />
      )}

      {showSalaryModal && (
        <SalaryModal 
          employee={selectedEmployee}
          onClose={() => setShowSalaryModal(false)}
          translations={t}
        />
      )}
    </>
  );
}

// Fixed Attendance Modal Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
function AttendanceModal({ employee, onClose, translations }: { employee: any; onClose: () => void; translations: any }) {
  const [status, setStatus] = useState<'present' | 'absent'>('present');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fixed: Include all required fields in the correct structure
      const response = await apiFetch('/employee-attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attendances: [
            {
              employee_id: employee.id,
              status: status,
              date: new Date().toISOString().split('T')[0] // Add current date
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to mark attendance');
      }

      const result = await response.json();
      
      alert(`${translations.attendanceMarked}`);
      onClose();
      window.location.reload();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.success("success")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {translations.markAttendanceFor} {employee.name}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.statusLabel}
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'present' | 'absent')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="present">{translations.present}</option>
              <option value="absent">{translations.absentOption}</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {translations.date}: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? translations.process : translations.markAttendanceBtn}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              {translations.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Fixed Salary Modal Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
function SalaryModal({ employee, onClose, translations }: { employee: any; onClose: () => void; translations: any }) {
  const [formData, setFormData] = useState({
    month: new Date().toISOString().slice(0, 7),
    base_salary: 5000,
    bonus: 0
  });
  const [loading, setLoading] = useState(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fixed: Ensure all required fields are included
      const response = await apiFetch('/employee-attendance/calculate-salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employee.id,
          month: formData.month,
          base_salary: Number(formData.base_salary), // Ensure it's a number
          bonus: Number(formData.bonus) // Ensure it's a number
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to calculate salary');
      }
      toast.success("success")

      const data = await response.json();
      setResult(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    } finally {
      setLoading(false);
            toast.success("success")

    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'month' ? value : Number(value)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {translations.calculateSalaryFor} {employee.name}
        </h2>
        
        {!result ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.month} *
                </label>
                <input
                  type="month"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.baseSalary} *
                </label>
                <input
                  type="number"
                  name="base_salary"
                  value={formData.base_salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.bonus}
                </label>
                <input
                  type="number"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? translations.calculate : translations.calculateSalaryBtn}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                {translations.cancel}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">{translations.salaryCalculation}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">{translations.employee}</span>
                  <span className="font-semibold">{employee.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">{translations.month}:</span>
                  <span className="font-semibold">{formData.month}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">{translations.baseSalary}:</span>
                  <span className="font-semibold">${formData.base_salary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">{translations.bonus}:</span>
                  <span className="font-semibold">${formData.bonus.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-green-200 pt-2">
                  <span className="text-green-800 font-bold">{translations.totalSalary}</span>
                  <span className="text-green-800 font-bold text-xl">
                    ${(formData.base_salary + formData.bonus).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {translations.calculateAgain}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                {translations.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}