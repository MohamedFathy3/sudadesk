// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

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
          key: 'education_stage', 
          label: t.educationStage, 
          sortable: true,
        },
        { 
          key: 'term', 
          label: t.term, 
          sortable: true,
        },
        { 
          key: 'father.name', 
          label: t.fatherName, 
          sortable: true,
        },
        { 
          key: 'father.phone', 
          label: t.fatherPhone, 
          sortable: false,
        },
        { 
          key: 'classroom', 
          label: t.classroom, 
          sortable: true,
        }
      ]}
      showAddButton={false}
      showEditButton={false}
      showDeleteButton={false}
      // إضافة user_id تلقائياً في البيانات المرسلة
      // initialData={{ 
      //   "X-School-ID": user?.id // إضافة user_id من الـ AuthContext
      // }}
    />
  );
}