// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function StudentsPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة الفصول' : 'Classes Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم الفصل' : 'Class Name',
    count: language === 'ar' ? 'عدد الطلاب' : 'Student Count',
    
    // Form Labels
    className: language === 'ar' ? 'اسم الفصل' : 'Class Name',
    enterClassName: language === 'ar' ? 'أدخل اسم الفصل' : 'Enter class name',
    studentCount: language === 'ar' ? 'عدد الطلاب' : 'Student Count',
    enterStudentCount: language === 'ar' ? 'أدخل عدد الطلاب' : 'Enter student count',
  };

  return (
    <GenericDataManager
      endpoint="classe"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => {
            return `CLS${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: t.name, 
          sortable: true,
        },
        { 
          key: 'count', 
          label: t.count, 
          sortable: true,
        },
      ]}
      formFields={[
        { 
          name: 'name', 
          label: t.className, 
          type: 'text', 
          required: true,
          placeholder: t.enterClassName
        },
        { 
          name: 'count', 
          label: t.studentCount, 
          type: 'number', 
          required: true,
          placeholder: t.enterStudentCount
        },
      ]}
      additionalData={[
        { key: 'classes', endpoint: '/classe' }
      ]}
    />
  );
}