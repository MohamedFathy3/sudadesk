'use client';

import { useState, FormEvent } from 'react';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Shield,
  Key,
  AlertCircle,
  Languages
} from 'lucide-react';

export default function UpdatePasswordPage() {
  const { language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  
  // شروط كلمة المرور
  const passwordRequirements = [
    { 
      id: 'length', 
      ar: '8 أحرف على الأقل', 
      en: 'At least 8 characters',
      regex: /.{8,}/ 
    },
    { 
      id: 'uppercase', 
      ar: 'حرف كبير واحد على الأقل (A-Z)', 
      en: 'At least one uppercase letter (A-Z)',
      regex: /[A-Z]/ 
    },
    { 
      id: 'lowercase', 
      ar: 'حرف صغير واحد على الأقل (a-z)', 
      en: 'At least one lowercase letter (a-z)',
      regex: /[a-z]/ 
    },
    { 
      id: 'number', 
      ar: 'رقم واحد على الأقل (0-9)', 
      en: 'At least one number (0-9)',
      regex: /[0-9]/ 
    },
    { 
      id: 'special', 
      ar: 'رمز خاص واحد على الأقل (!@#$%^&*)', 
      en: 'At least one special character (!@#$%^&*)',
      regex: /[!@#$%^&*]/ 
    }
  ];
  
  // الترجمات - نفس الأسلوب المستخدم في صفحة الفصول
  const translations = {
    en: {
      title: 'Change Password',
      subtitle: 'Update Password',
      description: 'Update your password to secure your account',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      newPasswordPlaceholder: 'Enter new password',
      confirmPasswordPlaceholder: 'Confirm new password',
      submitButton: 'Update Password',
      showPassword: 'Show',
      hidePassword: 'Hide',
      successTitle: 'Success!',
      successMessage: 'Password updated successfully. You will be logged out and need to login again.',
      passwordRequired: 'New password is required',
      confirmPasswordRequired: 'Password confirmation is required',
      passwordsNotMatch: 'Passwords do not match',
      passwordRequirements: 'Password does not meet all requirements',
      passwordRequirementsTitle: 'Password Requirements',
      passwordGuide: 'New password must contain:',
      allRequirementsMet: 'All requirements met ✓',
      securityTips: 'Security Tips',
      tip1: 'Use a strong and unique password for your account',
      tip2: 'Avoid using personal information in your password',
      tip3: 'Change your password every 3 months',
      tip4: 'Do not use the same password for multiple accounts',
      updating: 'Updating...',
      apiError: 'Error updating password',
      connectionError: 'Connection error',
      importantNote: 'Important Note',
      noteContent: 'After changing password, you will be logged out from all devices. You need to login again.',
      systemSecure: 'System Secure',
      encryptedConnections: 'All connections are encrypted',
      dataProtected: 'Your data is protected with first-class encryption',
      securityInfo: 'Security Information',
      info1: 'All passwords are encrypted using latest technology',
      info2: 'No one can see your password',
      info3: 'You will be logged out from all devices after change',
      languageSwitch: 'العربية'
    },
    ar: {
      title: 'تغيير كلمة المرور',
      subtitle: 'تحديث كلمة المرور',
      description: 'قم بتحديث كلمة المرور الخاصة بك لتأمين حسابك',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      newPasswordPlaceholder: 'أدخل كلمة المرور الجديدة',
      confirmPasswordPlaceholder: 'أكد كلمة المرور الجديدة',
      submitButton: 'تحديث كلمة المرور',
      showPassword: 'إظهار',
      hidePassword: 'إخفاء',
      successTitle: 'تم بنجاح!',
      successMessage: 'تم تحديث كلمة المرور بنجاح. سيتم تسجيل خروجك ويجب تسجيل الدخول مرة أخرى.',
      passwordRequired: 'كلمة المرور الجديدة مطلوبة',
      confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',
      passwordRequirements: 'كلمة المرور لا تلبي جميع الشروط',
      passwordRequirementsTitle: 'شروط كلمة المرور',
      passwordGuide: 'يجب أن تحتوي كلمة المرور الجديدة على:',
      allRequirementsMet: 'جميع الشروط مستوفاة ✓',
      securityTips: 'نصائح أمنية',
      tip1: 'استخدم كلمة مرور قوية وفريدة لحسابك',
      tip2: 'تجنب استخدام معلومات شخصية في كلمة المرور',
      tip3: 'غير كلمة المرور الخاصة بك كل 3 شهور',
      tip4: 'لا تستخدم نفس كلمة المرور لحسابات متعددة',
      updating: 'جاري التحديث...',
      apiError: 'حدث خطأ أثناء تحديث كلمة المرور',
      connectionError: 'خطأ في الاتصال',
      importantNote: 'ملاحظة هامة',
      noteContent: 'بعد تغيير كلمة المرور، سيتم تسجيل خروجك من جميع الأجهزة. يجب تسجيل الدخول مرة أخرى.',
      systemSecure: 'النظام آمن',
      encryptedConnections: 'جميع الاتصالات مشفرة',
      dataProtected: 'بياناتك محمية بتشفير من الدرجة الأولى',
      securityInfo: 'معلومات حول الأمان',
      info1: 'جميع كلمات المرور مشفرة بأحدث التقنيات',
      info2: 'لا يمكن لأي شخص رؤية كلمة المرور الخاصة بك',
      info3: 'سيتم تسجيل خروجك من جميع الأجهزة بعد التغيير',
      languageSwitch: 'English'
    }
  };

  const t = translations[language];
  
  // التحقق من شروط كلمة المرور
  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map(req => ({
      ...req,
      met: req.regex.test(password),
      text: language === 'ar' ? req.ar : req.en
    }));
  };
  
  const requirements = checkPasswordRequirements(formData.password);
  const allRequirementsMet = requirements.every(req => req.met);
  
  // تغيير اللغة
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  // تغيير الحقول
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      setFormData({ password: value });
      
      // التحقق من تطابق كلمة المرور
      if (confirmPassword && value !== confirmPassword) {
        setPasswordMatchError(t.passwordsNotMatch);
      } else {
        setPasswordMatchError(null);
      }
      
      // مسح أخطاء التحقق عند الكتابة
      if (validationErrors.password) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.password;
          return newErrors;
        });
      }
    }
    
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      
      // التحقق من تطابق كلمة المرور
      if (formData.password && value !== formData.password) {
        setPasswordMatchError(t.passwordsNotMatch);
      } else {
        setPasswordMatchError(null);
      }
      
      // مسح أخطاء التحقق عند الكتابة
      if (validationErrors.confirmPassword) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
    
    if (error) setError(null);
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.password.trim()) {
      errors.password = t.passwordRequired;
    } else if (!allRequirementsMet) {
      errors.password = t.passwordRequirements;
    }
    
    if (!confirmPassword.trim()) {
      errors.confirmPassword = t.confirmPasswordRequired;
    } else if (formData.password !== confirmPassword) {
      errors.confirmPassword = t.passwordsNotMatch;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // إرسال الطلب بالبيانات الصحيحة
      const response = await apiFetch('/user/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password
        }),
      });

      console.log('API Response:', response);
      
      if (response.success || response.status || response.result === 'Success') {
        setSuccess(true);
        setFormData({ password: '' });
        setConfirmPassword('');
        
        // إخفاء رسالة النجاح وإعادة التوجيه
        setTimeout(() => {
          setSuccess(false);
          
          // توجيه المستخدم لتسجيل الدخول مرة أخرى
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth';
            }
          }, 2000);
        }, 5000);
      } else {
        const errorMessage = response.message || t.apiError;
        setError(errorMessage);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Update password error:', err);
      setError(err.message || t.connectionError);
    } finally {
      setLoading(false);
    }
  };

  // تحديد اتجاه الصفحة بناءً على اللغة
  const isRTL = language === 'ar';
  
  return (
    <MainLayout>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* رأس الصفحة */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {t.title}
                    </h1>
                    <p className="text-gray-600">
                      {t.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* زر تغيير اللغة */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <Languages className="w-5 h-5" />
                <span>{t.languageSwitch}</span>
              </button>
            </div>
            
            {/* تنبيه مهم */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">{t.importantNote}</h4>
                  <p className="text-yellow-700 text-sm mt-1">{t.noteContent}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* محتوى الصفحة */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* النموذج */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-blue-100">
                  {t.subtitle}
                </h2>
                
                {/* رسالة النجاح */}
                {success && (
                  <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">{t.successTitle}</h3>
                        <p className="text-green-600 text-sm">{t.successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* رسالة الخطأ */}
                {error && (
                  <div className="mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-800">{t.connectionError}</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* كلمة المرور الجديدة */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.newPassword}
                      </label>
                      <div className="relative">
                        <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                          <Lock className="w-5 h-5" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border ${
                            validationErrors.password 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-blue-200 focus:ring-blue-500 focus:border-blue-500'
                          } rounded-xl focus:ring-2 focus:border-transparent`}
                          placeholder={t.newPasswordPlaceholder}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {validationErrors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.password}
                        </p>
                      )}
                    </div>
                    
                    {/* تأكيد كلمة المرور الجديدة */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.confirmPassword}
                      </label>
                      <div className="relative">
                        <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                          <Key className="w-5 h-5" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          className={`w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border ${
                            validationErrors.confirmPassword || passwordMatchError
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-blue-200 focus:ring-blue-500 focus:border-blue-500'
                          } rounded-xl focus:ring-2 focus:border-transparent`}
                          placeholder={t.confirmPasswordPlaceholder}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {(validationErrors.confirmPassword || passwordMatchError) && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.confirmPassword || passwordMatchError}
                        </p>
                      )}
                    </div>
                    
                    {/* شروط كلمة المرور */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        {t.passwordRequirementsTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{t.passwordGuide}</p>
                      <div className="space-y-2">
                        {requirements.map((req) => (
                          <div 
                            key={req.id} 
                            className="flex items-center gap-2 text-sm"
                          >
                            {req.met ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className={req.met ? 'text-green-600' : 'text-gray-600'}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      {allRequirementsMet && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-green-600 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            {t.allRequirementsMet}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* زر التحديث */}
                    <button
                      type="submit"
                      disabled={loading || !allRequirementsMet || !confirmPassword || !!passwordMatchError}
                      className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                        loading || !allRequirementsMet || !confirmPassword || !!passwordMatchError
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.updating}
                        </div>
                      ) : (
                        t.submitButton
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* معلومات ونصائح */}
            <div className="space-y-6">
              {/* نصائح أمنية */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  {t.securityTips}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <p className="text-sm text-gray-600">{t.tip1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <p className="text-sm text-gray-600">{t.tip2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <p className="text-sm text-gray-600">{t.tip3}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">4</span>
                    </div>
                    <p className="text-sm text-gray-600">{t.tip4}</p>
                  </div>
                </div>
              </div>
              
              {/* معلومات حول الأمان */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t.securityInfo}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>{t.info1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>{t.info2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>{t.info3}</span>
                  </li>
                </ul>
              </div>
              
              {/* حالة النظام */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t.systemSecure}
                    </h4>
                    <p className="text-sm text-green-600">
                      {t.encryptedConnections}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {t.dataProtected}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}