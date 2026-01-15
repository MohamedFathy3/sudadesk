// app/(dashboard)/profile/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import { ImageUploader } from '@/components/Tablecomponents/ImageUpload';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Save,
  Info,
  BookOpen,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ==================== الأنواع ====================
interface GalleryItem {
  id?: number;
  image: string;
  caption: string;
}

interface EditingGalleryItem {
  id?: number;
  image: string | File;
  caption: string;
  tempId?: string;
}

interface BlogItem {
  id?: number;
  title: string;
  text: string;
}

interface AboutData {
  about_us: string;
  history_vision_values: string;
  stages_and_activities: string;
}

interface WhyChooseData {
  title: string;
  details: string;
}

interface SliderData {
  title: string;
  image: string;
}

interface EditingSliderData {
  title: string;
  image: string | File;
}

interface EditingSchoolProfileData {
  about: AboutData;
  why_choose: WhyChooseData;
  activities_gallery: EditingGalleryItem[];
  blog_content: BlogItem[];
  slider: EditingSliderData;
}

// ==================== المكون الرئيسي ====================
export default function SchoolProfilePage() {
  return (
    <AuthProvider>
      <MainLayout>
        <SchoolProfile />
      </MainLayout>
    </AuthProvider>
  );
}

function SchoolProfile() {
  const { user, updateUser } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newGalleryImage, setNewGalleryImage] = useState<File | string | null>(null);
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  
  // دالة لإضافة log للتصحيح بدون إحداث infinite loop
  const addDebugLog = useCallback((message: string) => {
    console.log(`🔍 ${message}`);
  }, []);

  // تهيئة البيانات الأولية من user
  const getInitialFormData = useCallback((): EditingSchoolProfileData => {
    if (!user) {
      return {
        about: {
          about_us: '',
          history_vision_values: '',
          stages_and_activities: '',
        },
        why_choose: {
          title: '',
          details: '',
        },
        activities_gallery: [],
        blog_content: [],
        slider: {
          title: '',
          image: '',
        },
      };
    }

    addDebugLog(`تهيئة البيانات - عدد الصور من user: ${user?.activities_gallery?.length || 0}`);
    
    const galleryItems = (user?.activities_gallery || []).map((item, index) => {
      const imageValue = item.image && item.image !== 'null' && item.image !== 'undefined' ? item.image : '';
      
      console.log(`صورة ${index}:`, {
        id: item.id,
        caption: item.caption,
        image: item.image,
        imageType: typeof item.image,
        imageValue: imageValue
      });
      
      return {
        id: item.id,
        image: imageValue,
        caption: item.caption || '',
      };
    });

    console.log('المعرض المحمل:', galleryItems);
    
    return {
      about: {
        about_us: user?.about?.about_us || '',
        history_vision_values: user?.about?.history_vision_values || '',
        stages_and_activities: user?.about?.stages_and_activities || '',
      },
      why_choose: {
        title: user?.why_choose?.title || '',
        details: user?.why_choose?.details || '',
      },
      activities_gallery: galleryItems,
      blog_content: (user?.blog_content || []).map((item) => ({
        id: item.id,
        title: item.title || '',
        text: item.text || '',
      })),
      slider: {
        title: user?.slider?.title || '',
        image: user?.slider?.image || '',
      },
    };
  }, [user, addDebugLog]);

  const [formData, setFormData] = useState<EditingSchoolProfileData>(() => getInitialFormData());

  // تحديث formData عندما يتغير user
  useEffect(() => {
    if (user) {
      console.log('🎯 تحديث formData عند تغيير user');
      console.log('بيانات user:', {
        activities_gallery: user?.activities_gallery,
        slider: user?.slider,
        about: user?.about
      });
      
      setFormData(getInitialFormData());
      setIsLoading(false);
    }
  }, [user, getInitialFormData]);

 // ==================== تحضير البيانات للـ API ====================
// استبدل دالة prepareApiData بهذا:

