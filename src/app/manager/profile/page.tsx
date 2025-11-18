'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, Phone, MapPin, User, Calendar, RefreshCw, Save, Eye, EyeOff, Lock, Upload } from 'lucide-react';
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

interface ApiResponse {
  result: string;
  message: string;
  status: boolean;
  role: string;
  data: SchoolData;
}

interface UpdateData {
  address: string;
  phone: string;
  email: string;
  des: string;
  manager_name: string;
  manager_email: string;
  manager_password?: string;
  logo?: File;
}

export default function EditSchoolPage() {
  const { language } = useLanguage();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    des: '',
    manager_name: '',
    manager_email: '',
    manager_password: ''
  });

  const t = {
    pageTitle: language === 'ar' ? 'تعديل بيانات المدرسة' : 'Edit School',
    viewTitle: language === 'ar' ? 'بيانات المدرسة' : 'School Data',
    schoolInfo: language === 'ar' ? 'معلومات المدرسة' : 'School Information',
    managerInfo: language === 'ar' ? 'معلومات المدير' : 'Manager Information',
    schoolName: language === 'ar' ? 'اسم المدرسة' : 'School Name',
    slug: language === 'ar' ? 'الرابط' : 'Slug',
    address: language === 'ar' ? 'العنوان' : 'Address',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
    description: language === 'ar' ? 'الوصف' : 'Description',
    managerName: language === 'ar' ? 'اسم المدير' : 'Manager Name',
    managerEmail: language === 'ar' ? 'بريد المدير' : 'Manager Email',
    managerPassword: language === 'ar' ? 'كلمة مرور المدير' : 'Manager Password',
    status: language === 'ar' ? 'الحالة' : 'Status',
    active: language === 'ar' ? 'نشط' : 'Active',
    inactive: language === 'ar' ? 'غير نشط' : 'Inactive',
    created: language === 'ar' ? 'تاريخ الإنشاء' : 'Created At',
    updated: language === 'ar' ? 'آخر تحديث' : 'Last Updated',
    loading: language === 'ar' ? 'جاري التحميل...' : 'Loading...',
    noData: language === 'ar' ? 'لا توجد بيانات' : 'No data available',
    refresh: language === 'ar' ? 'تحديث' : 'Refresh',
    error: language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error loading data',
    tryAgain: language === 'ar' ? 'حاول مرة أخرى' : 'Try Again',
    edit: language === 'ar' ? 'تعديل' : 'Edit',
    save: language === 'ar' ? 'حفظ' : 'Save',
    cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
    saving: language === 'ar' ? 'جاري الحفظ...' : 'Saving...',
    updateSuccess: language === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully',
    updateError: language === 'ar' ? 'خطأ في التحديث' : 'Update error',
    passwordOptional: language === 'ar' ? 'اختياري - اتركه فارغاً للحفاظ على كلمة المرور الحالية' : 'Optional - leave blank to keep current password',
    togglePassword: language === 'ar' ? 'إظهار/إخفاء كلمة المرور' : 'Show/Hide password',
    nameNotEditable: language === 'ar' ? 'لا يمكن تعديل اسم المدرسة' : 'School name cannot be edited',
    slugNotEditable: language === 'ar' ? 'لا يمكن تعديل الرابط' : 'Slug cannot be edited',
    changeLogo: language === 'ar' ? 'تغيير الشعار' : 'Change Logo',
    uploadLogo: language === 'ar' ? 'رفع شعار جديد' : 'Upload New Logo',
    removeLogo: language === 'ar' ? 'إزالة الشعار' : 'Remove Logo',
    logo: language === 'ar' ? 'شعار المدرسة' : 'School Logo',
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiFetch('/user/check-auth');
      
      if (response.result === 'Success' && response.data) {
        setSchoolData(response.data);
        setFormData({
          address: response.data.address || '',
          phone: response.data.phone || '',
          email: response.data.email || '',
          des: response.data.des || '',
          manager_name: response.data.manager_name || '',
          manager_email: response.data.manager_email || '',
          manager_password: ''
        });
        setLogoPreview(response.data.logo || '');
      } else {
        throw new Error(response.message || t.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.error;
      setError(errorMessage);
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(language === 'ar' ? 'الملف يجب أن يكون صورة' : 'File must be an image');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(language === 'ar' ? 'حجم الصورة يجب أن يكون أقل من 5MB' : 'Image size must be less than 5MB');
        return;
      }

      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const updateData: UpdateData = {
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        des: formData.des,
        manager_name: formData.manager_name,
        manager_email: formData.manager_email,
      };

      // Add password only if entered
      if (formData.manager_password.trim()) {
        updateData.manager_password = formData.manager_password;
      }

      // Add logo file if selected
      if (logoFile) {
        updateData.logo = logoFile;
      }

      console.log('Sending update data:', updateData);

      // Use FormData for file upload
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('address', updateData.address);
      formDataToSend.append('phone', updateData.phone);
      formDataToSend.append('email', updateData.email);
      formDataToSend.append('des', updateData.des);
      formDataToSend.append('manager_name', updateData.manager_name);
      formDataToSend.append('manager_email', updateData.manager_email);

      // Append optional fields
      if (updateData.manager_password) {
        formDataToSend.append('manager_password', updateData.manager_password);
      }

      // Append logo file if exists
      if (updateData.logo) {
        formDataToSend.append('logo', updateData.logo);
      }

      const response = await apiFetch('/update-schools/profie', {
        method: 'POST',
        body: formDataToSend, 
      });

      if (response.result === 'Success') {
        toast.success(t.updateSuccess);
        setIsEditing(false);
        fetchProfileData();
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

  const handleCancel = () => {
    if (schoolData) {
      setFormData({
        address: schoolData.address || '',
        phone: schoolData.phone || '',
        email: schoolData.email || '',
        des: schoolData.des || '',
        manager_name: schoolData.manager_name || '',
        manager_email: schoolData.manager_email || '',
        manager_password: ''
      });
      setLogoPreview(schoolData.logo || '');
      setLogoFile(null);
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card>
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

  if (error) {
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
                onClick={fetchProfileData}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t.tryAgain}
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (!schoolData) {
    return (
      <MainLayout>
        <div className="container mx-auto p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-yellow-700 font-medium text-lg">{t.noData}</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto p-6 space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isEditing ? t.pageTitle : t.viewTitle}
              </h1>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? isEditing ? 'تعديل بيانات المدرسة والمدير' : 'عرض بيانات المدرسة والمدير'
                  : isEditing ? 'Edit school and manager information' : 'View school and manager information'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={fetchProfileData}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t.refresh}
              </Button>
              
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {t.edit}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {t.cancel}
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t.saving}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {t.save}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* School Information Card */}
              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    {t.schoolInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  
                  {/* Logo */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700">
                      {t.logo}
                    </label>
                    <div className="flex flex-col items-center gap-4">
                      {(logoPreview || schoolData.logo) && (
                        <div className="relative">
                          <img 
                            src={logoPreview || schoolData.logo} 
                            alt="School Logo" 
                            className="w-32 h-32 rounded-lg object-cover border-4 border-blue-200 shadow-md"
                          />
                          {isEditing && logoPreview && (
                            <button
                              type="button"
                              onClick={handleRemoveLogo}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="flex flex-col items-center gap-2">
                          <input
                            type="file"
                            id="logo-upload"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="logo-upload"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                          >
                            <Upload className="h-4 w-4" />
                            {t.uploadLogo}
                          </label>
                          <p className="text-xs text-gray-500">
                            {language === 'ar' ? 'PNG, JPG, JPEG حتى 5MB' : 'PNG, JPG, JPEG up to 5MB'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* School Name - Read Only */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {t.schoolName}
                    </label>
                    {isEditing ? (
                      <>
                        <Input
                          value={schoolData.name}
                          disabled
                          className="bg-gray-100 border-gray-200 text-gray-700 cursor-not-allowed font-medium"
                        />
                        <p className="text-xs text-gray-500">{t.nameNotEditable}</p>
                      </>
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-900 font-semibold">{schoolData.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Slug - Read Only */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <span>🔗</span>
                      {t.slug}
                    </label>
                    {isEditing ? (
                      <>
                        <Input
                          value={schoolData.slug}
                          disabled
                          className="bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500">{t.slugNotEditable}</p>
                      </>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 font-mono">{schoolData.slug}</p>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {t.address}
                    </label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="border-blue-200 focus:border-blue-500"
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-900">{schoolData.address}</p>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t.phone}
                    </label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="border-blue-200 focus:border-blue-500"
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-900">{schoolData.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.email}
                    </label>
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-blue-200 focus:border-blue-500"
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-900">{schoolData.email}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700">
                      {t.description}
                    </label>
                    {isEditing ? (
                      <Textarea
                        name="des"
                        value={formData.des}
                        onChange={handleInputChange}
                        rows={4}
                        className="border-blue-200 focus:border-blue-500 resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 min-h-[80px]">
                        <p className="text-blue-900 whitespace-pre-wrap">{schoolData.des}</p>
                      </div>
                    )}
                  </div>

                  {/* Status - Read Only */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-700">
                      {t.status}
                    </label>
                    <div className={`p-3 rounded-lg border ${
                      schoolData.active 
                        ? 'bg-green-50 border-green-200 text-green-900' 
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}>
                      <p className="font-semibold">
                        {schoolData.active ? t.active : t.inactive}
                      </p>
                    </div>
                  </div>

                  {/* Dates - Read Only */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t.created}
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm">{schoolData.created_at}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t.updated}
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm">{schoolData.updated_at}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manager Information Card */}
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-green-50 border-b border-green-200">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <User className="h-6 w-6" />
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
                    {isEditing ? (
                      <Input
                        name="manager_name"
                        value={formData.manager_name}
                        onChange={handleInputChange}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-900 font-semibold">{schoolData.manager_name}</p>
                      </div>
                    )}
                  </div>

                  {/* Manager Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.managerEmail}
                    </label>
                    {isEditing ? (
                      <Input
                        name="manager_email"
                        type="email"
                        value={formData.manager_email}
                        onChange={handleInputChange}
                        required
                        className="border-green-200 focus:border-green-500"
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-900">{schoolData.manager_email}</p>
                      </div>
                    )}
                  </div>

                  {/* Manager Password - Only in Edit Mode */}
                  {isEditing && (
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
                          placeholder={t.passwordOptional}
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
                  )}
                </CardContent>
              </Card>
            </div>
          </form>

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