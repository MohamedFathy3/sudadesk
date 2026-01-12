// app/(dashboard)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import React from 'react';
import toast from 'react-hot-toast';

// أنواع البيانات
interface SchoolProfileData {

  about: {
    about_us: string;
    history_vision_values: string;
    stages_and_activities: string;
  };
  why_choose: {
    title: string;
    details: string;
  };
  activities_gallery: Array<{
    id?: number;
    image: string;
    caption: string;
  }>;
  blog_content: Array<{
    id?: number;
    title: string;
    text: string;
  }>;
  slider: {
    title: string;
    image: string;
    description?: string;
  };
}

// مكونات UI الأساسية (مبسطة)
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'default',
  className = '',
  type = 'button'
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = '',
  dir = 'ltr',
  id
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  dir?: 'ltr' | 'rtl';
  id?: string;
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    dir={dir}
    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
  />
);

const Textarea = ({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  className = '',
  dir = 'ltr',
  id
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  dir?: 'ltr' | 'rtl';
  id?: string;
}) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    dir={dir}
    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
  />
);

const Label = ({ 
  children, 
  htmlFor,
  className = ''
}: { 
  children: React.ReactNode; 
  htmlFor?: string;
  className?: string;
}) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${className}`}>
    {children}
  </label>
);

const Switch = ({ 
  checked, 
  onChange 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      checked ? 'translate-x-6' : 'translate-x-1'
    }`} />
  </button>
);

const Tabs = ({ 
  children, 
  value, 
  onValueChange 
}: { 
  children: React.ReactNode; 
  value: string; 
  onValueChange: (value: string) => void;
}) => (
  <div className="space-y-6">
    {children}
  </div>
);