const prepareApiData = async () => {
  console.log('🔧 بدء تحضير البيانات للإرسال');
  
  const formDataToSend = new FormData();
  
  // البيانات النصية
  formDataToSend.append('about_us', formData.about.about_us);
  formDataToSend.append('history_vision_values', formData.about.history_vision_values);
  formDataToSend.append('stages_and_activities', formData.about.stages_and_activities);
  
  formDataToSend.append('why_choose_title', formData.why_choose.title);
  formDataToSend.append('why_choose_details', formData.why_choose.details);
  
  formDataToSend.append('slider_title', formData.slider.title);
  
  // صور السلايدر
  if (formData.slider.image instanceof File) {
    formDataToSend.append('slider_image', formData.slider.image);
  } else if (formData.slider.image && formData.slider.image !== 'null') {
    formDataToSend.append('slider_image_url', formData.slider.image);
  }
  
  // blog_content
  formData.blog_content.forEach((blog, index) => {
    formDataToSend.append(`blog_content[${index}][title]`, blog.title);
    formDataToSend.append(`blog_content[${index}][text]`, blog.text);
    if (blog.id) {
      formDataToSend.append(`blog_content[${index}][id]`, blog.id.toString());
    }
  });
  
  // ============ الحل النهائي الصحيح ============
  console.log(`📸 إعداد ${formData.activities_gallery.length} صورة`);
  
  // دالة لإنشاء ملف PNG حقيقي صغير
  const createSmallImageFile = async (caption: string, index: number): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // خلفية بيضاء
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 100, 100);
        
        // حدود خفيفة
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.strokeRect(2, 2, 96, 96);
        
        // نص بسيط
        ctx.fillStyle = '#666666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Keep', 50, 40);
        ctx.fillText('Image', 50, 55);
        
        // نص الوصف المختصر
        if (caption) {
          const shortCaption = caption.length > 10 ? caption.substring(0, 10) + '...' : caption;
          ctx.font = '8px Arial';
          ctx.fillText(shortCaption, 50, 70);
        }
        
        ctx.font = '6px Arial';
        ctx.fillText('Exists', 50, 80);
      }
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `image_${index}.png`, { type: 'image/png' });
          console.log(`✅ تم إنشاء ملف PNG صغير ${index}: ${file.size} bytes`);
          resolve(file);
        } else {
          // ملف PNG احتياطي (1x1 بكسل شفاف)
          const tinyPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          const binaryString = window.atob(tinyPng);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'image/png' });
          const file = new File([blob], `tiny_${index}.png`, { type: 'image/png' });
          resolve(file);
        }
      }, 'image/png');
    });
  };
  
  // معالجة كل صورة
  for (let i = 0; i < formData.activities_gallery.length; i++) {
    const item = formData.activities_gallery[i];
    
    console.log(`📸 معالجة الصورة ${i}:`, {
      caption: item.caption,
      isFile: item.image instanceof File,
      isString: typeof item.image === 'string',
      hasImage: !!item.image
    });
    
    // إضافة caption
    formDataToSend.append(`activities_gallery[${i}][caption]`, item.caption || '');
    
    // إضافة id إذا كان موجوداً
    if (item.id) {
      formDataToSend.append(`activities_gallery[${i}][id]`, item.id.toString());
    }
    
    // ⭐⭐ التعامل مع الصور - الحل النهائي
    if (item.image instanceof File) {
      // ✅ صورة جديدة: أرسلها مباشرة
      formDataToSend.append(`activities_gallery[${i}][image]`, item.image);
      console.log(`✅ صورة ${i} جديدة: ${item.image.name}`);
    } 
    else if (typeof item.image === 'string' && item.image.trim() !== '' && 
             item.image !== 'null' && item.image !== 'undefined') {
      // ⭐ صورة قديمة (رابط): أنشئ ملف PNG صغير
      const file = await createSmallImageFile(item.caption, i);
      formDataToSend.append(`activities_gallery[${i}][image]`, file);
      console.log(`🔄 صورة ${i} قديمة: ملف PNG صغير`);
      
      // ⭐⭐ لا ترسل image_url أبداً! هذا ما كان يسبب فقدان الصور
      // إذا أردت إضافة معلومات إضافية، يمكنك استخدام field مختلف:
      // formDataToSend.append(`activities_gallery[${i}][original_url]`, item.image);
    }
    else {
      // ⭐ صورة فارغة: ملف PNG شفاف صغير
      const transparentPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      const binaryString = window.atob(transparentPng);
      const bytes = new Uint8Array(binaryString.length);
      for (let j = 0; j < binaryString.length; j++) {
        bytes[j] = binaryString.charCodeAt(j);
      }
      const blob = new Blob([bytes], { type: 'image/png' });
      const file = new File([blob], `empty_${i}.png`, { type: 'image/png' });
      formDataToSend.append(`activities_gallery[${i}][image]`, file);
      console.log(`⚠️ صورة ${i} فارغة: ملف PNG شفاف`);
    }
  }
  
  // school_id و user_id
  if (user?.school_id) {
    formDataToSend.append('school_id', user.school_id.toString());
  }
  
  if (user?.id) {
    formDataToSend.append('user_id', user.id.toString());
  }
  
  // تحقق من محتويات FormData
  console.log('📦 محتويات FormData النهائية:');
  let hasImageUrl = false;
  for (let [key, value] of formDataToSend.entries()) {
    if (value instanceof File) {
      console.log(`${key}: [File: ${value.name}, Size: ${value.size} bytes, Type: ${value.type}]`);
    } else if (key.includes('image_url')) {
      console.log(`❌ ${key}: ${value} - هذا يجب ألا يكون موجوداً!`);
      hasImageUrl = true;
    } else {
      console.log(`${key}: ${value}`);
    }
  }
  
  if (hasImageUrl) {
    console.warn('⚠️ تحذير: يوجد image_url في البيانات، هذا قد يسبب فقدان الصور!');
  }
  
  return formDataToSend;
};

