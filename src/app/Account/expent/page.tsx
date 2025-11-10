// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeachersPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة المصروفات' : 'Expenses Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم المصروف' : 'Expense Name',
    amount: language === 'ar' ? 'المبلغ' : 'Amount',
    description: language === 'ar' ? 'الوصف' : 'Description',
    expenseDate: language === 'ar' ? 'تاريخ المصروف' : 'Expense Date',
    
    // Form Labels
    expenseTitle: language === 'ar' ? 'عنوان المصروف' : 'Expense Title',
    enterExpenseTitle: language === 'ar' ? 'أدخل عنوان المصروف' : 'Enter expense title',
    enterAmount: language === 'ar' ? 'أدخل المبلغ' : 'Enter amount',
    enterDescription: language === 'ar' ? 'أدخل الوصف' : 'Enter description',
    expenseDateLabel: language === 'ar' ? 'تاريخ المصروف' : 'Expense Date',
    enterExpenseDate: language === 'ar' ? 'أدخل تاريخ المصروف' : 'Enter expense date',
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
          label: t.name, 
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
          type: 'textarea',
          required: true,
          placeholder: t.enterDescription
        },
        {
          name: 'expense_date',
          label: t.expenseDateLabel,
          type: 'date',
          required: false,
          placeholder: t.enterExpenseDate
        },
      ]}
      showActiveToggle={true}
      showAddButton={true}
      showEditButton={true}
      showDeleteButton={true}
      showSearch={true}
      showBulkActions={true}
      showDeletedToggle={true}
    />
  );
}