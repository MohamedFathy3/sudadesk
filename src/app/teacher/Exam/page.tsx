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
    title: language === 'ar' ? 'إدارة الامتحانات' : 'Exams Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    examName: language === 'ar' ? 'اسم الامتحان' : 'Exam Name',
    totalMark: language === 'ar' ? 'الدرجة الكلية' : 'Total Mark',
    class: language === 'ar' ? 'الفصل' : 'Class',
    view: language === 'ar' ? 'عرض' : 'View',
    course: language === 'ar' ? 'الماده' : 'material',
  };

  return (
    <GenericDataManager
      endpoint="list/exams"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => `EXM${String(item.id).padStart(3, '0')}`
        },
        { 
          key: 'exam_name', 
          label: t.examName, 
          sortable: true 
        },
         { 
          key: 'course', 
          label: t.course, 
          sortable: true 
        },
        
        { 
          key: 'total_mark', 
          label: t.totalMark, 
          sortable: true 
        },
        { 
          key: 'class', 
          label: t.class, 
          sortable: false 
        },
        { 
          key: 'view', 
          label: t.view, 
          sortable: false,
          render: (item) => {
            return (
              <Link href={`/teacher/Exam/${item.id}`}>
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <Eye size={16} />
                  <span>{t.view}</span>
                </button>
              </Link>
            );
          }
        },
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