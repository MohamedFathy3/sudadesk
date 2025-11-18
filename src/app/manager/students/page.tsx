// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye } from 'lucide-react';

export default function StudentsPage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة الطلاب' : 'Students Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم الطالب' : 'Student Name',
    age: language === 'ar' ? 'العمر' : 'Age',
    educationStage: language === 'ar' ? 'المرحلة التعليمية' : 'Education Stage',
    term: language === 'ar' ? 'الفصل الدراسي' : 'Term',
    fatherName: language === 'ar' ? 'اسم الأب' : 'Father Name',
    fatherPhone: language === 'ar' ? 'هاتف الأب' : 'Father Phone',
    classroom: language === 'ar' ? 'الفصل' : 'Class',
    viewProfile: language === 'ar' ? 'عرض الملف' : 'View Profile',
    actions: language === 'ar' ? 'الإجراءات' : 'Actions',
  };

  // دالة renderActions علشان تظهر زرار View Profile
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderActions = (item: any) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.open(`/manager/students/${item.id}`, '_blank');
        }}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
      >
        <Eye className="w-4 h-4" />
        {t.viewProfile}
      </button>
    );
  };

  return (
    <GenericDataManager
      endpoint="student"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => {
            return `STU${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: t.name, 
          sortable: true,
        },
        { 
          key: 'age', 
          label: t.age, 
          sortable: true,
        },
 
     
       
        { 
          key: 'classroom', 
          label: t.classroom, 
          sortable: true,
        },
        { 
          key: 'actions', 
          label: t.actions, 
          sortable: false,
          render: renderActions
        }
      ]}
      showAddButton={false}
      showEditButton={false}
      showDeleteButton={false}
      showActiveToggle={false}
      showSearch={true}
      showBulkActions={false}
      showDeletedToggle={false}
      
      initialData={{
        filters: {},
        orderBy: "id",
        orderByDirection: "asc",
        perPage: 10,
        paginate: true,
        delete: false
      }}
    />
  );
}