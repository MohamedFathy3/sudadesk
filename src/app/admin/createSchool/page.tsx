// app/schools/page.tsx
'use client';
import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Eye, BarChart3,DollarSign } from 'lucide-react';

export default function SchoolsPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? 'إدارة المدارس' : 'Schools Management',
    id: language === 'ar' ? 'الرقم' : 'ID',
    logo: language === 'ar' ? 'الشعار' : 'Logo',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    slug: language === 'ar' ? 'الرابط' : 'Slug',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    manager: language === 'ar' ? 'المدير' : 'Manager',
    address: language === 'ar' ? 'العنوان' : 'Address',
    notAvailable: language === 'ar' ? 'غير متوفر' : 'N/A',
    noLogo: language === 'ar' ? 'لا يوجد شعار' : 'No Logo',
    actions: language === 'ar' ? 'الإجراءات' : 'Actions',
    viewReport: language === 'ar' ? 'عرض التقرير' : 'View Report',
    expensesReport: language === 'ar' ? 'تقرير المصروفات' : 'Expenses Report',
    rolesReport: language === 'ar' ? 'تقرير الأدوار' : 'Roles Report',
    
    // Form Labels
    schoolLogo: language === 'ar' ? 'شعار المدرسة' : 'School Logo',
    enterSchoolName: language === 'ar' ? 'أدخل اسم المدرسة' : 'Enter school name',
    enterSlug: language === 'ar' ? 'أدخل رابط المدرسة' : 'Enter school slug',
    enterAddress: language === 'ar' ? 'أدخل العنوان الكامل' : 'Enter full address',
    enterPhone: language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
    enterEmail: language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email address',
    description: language === 'ar' ? 'الوصف' : 'Description',
    enterDescription: language === 'ar' ? 'أدخل وصف المدرسة' : 'Enter school description',
    managerName: language === 'ar' ? 'اسم المدير' : 'Manager Name',
    enterManagerName: language === 'ar' ? 'أدخل اسم المدير الكامل' : 'Enter manager full name',
    managerEmail: language === 'ar' ? 'بريد المدير' : 'Manager Email',
    enterManagerEmail: language === 'ar' ? 'أدخل بريد المدير' : 'Enter manager email',
    managerPassword: language === 'ar' ? 'كلمة مرور المدير' : 'Manager Password',
    enterManagerPassword: language === 'ar' ? 'أدخل كلمة مرور المدير' : 'Enter password for manager account',
  };

  return (
    <GenericDataManager
      endpoint="schools"
      title={t.title}
      columns={[
        { 
          key: 'id', 
          label: t.id, 
          sortable: true,
          render: (item) => {
            return `SCH${String(item.id).padStart(3, '0')}`;
          }
        },
        { 
          key: 'logo', 
          label: t.logo, 
          sortable: false,
          render: (item) => (
            <div className="flex justify-center">
              {item.logo ? (
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => window.open(item.logo, '_blank')}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border border-gray-200">
                  <span className="text-white text-xs font-medium">{t.noLogo}</span>
                </div>
              )}
            </div>
          )
        },
        { 
          key: 'name', 
          label: t.schoolName, 
          sortable: true,
        },
        { 
          key: 'slug', 
          label: t.slug, 
          sortable: true,
          render: (item) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{item.slug}</code>
          )
        },
      
        { 
          key: 'manager.name', 
          label: t.manager, 
          sortable: true,
          render: (item) => (
            <div>
              <div className="font-medium">{item.name || t.notAvailable}</div>
              {item.manager_email && (
                <div className="text-xs text-gray-500">{item.manager_email}</div>
              )}
            </div>
          )
        },
    
        {
          key: 'actions',
          label: t.actions,
          sortable: false,
          render: (item) => (
            <div className="flex justify-center space-x-2">
              <Link
                href={`/admin/createSchool/view/${item.id}/`}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                title={t.expensesReport}
              >
                <DollarSign className="w-4 h-4" />
                <span className={language === 'ar' ? 'mr-2' : 'ml-2'}>
                  {language === 'ar' ? 'المصروفات' : 'Expenses'}
                </span>
              </Link>
              <Link
                href={`/admin/createSchool/${item.id}`}
                className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                title={t.rolesReport}
              >
                <BarChart3 className="w-4 h-4" />
                <span className={language === 'ar' ? 'mr-2' : 'ml-2'}>
                  {language === 'ar' ? 'الأدوار' : 'Roles'}
                </span>
              </Link>
            </div>
          )
        }
      ]}
      
      formFields={[
        {
          name: 'logo', 
          label: t.schoolLogo, 
          type: 'image',
          required: false,
          accept: 'image/png, image/jpg, image/jpeg',
        },
        { 
          name: 'name', 
          label: t.schoolName, 
          type: 'text', 
          required: true,
          placeholder: t.enterSchoolName,
        },
        { 
          name: 'slug', 
          label: t.slug, 
          type: 'text', 
          required: true,
          placeholder: t.enterSlug,
        },
        { 
          name: 'address', 
          label: t.address, 
          type: 'text', 
          required: true,
          placeholder: t.enterAddress,
        },
        { 
          name: 'phone', 
          label: t.phone, 
          type: 'text', 
          required: true,
          placeholder: t.enterPhone,
        },
        { 
          name: 'email', 
          label: t.email, 
          type: 'email', 
          required: true,
          placeholder: t.enterEmail,
        },
        { 
          name: 'des', 
          label: t.description, 
          type: 'textarea', 
          required: false,
          placeholder: t.enterDescription,
          rows: 4
        },
        { 
          name: 'manager.name', 
          label: t.managerName, 
          type: 'text', 
          required: true,
          placeholder: t.enterManagerName,
        },
        { 
          name: 'manager.email', 
          label: t.managerEmail, 
          type: 'email', 
          required: true,
          placeholder: t.enterManagerEmail,
        },
        { 
          name: 'manager_password', 
          label: t.managerPassword, 
          type: 'password', 
          required: true,
          placeholder: t.enterManagerPassword,
        }
      ]}
      
      additionalData={[
        // { key: 'cities', endpoint: '/cities' },
        // { key: 'types', endpoint: '/school-types' }
      ]}
    />
  );
}