// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeachersPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة المصروفات' : 'Expenses Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    titleName: language === 'ar' ? 'عنوان المصروف' : 'Expense Title',
    amount: language === 'ar' ? 'المبلغ' : 'Amount',
    description: language === 'ar' ? 'الوصف' : 'Description',
    expenseDate: language === 'ar' ? 'تاريخ المصروف' : 'Expense Date',
    status: language === 'ar' ? 'الحالة' : 'Status',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    
    // Form Labels
    expenseTitle: language === 'ar' ? 'عنوان المصروف' : 'Expense Title',
    enterExpenseTitle: language === 'ar' ? 'أدخل عنوان المصروف' : 'Enter expense title',
    enterAmount: language === 'ar' ? 'أدخل المبلغ' : 'Enter amount',
    enterDescription: language === 'ar' ? 'أدخل الوصف' : 'Enter description',
    expenseDateLabel: language === 'ar' ? 'تاريخ المصروف' : 'Expense Date',
  };

  return (
    <GenericDataManager
      endpoint="expense"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => `EXP${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'title', 
          label: t.titleName, 
          sortable: true 
        },
        { 
          key: 'amount', 
          label: t.amount, 
          sortable: true 
        },
        { 
          key: 'description', 
          label: t.description, 
          sortable: false 
        },
        { 
          key: 'expense_date', 
          label: t.expenseDate, 
          sortable: false 
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
      ]}
      formFields={[
        {
          name: 'title',
          label: t.expenseTitle,
          type: 'text',
          required: true,
          placeholder: t.enterExpenseTitle
        },
        {
          name: 'amount',
          label: t.amount,
          type: 'number',
          required: true,
          placeholder: t.enterAmount
        },
        {
          name: 'description',
          label: t.description,
          type: 'text',
          required: false,
          placeholder: t.enterDescription
        },
        {
          name: 'expense_date',
          label: t.expenseDateLabel,
          type: 'date',
          required: false
        }
      ]}
      showActiveToggle={false}
      showAddButton={false}
      showEditButton={false}
      showDeleteButton={false}
      showSearch={true}
      showBulkActions={false}
      showDeletedToggle={false}
    />
  );
}