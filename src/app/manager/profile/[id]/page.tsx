// app/schools/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
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
import { ImageUploader } from "@/components/Tablecomponents/ImageUpload";
import { ArrowLeft, Save, Building2, Mail, Phone, MapPin, User, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface SchoolData {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  active: boolean;
  logo: string;
  manager_name: string;
  manager_email: string;
  created_at: string;
  updated_at: string;
}

interface SchoolApiResponse {
  result: string;
  data: SchoolData;
  message: string;
  status: number;
}

// دالة لتحويل الـ URL لـ File object
const urlToFile = async (url: string, filename: string): Promise<File> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw new Error('Failed to convert image URL to file');
  }
};

export default function EditSchoolPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [logoFile, setLogoFile] = useState<File | string | null>(null);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    des: '',
    manager_name: '',
    manager_email: '',
    manager_password: ''
  });

  // الترجمات
  const t = {
    pageTitle: language === 'ar' ? 'تعديل بيانات المدرسة' : 'Edit School',
    backToSchools: language === 'ar' ? 'العودة إلى المدارس' : 'Back to Schools',
    loading: language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...',
    error: language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data',
    tryAgain: language === 'ar' ? 'حاول مرة أخرى' : 'Try Again',
    save: language === 'ar' ? 'حفظ التغييرات' : 'Save Changes',
    saving: language === 'ar' ? 'جاري الحفظ...' : 'Saving...',
    saved: language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully',
    
    // Form Labels
    schoolInfo: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    managerInfo: language === 'ar' ? 'معلومات المدير' : 'Manager Information',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    slug: language === 'ar' ? 'الرابط' : 'Slug',
    address: language === 'ar' ? 'العنوان' : 'Address',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    description: language === 'ar' ? 'الوصف' : 'Description',
    logo: language === 'ar' ? 'شعار المدرسة' : 'School Logo',
    managerName: language === 'ar' ? 'اسم المدير' : 'Manager Name',
    managerEmail: language === 'ar' ? 'بريد المدير' : 'Manager Email',
    managerPassword: language === 'ar' ? 'كلمة مرور المدير' : 'Manager Password',
    
    // Placeholders
    enterSchoolName: language === 'ar' ? 'أدخل اسم المدرسة' : 'Enter school name',
    enterAddress: language === 'ar' ? 'أدخل العنوان الكامل' : 'Enter full address',
    enterPhone: language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
    enterEmail: language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email address',
    enterDescription: language === 'ar' ? 'أدخل وصف المدرسة' : 'Enter school description',
    enterManagerName: language === 'ar' ? 'أدخل اسم المدير الكامل' : 'Enter manager full name',
    enterManagerEmail: language === 'ar' ? 'أدخل بريد المدير' : 'Enter manager email',
    enterManagerPassword: language === 'ar' ? 'أدخل كلمة مرور المدير' : 'Enter password for manager account',
    
    // Messages
    slugNotEditable: language === 'ar' ? 'لا يمكن تعديل الرابط' : 'Slug cannot be edited',
    nameNotEditable: language === 'ar' ? 'لا يمكن تعديل اسم المدرسة' : 'School name cannot be edited',
    updateSuccess: language === 'ar' ? 'تم تحديث بيانات المدرسة بنجاح' : 'School updated successfully',
    updateError: language === 'ar' ? 'خطأ في تحديث البيانات' : 'Error updating data',
    passwordOptional: language === 'ar' ? 'اتركه فارغاً إذا كنت لا تريد تغيير كلمة المرور' : 'Leave blank if you don\'t want to change the password',
    changeLogo: language === 'ar' ? 'تغيير الشعار' : 'Change Logo',
    currentLogo: language === 'ar' ? 'الشعار الحالي' : 'Current Logo',
    noLogo: language === 'ar' ? 'لا يوجد شعار' : 'No logo',
    togglePassword: language === 'ar' ? 'إظهار/إخفاء كلمة المرور' : 'Show/Hide password',
  };

  // Fetch school data
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: SchoolApiResponse = await apiFetch(`/schools/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        setSchoolData(response.data);
        
        // إذا فيه logo URL، نحوله لـ File object
        if (response.data.logo) {
          try {
            const file = await urlToFile(response.data.logo, `school-logo-${response.data.id}.png`);
            setLogoFile(file);
          } catch (error) {
            console.error('Failed to convert logo URL to file:', error);
            // إذا فشل التحويل، نستخدم الـ URL كـ string كحالة بديلة
            setLogoFile(response.data.logo);
          }
        } else {
          setLogoFile(null);
        }
        
        setFormData({
          address: response.data.address || '',
          phone: response.data.phone || '',
          email: response.data.email || '',
          des: response.data.des || '',
          manager_name: response.data.manager_name || '',
          manager_email: response.data.manager_email || '',
          manager_password: '' // لا نملأ كلمة المرور لأسباب أمنية
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching school data:', err);
        toast.error(language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchoolData();
    }
  }, [id, language]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle logo change
  const handleLogoChange = (file: File | string | null) => {
    setLogoFile(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      // إنشاء FormData لإرسال الملفات
      const formDataToSend = new FormData();
      
      // إضافة البيانات النصية
      formDataToSend.append('address', formData.address);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('des', formData.des);
      formDataToSend.append('manager_name', formData.manager_name);
      formDataToSend.append('manager_email', formData.manager_email);

      // إضافة الباسورد فقط إذا تم إدخاله
      if (formData.manager_password.trim()) {
        formDataToSend.append('manager_password', formData.manager_password);
      }

      // معالجة الـ logo
      if (logoFile instanceof File) {
        // إذا كان File جديد، نرسله
        formDataToSend.append('logo', logoFile);
        console.log('🖼️ Sending new logo file:', logoFile.name, logoFile.type, logoFile.size);
      } else if (logoFile === null) {
        // إذا تم حذف الصورة، نرسل string فارغ
        formDataToSend.append('logo', '');
        console.log('🗑️ Logo removed');
      } else if (typeof logoFile === 'string') {
        // إذا كان string URL، نحوله لـ File أولاً
        try {
          const file = await urlToFile(logoFile, `school-logo-${id}.png`);
          formDataToSend.append('logo', file);
          console.log('🖼️ Converted URL to file:', file.name, file.type, file.size);
        } catch (error) {
          console.error('Failed to convert logo URL to file:', error);
          throw new Error('Failed to process school logo');
        }
      }

      console.log('📤 Sending form data:');
      console.log('📍 Address:', formData.address);
      console.log('📞 Phone:', formData.phone);
      console.log('📧 Email:', formData.email);
      console.log('📝 Description:', formData.des);
      console.log('👤 Manager Name:', formData.manager_name);
      console.log('📧 Manager Email:', formData.manager_email);
      console.log('🔐 Manager Password:', formData.manager_password ? '***' : 'Not changed');
      console.log('🖼️ Logo type:', logoFile instanceof File ? 'File' : typeof logoFile);

      // إرسال طلب التحديث باستخدام FormData
      const response = await apiFetch(`/schools/${id}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.result === 'Success') {
        toast.success(t.updateSuccess);
        setTimeout(() => {
          router.push('/schools');
        }, 1500);
      } else {
        throw new Error(response.message || t.updateError);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.updateError;
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error updating school:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-blue-700 font-medium text-lg">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (error && !schoolData) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-red-700 font-medium text-lg mb-2">{t.error}</p>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t.tryAgain}
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                onClick={() => router.push('/schools')}
                className={`flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backToSchools}
              </Button>
              
              <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
                  {t.pageTitle}
                </h1>
                {schoolData && (
                  <div className="flex items-center gap-3 mt-2">
                    {schoolData.logo && (
                      <img 
                        src={schoolData.logo} 
                        alt="School Logo" 
                        className="w-10 h-10 rounded-lg object-cover border-2 border-blue-200 shadow-sm"
                      />
                    )}
                    <div>
                      <p className="text-blue-600 font-medium text-lg">
                        {schoolData.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {schoolData.slug}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* School Information */}
              <Card className="border-blue-200 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {t.schoolInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* School Name (Read-only) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {t.schoolName}
                    </label>
                    <Input
                      value={schoolData?.name || ''}
                      disabled
                      className="bg-gray-100 border-gray-200 text-gray-700 cursor-not-allowed font-medium"
                    />
                    <p className="text-xs text-gray-500">{t.nameNotEditable}</p>
                  </div>

                  {/* Slug (Read-only) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <span>🔗</span>
                      {t.slug}
                    </label>
                    <Input
                      value={schoolData?.slug || ''}
                      disabled
                      className="bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500">{t.slugNotEditable}</p>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {t.address}
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t.enterAddress}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t.phone}
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.enterPhone}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.email}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.enterEmail}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700">
                      {t.description}
                    </label>
                    <Textarea
                      name="des"
                      value={formData.des}
                      onChange={handleInputChange}
                      placeholder={t.enterDescription}
                      rows={4}
                      className="border-blue-200 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Logo Uploader */}
                  <div className="space-y-2">
                    <ImageUploader
                      value={logoFile}
                      onChange={handleLogoChange}
                      label={t.logo}
                      required={false}
                      isEditing={true}
                      compact={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Manager Information */}
              <Card className="border-green-200 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t.managerInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Manager Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.managerName}
                    </label>
                    <Input
                      name="manager_name"
                      value={formData.manager_name}
                      onChange={handleInputChange}
                      placeholder={t.enterManagerName}
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>

                  {/* Manager Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.managerEmail}
                    </label>
                    <Input
                      name="manager_email"
                      type="email"
                      value={formData.manager_email}
                      onChange={handleInputChange}
                      placeholder={t.enterManagerEmail}
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>

                  {/* Manager Password (Optional for update) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {t.managerPassword}
                    </label>
                    <div className="relative">
                      <Input
                        name="manager_password"
                        type={showPassword ? "text" : "password"}
                        value={formData.manager_password}
                        onChange={handleInputChange}
                        placeholder={t.enterManagerPassword}
                        className="border-green-200 focus:border-green-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 hover:text-gray-700"
                        title={t.togglePassword}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {t.passwordOptional}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-8 py-2.5 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    {t.save}
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}