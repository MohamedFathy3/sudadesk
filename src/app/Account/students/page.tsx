// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, CreditCard } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import { useRouter } from 'next/navigation';

export default function StudentsPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // الترجمات
  const t = {
    title: language === 'ar' ? 'إدارة المدفوعات' : 'Payments Management',
    payment_id: language === 'ar' ? 'رقم الدفع' : 'Payment ID',
    student_name: language === 'ar' ? 'اسم الطالب' : 'Student Name',
    total_amount: language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount',
    paid_amount: language === 'ar' ? 'المبلغ المدفوع' : 'Paid Amount',
    remaining_amount: language === 'ar' ? 'المبلغ المتبقي' : 'Remaining Amount',
    payment_type: language === 'ar' ? 'نوع الدفع' : 'Payment Type',
    status: language === 'ar' ? 'الحالة' : 'Status',
    actions: language === 'ar' ? 'الإجراءات' : 'Actions',
    view: language === 'ar' ? 'عرض' : 'View',
    payments: language === 'ar' ? 'المدفوعات' : 'Payments',
    view_student: language === 'ar' ? 'عرض الطالب' : 'View Student',
    manage_payments: language === 'ar' ? 'إدارة المدفوعات' : 'Manage Payments',
    
    // Payment Types
    cash: language === 'ar' ? 'نقدي' : 'Cash',
    installment: language === 'ar' ? 'تقسيط' : 'Installment',
    
    // Status Types
    paid: language === 'ar' ? 'مدفوع' : 'Paid',
    pending: language === 'ar' ? 'قيد الانتظار' : 'Pending',
    overdue: language === 'ar' ? 'متأخر' : 'Overdue',
    
    // Form Fields
    student: language === 'ar' ? 'الطالب' : 'Student',
    select_student: language === 'ar' ? 'اختر الطالب' : 'Select student',
    enter_total_amount: language === 'ar' ? 'أدخل المبلغ الإجمالي' : 'Enter total amount',
    select_payment_type: language === 'ar' ? 'اختر نوع الدفع' : 'Select payment type',
    installments_count: language === 'ar' ? 'عدد الأقساط' : 'Installments Count',
    enter_installments_count: language === 'ar' ? 'أدخل عدد الأقساط' : 'Enter number of installments',
    select_status: language === 'ar' ? 'اختر الحالة' : 'Select payment status',
    
    // Not Available
    na: language === 'ar' ? 'غير متوفر' : 'N/A'
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenPaymentModal = (item: any) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewStudent = (item: any) => {
    router.push(`/Account/students/${item.student.id}`);
  };

  // دالة لترجمة نوع الدفع
  const translatePaymentType = (type: string) => {
    const types: { [key: string]: string } = {
      'cash': t.cash,
      'installment': t.installment
    };
    return types[type] || type;
  };

  // دالة لترجمة الحالة
  const translateStatus = (status: string) => {
    const statuses: { [key: string]: string } = {
      'paid': t.paid,
      'pending': t.pending,
      'overdue': t.overdue
    };
    return statuses[status] || status;
  };

  return (
    <>
      <GenericDataManager
        endpoint="payments"
        title={t.title}
        columns={[
          { 
            key: 'id', 
            label: t.payment_id, 
            sortable: true,
            render: (item) => `PAY${String(item.id).padStart(3, '0')}`
          },
          { 
            key: 'student.name', 
            label: t.student_name, 
            sortable: true,
            render: (item) => item.student?.name || t.na
          },
          { 
            key: 'total_amount', 
            label: t.total_amount, 
            sortable: true,
            render: (item) => `${item.total_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'paid_amount', 
            label: t.paid_amount, 
            sortable: true,
            render: (item) => `${item.paid_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'remaining_amount', 
            label: t.remaining_amount, 
            sortable: true,
            render: (item) => `${item.remaining_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'type', 
            label: t.payment_type, 
            sortable: true,
            render: (item) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.type === 'cash' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {item.type ? translatePaymentType(item.type) : t.na}
              </span>
            )
          },
          {
            key: 'status',
            label: t.status,
            sortable: true,
            render: (item) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'paid' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : item.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.status ? translateStatus(item.status) : t.na}
              </span>
            )
          },
          {
            key: 'actions',
            label: t.actions,
            sortable: false,
            render: (item) => (
              <div className={`flex space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <button
                  onClick={() => handleViewStudent(item)}
                  className={`flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                    language === 'ar' ? 'flex-row-reverse' : ''
                  }`}
                  title={t.view_student}
                >
                  <Eye className={`w-4 h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {t.view}
                </button>
                <button
                  onClick={() => handleOpenPaymentModal(item)}
                  className={`flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    language === 'ar' ? 'flex-row-reverse' : ''
                  }`}
                  title={t.manage_payments}
                >
                  <CreditCard className={`w-4 h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {t.payments}
                </button>
              </div>
            )
          }
        ]}
        
        showAddButton={true}
        showEditButton={false}
        showDeleteButton={false}
        showActiveToggle={false} 
        showSearch={true}
        showBulkActions={false}
        showDeletedToggle={false}
        additionalData={[
          { key: 'students', endpoint: '/student' }
        ]}
        formFields={[
          {
            name: 'student_id',
            label: t.student,
            type: 'select',
            required: true,
            optionsKey: 'students',
            placeholder: t.select_student
          },
          {
            name: 'total_amount',
            label: t.total_amount,
            type: 'number',
            required: true,
            placeholder: t.enter_total_amount
          },
          {
            name: 'type',
            label: t.payment_type,
            type: 'select',
            required: true,
            options: [
              { value: 'cash', label: t.cash },
              { value: 'installment', label: t.installment }
            ],
            placeholder: t.select_payment_type
          },
          {
            name: 'installments_count',
            label: t.installments_count,
            type: 'number',
            required: false,
            placeholder: t.enter_installments_count
          },
          {
            name: 'status',
            label: t.status,
            type: 'select',
            required: true,
            options: [
              { value: 'pending', label: t.pending },
              { value: 'paid', label: t.paid },
              { value: 'overdue', label: t.overdue }
            ],
            placeholder: t.select_status
          }
        ]}
      />

      {isPaymentModalOpen && selectedItem && (
        <PaymentModal
          payment={selectedItem} 
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
        />
      )}
    </>
  );
}