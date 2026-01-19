// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, CreditCard } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

// تعريف نوع الطالب
interface Student {
  id: number;
  name: string;
  age?: number;
  education_stage?: string;
  term?: string;
  previous_school?: string;
  father_name?: string;
  father_phone?: string;
  father_job?: string;
  mother_name?: string;
  mother_phone?: string;
  mother_job?: string;
  classe_id?: number;
  email?: string;
  active?: boolean;
  classroom?: string;
  father?: {
    name: string;
  };
  classe?: {
    name: string;
  };
}

export default function StudentsPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const t = {
    title: language === 'ar' ? 'إدارة الطلاب' : 'Students Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'اسم الطالب' : 'Student Name',
    term: language === 'ar' ? 'الفصل الدراسي' : 'Term',
    fatherName: language === 'ar' ? 'اسم الأب' : 'Father Name',
    classroom: language === 'ar' ? 'الفصل' : 'Class',
    status: language === 'ar' ? 'الحالة' : 'Status',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    actions: language === 'ar' ? 'الإجراءات' : 'Actions',
    payments: language === 'ar' ? 'المدفوعات' : 'Payments',
    managePayments: language === 'ar' ? 'إدارة المدفوعات' : 'Manage Payments',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
    
    // Form Labels
    studentName: language === 'ar' ? 'اسم الطالب' : 'Student Name',
    enterStudentName: language === 'ar' ? 'أدخل اسم الطالب الكامل' : 'Enter student full name',
    age: language === 'ar' ? 'العمر' : 'Age',
    enterAge: language === 'ar' ? 'أدخل عمر الطالب' : 'Enter student age',
    educationStage: language === 'ar' ? 'المرحلة التعليمية' : 'Education Stage',
    enterEducationStage: language === 'ar' ? 'أدخل المرحلة التعليمية' : 'Enter education stage',
    academicTerm: language === 'ar' ? 'الفصل الدراسي' : 'Academic Term',
    enterAcademicTerm: language === 'ar' ? 'أدخل الفصل الدراسي' : 'Enter academic term',
    previousSchool: language === 'ar' ? 'المدرسة السابقة' : 'Previous School',
    enterPreviousSchool: language === 'ar' ? 'أدخل اسم المدرسة السابقة' : 'Enter previous school name',
    fatherNameLabel: language === 'ar' ? 'اسم الأب *' : 'Father Name *',
    enterFatherName: language === 'ar' ? 'أدخل اسم الأب' : 'Enter father name',
    fatherPhone: language === 'ar' ? 'هاتف الأب *' : 'Father Phone *',
    enterFatherPhone: language === 'ar' ? 'أدخل رقم هاتف الأب' : 'Enter father phone number',
    fatherJob: language === 'ar' ? 'وظيفة الأب' : 'Father Job',
    enterFatherJob: language === 'ar' ? 'أدخل وظيفة الأب' : 'Enter father job',
    motherName: language === 'ar' ? 'اسم الأم' : 'Mother Name',
    enterMotherName: language === 'ar' ? 'أدخل اسم الأم' : 'Enter mother name',
    motherPhone: language === 'ar' ? 'هاتف الأم' : 'Mother Phone',
    enterMotherPhone: language === 'ar' ? 'أدخل رقم هاتف الأم' : 'Enter mother phone number',
    motherJob: language === 'ar' ? 'وظيفة الأم' : 'Mother Job',
    enterMotherJob: language === 'ar' ? 'أدخل وظيفة الأم' : 'Enter mother job',
    classLabel: language === 'ar' ? 'الفصل *' : 'Class *',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    enterEmail: language === 'ar' ? 'أدخل عنوان البريد الإلكتروني' : 'Enter email address',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    enterPassword: language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password',
    activeStatus: language === 'ar' ? 'الحالة النشطة' : 'Active Status',
  };

  const handleOpenPaymentModal = (student: Student) => {
    setSelectedStudent(student);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <GenericDataManager
        endpoint="student"
        title={t.title}
        columns={[
          { 
            key: 'id', 
            label: t.id, 
            sortable: true,
            render: (item: Student) => `STU${String(item.id).padStart(3, '0')}`
          },
          { 
            key: 'name', 
            label: t.name, 
            sortable: true,
          },
          { 
            key: 'term', 
            label: t.term, 
            sortable: true,
          },
          { 
            key: 'father_name', 
            label: t.fatherName, 
            sortable: true,
            render: (item: Student) => item.father?.name || item.father_name || t.notAvailable
          },
          { 
            key: 'classroom', 
            label: t.classroom, 
            sortable: true,
            render: (item: Student) => item.classroom || item.classe?.name || t.notAvailable
          },
          
          {
            key: 'actions',
            label: t.actions,
            sortable: false,
            render: (item: Student) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenPaymentModal(item)}
                  className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  title={t.managePayments}
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  {t.payments}
                </button>
              </div>
            )
          }
        ]}
        
        showAddButton={true}
        showEditButton={true}
        showDeleteButton={true}
        showActiveToggle={true} 
        showSearch={true}
        showBulkActions={true}
        showDeletedToggle={true}
        additionalData={[
          { key: 'classes', endpoint: '/classe' }
        ]}
        formFields={[
          {
            name: 'name',
            label: t.studentName,
            type: 'text',
            required: true,
            placeholder: t.enterStudentName
          },
          {
            name: 'age',
            label: t.age,
            type: 'number',
            required: true,
            placeholder: t.enterAge
          },
          {
            name: 'education_stage',
            label: t.educationStage,
            type: 'text',
            required: true,
            placeholder: t.enterEducationStage
          },
          {
            name: 'term',
            label: t.academicTerm,
            type: 'text',
            required: true,
            placeholder: t.enterAcademicTerm
          },
          {
            name: 'previous_school',
            label: t.previousSchool,
            type: 'text',
            required: false,
            placeholder: t.enterPreviousSchool
          },
          {
            name: 'father_name',
            label: t.fatherNameLabel,
            type: 'text',
            required: true,
            placeholder: t.enterFatherName
          },
          {
            name: 'father_phone',
            label: t.fatherPhone,
            type: 'tel',
            required: true,
            placeholder: t.enterFatherPhone
          },
          {
            name: 'father_job',
            label: t.fatherJob,
            type: 'text',
            required: false,
            placeholder: t.enterFatherJob
          },
          {
            name: 'mother_name',
            label: t.motherName,
            type: 'text',
            required: false,
            placeholder: t.enterMotherName
          },
          {
            name: 'mother_phone',
            label: t.motherPhone,
            type: 'tel',
            required: false,
            placeholder: t.enterMotherPhone
          },
          {
            name: 'mother_job',
            label: t.motherJob,
            type: 'text',
            required: false,
            placeholder: t.enterMotherJob
          },
          {
            name: 'classe_id',
            label: t.classLabel,
            type: 'select',
            required: true,
            optionsKey: 'classes'
          },
          { 
            name: 'email', 
            label: t.email, 
            type: 'email', 
            required: true,
            placeholder: t.enterEmail,
          },
          { 
            name: 'password', 
            label: t.password, 
            type: 'password', 
            required: true,
            placeholder: t.enterPassword,
          },
          {
            name: 'active',
            label: t.activeStatus,
            type: 'switch',
            required: false
          }
        ]}
      />

      {isPaymentModalOpen && selectedStudent && (
        <PaymentModal
          student={selectedStudent}
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
        />
      )}
    </>
  );
}