const TabsList = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex space-x-2 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ 
  children, 
  value, 
  activeValue,
  onClick 
}: { 
  children: React.ReactNode; 
  value: string; 
  activeValue: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      activeValue === value 
        ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
    }`}
  >
    {children}
  </button>
);

const TabsContent = ({ 
  children, 
  value, 
  activeValue 
}: { 
  children: React.ReactNode; 
  value: string; 
  activeValue: string;
}) => {
  if (value !== activeValue) return null;
  return <div className="space-y-6">{children}</div>;
};

// أيقونات
const icons = {
  Save: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Building2: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Info: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Image: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Gallery: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  BookOpen: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Loader2: ({ className = '' }) => (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Plus: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash2: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Upload: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  X: ({ className = '' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

// سياق اللغة
const LanguageContext = React.createContext<any>(null);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const t = (key: string, params?: Record<string, any>): string => {
    const translations: Record<string, Record<string, string>> = {
      ar: {
        // عام
        'schoolProfile': 'ملف المدرسة',
        'manageSchoolInfo': 'إدارة وتحديث معلومات المدرسة',
        'save': 'حفظ',
        'loading': 'جاري التحميل...',
        'saveSuccess': 'تم الحفظ بنجاح',
        'saveError': 'حدث خطأ أثناء الحفظ',
        'add': 'إضافة',
        'edit': 'تعديل',
        'delete': 'حذف',
        'cancel': 'إلغاء',
        'search': 'بحث',
        'noData': 'لا توجد بيانات',
        
        // التابات
        'basicInfo': 'المعلومات الأساسية',
        'aboutSchool': 'عن المدرسة',
        'whyChooseUs': 'لماذا تختارنا',
        'gallery': 'المعرض',
        'blog': 'المدونة',
        'slider': 'السلايدر',
        
        // حقول
        'schoolName': 'اسم المدرسة',
        'email': 'البريد الإلكتروني',
        'phone': 'رقم الهاتف',
        'address': 'العنوان',
        'description': 'الوصف',
        'status': 'الحالة',
        'logo': 'الشعار',
        'active': 'مفعل',
        'inactive': 'معطل',
        'aboutUs': 'من نحن',
        'historyVisionValues': 'التاريخ، الرؤية، والقيم',
        'stagesActivities': 'المراحل والأنشطة',
        'sectionTitle': 'عنوان القسم',
        'details': 'التفاصيل',
        'addNewImage': 'إضافة صورة جديدة',
        'addNewArticle': 'إضافة مقال جديد',
        'articleTitle': 'عنوان المقال',
        'articleContent': 'محتوى المقال',
        'sliderTitle': 'عنوان السلايدر',
        'sliderImage': 'صورة السلايدر',
        'preview': 'معاينة',
        
        // الصور
        'uploadImage': 'رفع صورة',
        'changeImage': 'تغيير الصورة',
        'removeImage': 'إزالة الصورة',
        'dragDrop': 'اسحب وأفلت الصورة هنا',
        'clickToSelect': 'أو انقر للاختيار',
        'supportedFormats': 'الصيغ المدعومة',
        'maxSize': 'الحد الأقصى',
        'imageRequired': 'الصورة مطلوبة',
        'currentImage': 'الصورة الحالية',
        'newImage': 'صورة جديدة',
        
        // رسائل
        'confirmDelete': 'هل أنت متأكد من الحذف؟',
        'noImages': 'لا توجد صور في المعرض',
        'noArticles': 'لا توجد مقالات',
      },
      en: {
        // General
        'schoolProfile': 'School Profile',
        'manageSchoolInfo': 'Manage and update school information',
        'save': 'Save',
        'loading': 'Loading...',
        'saveSuccess': 'Saved successfully',
        'saveError': 'Error saving changes',
        'add': 'Add',
        'edit': 'Edit',
        'delete': 'Delete',
        'cancel': 'Cancel',
        'search': 'Search',
        'noData': 'No data available',
        
        // Tabs
        'basicInfo': 'Basic Information',
        'aboutSchool': 'About School',
        'whyChooseUs': 'Why Choose Us',
        'gallery': 'Gallery',
        'blog': 'Blog',
        'slider': 'Slider',
        
        // Fields
        'schoolName': 'School Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'description': 'Description',
        'status': 'Status',
        'logo': 'Logo',
        'active': 'Active',
        'inactive': 'Inactive',
        'aboutUs': 'About Us',
        'historyVisionValues': 'History, Vision & Values',
        'stagesActivities': 'Stages & Activities',
        'sectionTitle': 'Section Title',
        'details': 'Details',
        'addNewImage': 'Add New Image',
        'addNewArticle': 'Add New Article',
        'articleTitle': 'Article Title',
        'articleContent': 'Article Content',
        'sliderTitle': 'Slider Title',
        'sliderImage': 'Slider Image',
        'preview': 'Preview',
        
        // Images
        'uploadImage': 'Upload Image',
        'changeImage': 'Change Image',
        'removeImage': 'Remove Image',
        'dragDrop': 'Drag and drop image here',
        'clickToSelect': 'or click to select',
        'supportedFormats': 'Supported formats',
        'maxSize': 'Max size',
        'imageRequired': 'Image is required',
        'currentImage': 'Current Image',
        'newImage': 'New Image',
        
        // Messages
        'confirmDelete': 'Are you sure you want to delete?',
        'noImages': 'No images in gallery',
        'noArticles': 'No articles',
      }
    };

    let translation = translations[language]?.[key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// مكون ImageUploader مبسط
const ImageUploader = ({ 
  value, 
  onChange,
  label,
  isEditing = false
}: { 
  value: string | null; 
  onChange: (value: string | null) => void;
  label?: string;
  isEditing?: boolean;
}) => {
  const { t } = useLanguage();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="space-y-4">
      {label && (
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm text-red-600 hover:text-red-800"
            >
              {t('removeImage')}
            </button>
          )}
        </div>
      )}
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        {value ? (
          <div className="space-y-4">
            <div className="relative mx-auto w-48 h-48">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                <icons.Upload className="w-4 h-4 mr-2" />
                {t('changeImage')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <icons.Image className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {t('dragDrop')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('clickToSelect')}
              </p>
            </div>
            <Button onClick={() => document.getElementById('file-input')?.click()}>
              <icons.Upload className="w-4 h-4 mr-2" />
              {t('uploadImage')}
            </Button>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

// المكون الرئيسي
export default function SchoolProfilePage() {
  return (
    <LanguageProvider>
      <MainLayout>
        <SchoolProfile />
      </MainLayout>
    </LanguageProvider>
  );
}

function SchoolProfile() {
  const { user, updateUser } = useAuth();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');
  const [isSaving, setIsSaving] = useState(false);
  
  const initialFormData: SchoolProfileData = {
  
    about: {
      about_us: user?.about?.about_us || '',
      history_vision_values: user?.about?.history_vision_values || '',
      stages_and_activities: user?.about?.stages_and_activities || '',
    },
    why_choose: {
      title: user?.why_choose?.title || '',
      details: user?.why_choose?.details || '',
    },
    activities_gallery: (user?.activities_gallery || []).map((item: any) => ({
      id: item.id,
      image: item.image || '',
      caption: item.caption || '',
    })),
    blog_content: (user?.blog_content || []).map((item: any) => ({
      id: item.id,
      title: item.title || '',
      text: item.text || item.content || '',
    })),
    slider: {
      title: user?.slider?.title || '',
      image: user?.slider?.image || '',
    },
  };

  const [formData, setFormData] = useState<SchoolProfileData>(initialFormData);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const updateData = {
        ...formData,
        school_id: user?.school_id,
      };

      const response = await apiFetch(`/schools/${user?.school_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.success) {
        const updatedUser = {
          ...user!,
          ...formData,
          school: {
            ...user?.school,
            name: user?.school?.name || '',
          }
        };
        updateUser(updatedUser);
toast.success(t('saveSuccess'));
        
      } else {
        throw new Error(response.message || t('saveError'));
        toast.error(response.message || t('saveError'));
      }
    } catch (error: any) {
    toast.error(error.message || t('saveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAboutChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const handleWhyChooseChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      why_choose: {
        ...prev.why_choose,
        [field]: value,
      },
    }));
  };

  const handleSliderChange = (field: string, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      slider: {
        ...prev.slider,
        [field]: value,
      },
    }));
  };

  const handleAddGalleryItem = (image: string, caption: string) => {
    if (!image || !caption) return;
    
    setFormData(prev => ({
      ...prev,
      activities_gallery: [
        ...prev.activities_gallery,
        { image, caption }
      ],
    }));
  };

  const handleRemoveGalleryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities_gallery: prev.activities_gallery.filter((_, i) => i !== index),
    }));
  };

  const handleAddBlogItem = (title: string, text: string) => {
    if (!title || !text) return;
    
    setFormData(prev => ({
      ...prev,
      blog_content: [
        ...prev.blog_content,
        { title, text }
      ],
    }));
  };

  const handleRemoveBlogItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      blog_content: prev.blog_content.filter((_, i) => i !== index),
    }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <icons.Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold tracking-tight">{t('schoolProfile')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('manageSchoolInfo')}
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className={isRTL ? 'flex-row-reverse' : ''}
        >
          {isSaving ? (
            <>
              <icons.Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('loading')}
            </>
          ) : (
            <>
              <icons.Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('save')}
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={isRTL ? 'rtl' : 'ltr'}>
         
          <TabsTrigger 
            value="about" 
            activeValue={activeTab}
            onClick={() => setActiveTab('about')}
          >
            <icons.Info className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('aboutSchool')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="why-choose" 
            activeValue={activeTab}
            onClick={() => setActiveTab('why-choose')}
          >
            <icons.BookOpen className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('whyChooseUs')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="gallery" 
            activeValue={activeTab}
            onClick={() => setActiveTab('gallery')}
          >
            <icons.Gallery className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('gallery')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="blog" 
            activeValue={activeTab}
            onClick={() => setActiveTab('blog')}
          >
            <icons.BookOpen className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('blog')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="slider" 
            activeValue={activeTab}
            onClick={() => setActiveTab('slider')}
          >
            <icons.Image className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('slider')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
     

        {/* About Tab */}
        <TabsContent value="about" activeValue={activeTab}>
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{t('aboutSchool')}</CardTitle>
              <CardDescription>{t('aboutSchool')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="about_us">{t('aboutUs')}</Label>
                  <Textarea
                    id="about_us"
                    value={formData.about.about_us}
                    onChange={(e) => handleAboutChange('about_us', e.target.value)}
                    placeholder={t('aboutUs')}
                    rows={5}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="history_vision_values">{t('historyVisionValues')}</Label>
                  <Textarea
                    id="history_vision_values"
                    value={formData.about.history_vision_values}
                    onChange={(e) => handleAboutChange('history_vision_values', e.target.value)}
                    placeholder={t('historyVisionValues')}
                    rows={5}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="stages_and_activities">{t('stagesActivities')}</Label>
                  <Textarea
                    id="stages_and_activities"
                    value={formData.about.stages_and_activities}
                    onChange={(e) => handleAboutChange('stages_and_activities', e.target.value)}
                    placeholder={t('stagesActivities')}
                    rows={5}
                    dir={dir}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Why Choose Us Tab */}
        <TabsContent value="why-choose" activeValue={activeTab}>
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{t('whyChooseUs')}</CardTitle>
              <CardDescription>{t('whyChooseUs')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="why_choose_title">{t('sectionTitle')}</Label>
                  <Input
                    id="why_choose_title"
                    value={formData.why_choose.title}
                    onChange={(e) => handleWhyChooseChange('title', e.target.value)}
                    placeholder={t('sectionTitle')}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="why_choose_details">{t('details')}</Label>
                  <Textarea
                    id="why_choose_details"
                    value={formData.why_choose.details}
                    onChange={(e) => handleWhyChooseChange('details', e.target.value)}
                    placeholder={t('details')}
                    rows={8}
                    dir={dir}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" activeValue={activeTab}>
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{t('gallery')}</CardTitle>
              <CardDescription>{t('gallery')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* إضافة صورة جديدة */}
              <Card>
                <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                  <CardTitle>{t('addNewImage')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <GalleryForm onAdd={handleAddGalleryItem} />
                </CardContent>
              </Card>

              {/* المعرض الحالي */}
              <div>
                <h3 className="font-medium mb-4">
                  {t('gallery')} ({formData.activities_gallery.length})
                </h3>
                {formData.activities_gallery.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {t('noImages')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.activities_gallery.map((item, index) => (
                      <GalleryItem
                        key={index}
                        item={item}
                        onRemove={() => handleRemoveGalleryItem(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" activeValue={activeTab}>
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{t('blog')}</CardTitle>
              <CardDescription>{t('blog')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* إضافة مقال جديد */}
              <Card>
                <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                  <CardTitle>{t('addNewArticle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogForm onAdd={handleAddBlogItem} />
                </CardContent>
              </Card>

              {/* المقالات الحالية */}
              <div>
                <h3 className="font-medium mb-4">
                  {t('blog')} ({formData.blog_content.length})
                </h3>
                {formData.blog_content.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {t('noArticles')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.blog_content.map((item, index) => (
                      <BlogItem
                        key={index}
                        item={item}
                        onRemove={() => handleRemoveBlogItem(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Slider Tab */}
        <TabsContent value="slider" activeValue={activeTab}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle>{t('slider')}</CardTitle>
                <CardDescription>{t('slider')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="slider_title">{t('sliderTitle')}</Label>
                    <Input
                      id="slider_title"
                      value={formData.slider.title}
                      onChange={(e) => handleSliderChange('title', e.target.value)}
                      placeholder={t('sliderTitle')}
                      dir={dir}
                    />
                  </div>
                  <div>
                    <Label>{t('sliderImage')}</Label>
                    <ImageUploader
                      value={formData.slider.image}
                      onChange={(value) => handleSliderChange('image', value)}
                      label={t('sliderImage')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle>{t('preview')}</CardTitle>
                <CardDescription>{t('preview')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border aspect-[16/9]">
                  {formData.slider.image ? (
                    <>
                      <img
                        src={formData.slider.image}
                        alt="Slider Preview"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {formData.slider.title || t('sliderTitle')}
                          </h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                      <div className="text-center space-y-2">
                        <p className="text-gray-500">
                          {t('noImages')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// مكونات مساعدة
function GalleryForm({ onAdd }: { onAdd: (image: string, caption: string) => void }) {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image && caption) {
      onAdd(image, caption);
      setImage('');
      setCaption('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUploader
        value={image}
        onChange={setImage}
        label={t('sliderImage')}
      />
      <div>
        <Label htmlFor="caption">{t('details')}</Label>
        <Input
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={t('details')}
        />
      </div>
      <Button type="submit" disabled={!image || !caption}>
        <icons.Plus className="w-4 h-4 mr-2" />
        {t('add')}
      </Button>
    </form>
  );
}

function GalleryItem({ item, onRemove }: { item: any; onRemove: () => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <img
          src={item.image}
          alt={item.caption}
          className="object-cover w-full h-full"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <icons.Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium">{item.caption}</p>
      </div>
    </div>
  );
}

function BlogForm({ onAdd }: { onAdd: (title: string, text: string) => void }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && text) {
      onAdd(title, text);
      setTitle('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="blog_title">{t('articleTitle')}</Label>
        <Input
          id="blog_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('articleTitle')}
        />
      </div>
      <div>
        <Label htmlFor="blog_text">{t('articleContent')}</Label>
        <Textarea
          id="blog_text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('articleContent')}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={!title || !text}>
        <icons.Plus className="w-4 h-4 mr-2" />
        {t('add')}
      </Button>
    </form>
  );
}

function BlogItem({ item, onRemove }: { item: any; onRemove: () => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <h4 className="font-medium text-lg">{item.title}</h4>
          <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
        </div>
        <button
          onClick={onRemove}
          className="ml-4 text-red-500 hover:text-red-600"
        >
          <icons.Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}