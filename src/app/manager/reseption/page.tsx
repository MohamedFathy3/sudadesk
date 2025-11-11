// app/receptions/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReceptionsPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? ' شئون الطلاب' : 'Receptions Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    name: language === 'ar' ? 'الاسم' : 'Name',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    address: language === 'ar' ? 'العنوان' : 'Address',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
    
    // Form Labels
    receptionName: language === 'ar' ? 'اسم مسئول الاستقبال' : 'Reception Name',
    enterReceptionName: language === 'ar' ? 'أدخل اسم مسئول الاستقبال' : 'Enter reception name',
    enterEmail: language === 'ar' ? 'أدخل عنوان البريد الإلكتروني' : 'Enter email address',
    enterPassword: language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password',
    enterPhone: language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
    enterAddress: language === 'ar' ? 'أدخل العنوان الكامل' : 'Enter full address',
    password: language === 'ar' ? 'كلمة المرور' : 'Password',
    
    // Actions & Messages
    addNew: language === 'ar' ? 'إضافة مسئول استقبال جديد' : 'Add New Reception',
    edit: language === 'ar' ? 'تعديل مسئول الاستقبال' : 'Edit Reception',
    delete: language === 'ar' ? 'حذف مسئول الاستقبال' : 'Delete Reception',
    confirmDelete: language === 'ar' ? 'هل أنت متأكد من حذف مسئول الاستقبال؟' : 'Are you sure you want to delete this reception?',
    searchPlaceholder: language === 'ar' ? 'ابحث في مسئولي الاستقبال...' : 'Search receptions...',
    noData: language === 'ar' ? 'لا توجد بيانات لمسئولي الاستقبال' : 'No receptions data available',
    loading: language === 'ar' ? 'جاري التحميل...' : 'Loading...',
    save: language === 'ar' ? 'حفظ' : 'Save',
    cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
  };

  return (
    <GenericDataManager
      endpoint="receptions"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => {
            return `REC${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'name', 
          label: t.name, 
          sortable: true,
        },
        { 
          key: 'email', 
          label: t.email, 
          sortable: false,
        },
        { 
          key: 'phone', 
          label: t.phone, 
          sortable: false,
          render: (item) => item.phone || t.notAvailable
        },
        { 
          key: 'address', 
          label: t.address, 
          sortable: false,
          render: (item) => (
            <div 
              className="max-w-[200px] truncate" 
              title={item.address || t.notAvailable}
            >
              {item.address || t.notAvailable}
            </div>
          )
        }
      ]}
      formFields={[
        { 
          name: 'name', 
          label: t.receptionName, 
          type: 'text', 
          required: true,
          placeholder: t.enterReceptionName,
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
          name: 'phone', 
          label: t.phone, 
          type: 'text', 
          required: true,
          placeholder: t.enterPhone,
        },
        { 
          name: 'address', 
          label: t.address, 
          type: 'text', 
          required: true,
          placeholder: t.enterAddress,
        }
      ]}
      initialData={{ role: 'reception' }}
      defaultFilters={{ role: 'reception' }}
    />
  );
}