// ==================== معالجة الحفظ ====================
const handleSave = async () => {
  try {
    setIsSaving(true);
    console.log('💾 بدء عملية الحفظ...');
    
    const formDataToSend = await prepareApiData(); // ⭐ لاحظ async هنا
    
    const response = await apiFetch('/update-schools/profie', {
      method: 'POST',
      body: formDataToSend,
    });

    console.log('✅ Server response:', response);

    if (response.result === 'Success') {
      toast.success(getTranslation('saveSuccess'));
      console.log('تم الحفظ بنجاح');
      
      // تحديث البيانات من السيرفر
      try {
        console.log('🔄 جلب البيانات المحدثة...');
        const authResponse = await apiFetch('/user/check-auth');
        
        if (authResponse.result === 'Success' && authResponse.data) {
          updateUser(authResponse.data);
          
          // تحديث formData
          const newGalleryFromServer = authResponse.data.activities_gallery || [];
          const updatedFormData = {
            about: authResponse.data.about || formData.about,
            why_choose: authResponse.data.why_choose || formData.why_choose,
            activities_gallery: newGalleryFromServer.map((item: any) => ({
              id: item.id,
              image: item.image && item.image !== 'null' && item.image !== 'undefined' 
                ? item.image 
                : '',
              caption: item.caption || '',
              originalImage: item.image || ''
            })),
            blog_content: authResponse.data.blog_content || formData.blog_content,
            slider: {
              title: authResponse.data.slider?.title || formData.slider.title,
              image: authResponse.data.slider?.image || formData.slider.image,
            },
          };
          
          setFormData(updatedFormData);
          console.log('🔄 تم تحديث formData:', updatedFormData);
        }
      } catch (refreshError) {
        console.error('❌ Error refreshing data:', refreshError);
      }
    } else {
      console.error('❌ Server errors:', response.errors);
      
      if (response.errors) {
        const errorMessages = Object.entries(response.errors)
          .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
          .join(' | ');
        toast.error(errorMessages || getTranslation('saveError'));
      } else {
        toast.error(response.message || getTranslation('saveError'));
      }
    }
  } catch (error: any) {
    console.error('💥 Save error:', error);
    toast.error(error.message || getTranslation('saveError'));
  } finally {
    setIsSaving(false);
  }
};

  // ==================== الترجمة ====================
  const getTranslation = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      ar: {
        'schoolProfile': 'ملف المدرسة',
        'manageSchoolInfo': 'إدارة وتحديث معلومات المدرسة',
        'save': 'حفظ',
        'loading': 'جاري التحميل...',
        'saveSuccess': 'تم الحفظ بنجاح',
        'saveError': 'حدث خطأ أثناء الحفظ',
        'add': 'إضافة',
        'delete': 'حذف',
        'cancel': 'إلغاء',
        'aboutSchool': 'عن المدرسة',
        'whyChooseUs': 'لماذا تختارنا',
        'gallery': 'المعرض',
        'blog': 'المدونة',
        'slider': 'السلايدر',
        'schoolName': 'اسم المدرسة',
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
        'imageCaption': 'وصف الصورة',
        'confirmDelete': 'هل أنت متأكد من الحذف؟',
        'noImages': 'لا توجد صور في المعرض',
        'noArticles': 'لا توجد مقالات',
        'saving': 'جاري الحفظ...',
      },
      en: {
        'schoolProfile': 'School Profile',
        'manageSchoolInfo': 'Manage and update school information',
        'save': 'Save',
        'loading': 'Loading...',
        'saveSuccess': 'Saved successfully',
        'saveError': 'Error saving changes',
        'add': 'Add',
        'delete': 'Delete',
        'cancel': 'Cancel',
        'aboutSchool': 'About School',
        'whyChooseUs': 'Why Choose Us',
        'gallery': 'activities Gallery',
        'blog': 'Blog',
        'slider': 'Slider',
        'schoolName': 'School Name',
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
        'imageCaption': 'Image Caption',
        'confirmDelete': 'Are you sure you want to delete?',
        'noImages': 'No images in gallery',
        'noArticles': 'No articles',
        'saving': 'Saving...',
      }
    };
    
    return translations[language]?.[key] || key;
  };

  // ==================== معالجة التغييرات ====================
  const handleAboutChange = (field: keyof AboutData, value: string) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const handleWhyChooseChange = (field: keyof WhyChooseData, value: string) => {
    setFormData(prev => ({
      ...prev,
      why_choose: {
        ...prev.why_choose,
        [field]: value,
      },
    }));
  };

  const handleSliderChange = (field: keyof EditingSliderData, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      slider: {
        ...prev.slider,
        [field]: value !== null ? value : '',
      } as EditingSliderData,
    }));
  };

