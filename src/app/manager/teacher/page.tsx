// app/teachers/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function TeachersPage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة المدرسين' : 'Teachers Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم المدرس' : 'Teacher Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    classes: language === 'ar' ? 'الفصول الموكلة' : 'Classes',
    status: language === 'ar' ? 'الحالة' : 'Status',
    view: language === 'ar' ? 'عرض' : 'View',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    noClasses: language === 'ar' ? 'لا توجد فصول' : 'No classes',
    
    // Form Labels
    teacherName: language === 'ar' ? 'اسم المدرس' : 'Teacher Name',
    enterTeacherName: language === 'ar' ? 'أدخل اسم المدرس' : 'Enter teacher name',
    enterEmail: language === 'ar' ? 'أدخل عنوان البريد الإلكتروني' : 'Enter email address',
    enterPassword: language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password',
    enterPhone: language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
    enterAddress: language === 'ar' ? 'أدخل العنوان' : 'Enter address',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    assignedClasses: language === 'ar' ? 'الفصول الموكلة' : 'Assigned Classes',
    activeStatus: language === 'ar' ? 'الحالة النشطة' : 'Active Status',
  };

  return (
    <GenericDataManager
      endpoint="teacher"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => `TCH${String(item.id).padStart(3, '0')}`
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
          key: 'view', 
          label: t.view, 
          sortable: false,
          render: (item) => {
            return (
              <Link href={`/manager/teacher/${item.id}`}>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <Eye size={16} />
                  <span>{t.view}</span>
                </button>
              </Link>
            );
          }
        },
      ]}
      additionalData={[
        { key: 'classe', endpoint: '/classe' }
      ]}
      formFields={[
        {
          name: 'name',
          label: t.teacherName,
          type: 'text',
          required: true,
          placeholder: t.enterTeacherName
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
          name: 'class_ids', 
          label: t.assignedClasses,
          type: 'custom',
          component: 'class-selector',
          required: false,
          optionsKey: "classe",
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
      initialData={{ role: 'teacher' }}
      defaultFilters={{ role: 'teacher' }} 
    />
  );
}