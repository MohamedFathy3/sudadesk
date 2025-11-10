// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeachersPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة المديرين' : 'Directors Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم المدير' : 'Director Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    status: language === 'ar' ? 'الحالة' : 'Status',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    
    // Form Labels
    directorName: language === 'ar' ? 'اسم المدير' : 'Director Name',
    enterDirectorName: language === 'ar' ? 'أدخل اسم المدير' : 'Enter director name',
    enterEmail: language === 'ar' ? 'أدخل عنوان البريد الإلكتروني' : 'Enter email address',
    enterPassword: language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password',
    enterPhone: language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
    enterAddress: language === 'ar' ? 'أدخل العنوان' : 'Enter address',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    activeStatus: language === 'ar' ? 'الحالة النشطة' : 'Active Status',
  };

  return (
    <GenericDataManager
      endpoint="director"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => `DIR${String(item.id).padStart(3, '0')}`
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
          name: 'name',
          label: t.directorName,
          type: 'text',
          required: true,
          placeholder: t.enterDirectorName
        },
        {
          name: 'email',
          label: t.email,
          type: 'email',
          required: true,
          placeholder: t.enterEmail
        },
        {
          name: 'password',
          label: t.password,
          type: 'password',
          required: true,
          placeholder: t.enterPassword
        },
        {
          name: 'phone',
          label: t.phone,
          type: 'tel',
          required: false,
          placeholder: t.enterPhone
        },
        {
          name: 'address',
          label: t.address,
          type: 'text',
          required: false,
          placeholder: t.enterAddress
        },
        {
          name: 'active',
          label: t.activeStatus,
          type: 'switch',
          required: false
        }
      ]}
      showActiveToggle={true}
      showAddButton={true}
      showEditButton={true}
      showDeleteButton={true}
      showSearch={true}
      showBulkActions={true}
      showDeletedToggle={true}
      initialData={{ role: 'director' }}
      defaultFilters={{ role: 'director' }} 
    />
  );
}