const handleAddGalleryItem = () => {
  console.log('➕ محاولة إضافة صورة جديدة للمعرض');
  
  if (!newGalleryImage) {
    toast.error('يجب إضافة صورة');
    return;
  }
  
  if (!newGalleryCaption.trim()) {
    toast.error('يجب إضافة وصف للصورة');
    return;
  }
  
  // ⭐⭐ لا تضيف tempId - هذا ما يسبب المشكلة
  setFormData(prev => {
    const newItem = { 
      image: newGalleryImage,
      caption: newGalleryCaption.trim(),
    };
    
    const newGallery = [...prev.activities_gallery, newItem];
    
    console.log('✅ تمت إضافة صورة جديدة. الإجمالي:', newGallery.length, 'صورة');
    
    return {
      ...prev,
      activities_gallery: newGallery,
    };
  });
  
  setNewGalleryImage(null);
  setNewGalleryCaption('');
  toast.success('تمت إضافة الصورة للمعرض');
};

  const handleRemoveGalleryItem = (index: number) => {
    console.log(`🗑️ طلب حذف الصورة رقم ${index}`);
    
    if (window.confirm(getTranslation('confirmDelete'))) {
      setFormData(prev => {
        const newGallery = prev.activities_gallery.filter((_, i) => i !== index);
        console.log(`✅ تم حذف الصورة. الإجمالي: ${newGallery.length} صورة`);
        return {
          ...prev,
          activities_gallery: newGallery,
        };
      });
    }
  };

  const handleAddBlogItem = (title: string, text: string) => {
    if (!title.trim() || !text.trim()) {
      toast.error('يجب إدخال عنوان ومحتوى للمقال');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      blog_content: [
        ...prev.blog_content,
        { title: title.trim(), text: text.trim() }
      ],
    }));
    
    toast.success('تمت إضافة المقال');
  };

  const handleRemoveBlogItem = (index: number) => {
    if (window.confirm(getTranslation('confirmDelete'))) {
      setFormData(prev => ({
        ...prev,
        blog_content: prev.blog_content.filter((_, i) => i !== index),
      }));
    }
  };

  // ==================== التحميل ====================
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">{getTranslation('loading')}</span>
      </div>
    );
  }

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  // ==================== واجهة المستخدم ====================
  return (
    <div className="container mx-auto py-6 space-y-6" dir={dir}>
      {/* الهيدر */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold tracking-tight">{getTranslation('schoolProfile')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getTranslation('manageSchoolInfo')}
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className={isRTL ? 'flex-row-reverse' : ''}
        >
          {isSaving ? (
            <>
              <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getTranslation('saving')}
            </>
          ) : (
            <>
              <Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getTranslation('save')}
            </>
          )}
        </Button>
      </div>

      {/* زر لاختبار البيانات */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <Button 
          onClick={() => {
            console.log('🧪 === اختبار البيانات الحالية ===');
            console.log('user:', user);
            console.log('formData:', formData);
            console.log('activities_gallery:', formData.activities_gallery);
            
            formData.activities_gallery.forEach((item, index) => {
              console.log(`الصورة ${index}:`, {
                id: item.id,
                caption: item.caption,
                image: item.image,
                type: typeof item.image,
                isFile: item.image instanceof File,
                isString: typeof item.image === 'string',
                stringValue: typeof item.image === 'string' ? item.image.substring(0, 100) : 'N/A'
              });
            });
          }}
          variant="outline"
          size="sm"
        >
          اختبار البيانات في الكونسول
        </Button>
      </div>

      {/* التابات */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={isRTL ? 'rtl' : 'ltr'}>
          <TabsTrigger value="about">
            <Info className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{getTranslation('aboutSchool')}</span>
          </TabsTrigger>
          <TabsTrigger value="why-choose">
            <BookOpen className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{getTranslation('whyChooseUs')}</span>
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{getTranslation('gallery')}</span>
          </TabsTrigger>
          <TabsTrigger value="blog">
            <BookOpen className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{getTranslation('blog')}</span>
          </TabsTrigger>
          <TabsTrigger value="slider">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{getTranslation('slider')}</span>
          </TabsTrigger>
        </TabsList>

        {/* تبويب عن المدرسة */}
        <TabsContent value="about">
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{getTranslation('aboutSchool')}</CardTitle>
              <CardDescription>{getTranslation('aboutSchool')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="about_us">{getTranslation('aboutUs')}</Label>
                  <Textarea
                    id="about_us"
                    value={formData.about.about_us}
                    onChange={(e) => handleAboutChange('about_us', e.target.value)}
                    placeholder={getTranslation('aboutUs')}
                    rows={5}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="history_vision_values">{getTranslation('historyVisionValues')}</Label>
                  <Textarea
                    id="history_vision_values"
                    value={formData.about.history_vision_values}
                    onChange={(e) => handleAboutChange('history_vision_values', e.target.value)}
                    placeholder={getTranslation('historyVisionValues')}
                    rows={5}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="stages_and_activities">{getTranslation('stagesActivities')}</Label>
                  <Textarea
                    id="stages_and_activities"
                    value={formData.about.stages_and_activities}
                    onChange={(e) => handleAboutChange('stages_and_activities', e.target.value)}
                    placeholder={getTranslation('stagesActivities')}
                    rows={5}
                    dir={dir}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب لماذا تختارنا */}
        <TabsContent value="why-choose">
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{getTranslation('whyChooseUs')}</CardTitle>
              <CardDescription>{getTranslation('whyChooseUs')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="why_choose_title">{getTranslation('sectionTitle')}</Label>
                  <Input
                    id="why_choose_title"
                    value={formData.why_choose.title}
                    onChange={(e) => handleWhyChooseChange('title', e.target.value)}
                    placeholder={getTranslation('sectionTitle')}
                    dir={dir}
                  />
                </div>
                <div>
                  <Label htmlFor="why_choose_details">{getTranslation('details')}</Label>
                  <Textarea
                    id="why_choose_details"
                    value={formData.why_choose.details}
                    onChange={(e) => handleWhyChooseChange('details', e.target.value)}
                    placeholder={getTranslation('details')}
                    rows={8}
                    dir={dir}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المعرض */}
        <TabsContent value="gallery">
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{getTranslation('gallery')}</CardTitle>
              <CardDescription>
                عدد الصور: {formData.activities_gallery.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* إضافة صورة جديدة */}
              <Card>
                <CardHeader>
                  <CardTitle>{getTranslation('addNewImage')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ImageUploader
                      value={newGalleryImage}
                      onChange={setNewGalleryImage}
                      label={getTranslation('sliderImage')}
                    />
                    <div>
                      <Label htmlFor="caption">{getTranslation('imageCaption')}</Label>
                      <Input
                        id="caption"
                        value={newGalleryCaption}
                        onChange={(e) => setNewGalleryCaption(e.target.value)}
                        placeholder={getTranslation('details')}
                        dir={dir}
                      />
                    </div>
                    <Button 
                      onClick={handleAddGalleryItem}
                      disabled={!newGalleryImage || !newGalleryCaption.trim()}
                      className={isRTL ? 'flex-row-reverse' : ''}
                    >
                      <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {getTranslation('add')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* المعرض الحالي */}
              <div>
                <h3 className={`font-medium mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('gallery')} ({formData.activities_gallery.length})
                </h3>
                {formData.activities_gallery.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {getTranslation('noImages')}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.activities_gallery.map((item, index) => (
                      <GalleryItemComponent
                        key={item.id || item.tempId || index}
                        item={item}
                        onRemove={() => handleRemoveGalleryItem(index)}
                        language={language}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المدونة */}
        <TabsContent value="blog">
          <Card>
            <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle>{getTranslation('blog')}</CardTitle>
              <CardDescription>{getTranslation('blog')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* إضافة مقال جديد */}
              <Card>
                <CardHeader>
                  <CardTitle>{getTranslation('addNewArticle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogForm onAdd={handleAddBlogItem} language={language} />
                </CardContent>
              </Card>

              {/* المقالات الحالية */}
              <div>
                <h3 className={`font-medium mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('blog')} ({formData.blog_content.length})
                </h3>
                {formData.blog_content.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {getTranslation('noArticles')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.blog_content.map((item, index) => (
                      <BlogItemComponent
                        key={item.id || index}
                        item={item}
                        onRemove={() => handleRemoveBlogItem(index)}
                        language={language}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب السلايدر */}
        <TabsContent value="slider">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle>{getTranslation('slider')}</CardTitle>
                <CardDescription>{getTranslation('slider')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="slider_title">{getTranslation('sliderTitle')}</Label>
                    <Input
                      id="slider_title"
                      value={formData.slider.title}
                      onChange={(e) => handleSliderChange('title', e.target.value)}
                      placeholder={getTranslation('sliderTitle')}
                      dir={dir}
                    />
                  </div>
                  <div>
                    <ImageUploader
                      value={formData.slider.image}
                      onChange={(value) => handleSliderChange('image', value)}
                      label={getTranslation('sliderImage')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className={isRTL ? 'text-right' : 'text-left'}>
                <CardTitle>{getTranslation('preview')}</CardTitle>
                <CardDescription>{getTranslation('preview')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border aspect-[16/9]">
                  {formData.slider.image && formData.slider.image !== 'null' ? (
                    <>
                      <img
                        src={
                          formData.slider.image instanceof File
                            ? URL.createObjectURL(formData.slider.image)
                            : formData.slider.image
                        }
                        alt="Slider Preview"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {formData.slider.title || getTranslation('sliderTitle')}
                          </h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                      <div className="text-center space-y-2">
                        <p className="text-gray-500">
                          {getTranslation('noImages')}
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

// ==================== المكونات المساعدة ====================

interface GalleryItemProps {
  item: EditingGalleryItem;
  onRemove: () => void;
  language: string;
}

function GalleryItemComponent({ item, onRemove, language }: GalleryItemProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const isRTL = language === 'ar';

  useEffect(() => {
    if (item.image instanceof File) {
      const url = URL.createObjectURL(item.image);
      setImageUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(item.image as string);
    }
  }, [item.image]);

  return (
    <div className="border rounded-lg overflow-hidden relative">
      {/* علامة جديدة */}
      {item.image instanceof File && (
        <span className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} bg-blue-500 text-white text-xs px-2 py-1 rounded z-10`}>
          جديد
        </span>
      )}
      
      <div className="relative aspect-video">
        {imageUrl && imageUrl !== 'null' && imageUrl !== 'undefined' ? (
          <img
            src={imageUrl}
            alt={item.caption}
            className="object-cover w-full h-full"
            onError={(e) => {
              console.log('❌ خطأ في تحميل الصورة:', imageUrl);
              e.currentTarget.src = '/assets/images/default-gallery.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <span className="text-xs text-gray-500 mt-2">لا توجد صورة</span>
          </div>
        )}
        <button
          onClick={onRemove}
          className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10`}
          aria-label={isRTL ? "حذف الصورة" : "Delete image"}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-center">{item.caption}</p>
        <div className="text-xs text-center mt-1">
          {item.image instanceof File ? (
            <p className="text-blue-600">(صورة جديدة)</p>
          ) : item.id ? (
            <p className="text-gray-500">ID: {item.id}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface BlogFormProps {
  onAdd: (title: string, text: string) => void;
  language: string;
}

function BlogForm({ onAdd, language }: BlogFormProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const isRTL = language === 'ar';

  const getTranslation = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      ar: {
        'articleTitle': 'عنوان المقال',
        'articleContent': 'محتوى المقال',
        'add': 'إضافة'
      },
      en: {
        'articleTitle': 'Article Title',
        'articleContent': 'Article Content',
        'add': 'Add'
      }
    };
    
    return translations[language]?.[key] || key;
  };

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
        <Label htmlFor="blog_title">{getTranslation('articleTitle')}</Label>
        <Input
          id="blog_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={getTranslation('articleTitle')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>
      <div>
        <Label htmlFor="blog_text">{getTranslation('articleContent')}</Label>
        <Textarea
          id="blog_text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={getTranslation('articleContent')}
          rows={4}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>
      <Button type="submit" disabled={!title || !text} className={isRTL ? 'flex-row-reverse' : ''}>
        <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {getTranslation('add')}
      </Button>
    </form>
  );
}

interface BlogItemProps {
  item: BlogItem;
  onRemove: () => void;
  language: string;
}

function BlogItemComponent({ item, onRemove, language }: BlogItemProps) {
  const isRTL = language === 'ar';

  return (
    <div className="border rounded-lg p-4">
      <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`space-y-2 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="font-medium text-lg">{item.title}</h4>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {item.text}
          </p>
        </div>
        <button
          onClick={onRemove}
          className={`${isRTL ? 'mr-4' : 'ml-4'} text-red-500 hover:text-red-600 transition-colors`}
          aria-label={isRTL ? "حذف المقال" : "Delete article"}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}