// app/courses/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function CoursesPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة الماده' : 'material Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    courseName: language === 'ar' ? 'اسم الماده' : 'material Name',
    
    // Form Labels
    enterCourseName: language === 'ar' ? 'أدخل اسم الماده' : 'Enter material name',
  };

  return (
    <GenericDataManager
      endpoint="course"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => {
            return `CRS${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: t.courseName, 
          sortable: true,
        }
      ]}
      formFields={[
        { 
          name: 'name', 
          label: t.courseName, 
          type: 'text', 
          required: true,
          placeholder: t.enterCourseName,
        }
      ]}
    />
  );
}