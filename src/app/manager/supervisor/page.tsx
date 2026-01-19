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
    title: language === 'ar' ? 'إدارة مشرفي الفصول' : 'Class Supervisors Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم المشرف' : 'Supervisor Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    classes: language === 'ar' ? 'الفصول الموكلة' : 'Assigned Classes',
    status: language === 'ar' ? 'الحالة' : 'Status',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    noClasses: language === 'ar' ? 'لا توجد فصول' : 'No classes',
    
    // Form Labels
    supervisorName: language === 'ar' ? 'اسم المشرف' : 'Supervisor Name',
    enterSupervisorName: language === 'ar' ? 'أدخل اسم المشرف' : 'Enter supervisor name',
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
      endpoint="class-supervisor"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => `SUP${String(item.id).padStart(3, '0')}`
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
      
    
      ]}
      additionalData={[
        { key: 'classe', endpoint: '/classe' }
      ]}
      formFields={[
        {
          name: 'name',
          label: t.supervisorName,
          type: 'text',
          required: true,
          placeholder: t.enterSupervisorName
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
      initialData={{ role: 'class_supervisor' }}
      defaultFilters={{ role: 'class_supervisor' }} 
    />
  );
}