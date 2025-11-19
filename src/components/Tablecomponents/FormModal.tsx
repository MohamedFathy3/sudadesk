// @/components/Tablecomponents/FormModal.tsx
"use client";

import { useState, useEffect } from "react";
import { FormFieldComponent } from "@/components/Tablecomponents/formmodelcommpoinnet";
import { Button } from "@/components/ui/button";

interface FormModalProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editingItem?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formFields?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalQueries?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormDataChange: (data: any) => void;
  onSave: (options: { keepOpen: boolean }) => void;
  onClose: () => void;
  saveLoading: boolean;
  compactLayout?: boolean;
  language?: 'en' | 'ar';
}

const FormModal: React.FC<FormModalProps> = ({
  title, 
  editingItem, 
  formFields = [],
  formData, 
  additionalQueries,
  onFormDataChange, 
  onSave, 
  onClose, 
  saveLoading,
  compactLayout = false,
  language = 'en'
}) => {
  // ✅ React Hooks في الأعلى
  const [activeTab, setActiveTab] = useState<string>('basic');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localFormData, setLocalFormData] = useState<Record<string, any>>({});

  // ✅ استخدام formFields آمن
  const safeFormFields = Array.isArray(formFields) ? formFields : [];

  // الترجمات
  const t = {
    // Titles
    edit: language === 'ar' ? 'تعديل' : 'Edit',
    add: language === 'ar' ? 'إضافة' : 'Add',
    updateItem: language === 'ar' ? 'تحديث بيانات العنصر' : 'Update the item details',
    fillDetails: language === 'ar' ? 'املأ البيانات أدناه' : 'Fill in the details below',
    passwordNote: language === 'ar' ? 'اترك حقل كلمة المرور فارغاً للحفاظ على الكلمة الحالية' : 'Leave password field empty to keep current password',
    
    // Tabs
    basic: language === 'ar' ? 'البيانات الأساسية' : 'Basic',
    selection: language === 'ar' ? 'خيارات' : 'Selection',
    settings: language === 'ar' ? 'الإعدادات' : 'Settings',
    media: language === 'ar' ? 'الوسائط' : 'Media',
    advanced: language === 'ar' ? 'متقدم' : 'Advanced',
    
    // Buttons
    save: language === 'ar' ? 'حفظ' : 'Save',
    update: language === 'ar' ? 'تحديث' : 'Update',
    create: language === 'ar' ? 'إنشاء' : 'Create',
    saving: language === 'ar' ? 'جاري الحفظ...' : 'Saving...',
    updateAndNew: language === 'ar' ? 'تحديث وإضافة جديد' : 'Update & New',
    createAndNew: language === 'ar' ? 'إنشاء وإضافة جديد' : 'Create & New',
    cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
    close: language === 'ar' ? 'إغلاق' : 'Close',
    
    // Messages
    noFormFields: language === 'ar' ? 'لا توجد حقول نموذج محددة' : 'No Form Fields Defined',
    noFieldsMessage: language === 'ar' ? `لا توجد حقول نموذج متاحة لـ ${title}. يرجى التحقق من الإعدادات.` : `No form fields are available for ${title}. Please check the configuration.`,
    noFieldsInSection: language === 'ar' ? 'لا توجد حقول في هذا القسم' : 'No fields in this section',
    switchTabMessage: language === 'ar' ? 'انتقل إلى تبويب آخر لرؤية الحقول المتاحة' : 'Switch to another tab to see available fields',
    noFormTabs: language === 'ar' ? 'لا توجد تبويبات نموذج متاحة' : 'No Form Tabs Available',
    noTabsMessage: language === 'ar' ? `لا توجد حقول نموذج مكونة لـ ${title}.` : `There are no form fields configured for ${title}.`
  };

  useEffect(() => {
    console.log('🎯 EDITING ITEM DATA:', editingItem);
    console.log('🎯 CURRENT FORM DATA:', formData);
    console.log('🎯 FORM FIELDS:', safeFormFields);
    
    if (editingItem) {
      const processedData = { ...editingItem };
      
      safeFormFields.forEach(field => {
        if (!field || !field.name) return;
        
        // 🔥 تجاهل كلمة المرور عند التعديل
        if (field.type === 'password' && editingItem.id) {
          processedData[field.name] = '';
          return;
        }
        
        // 🔥 معالجة بيانات الأب
        if (field.name === 'father_name' && editingItem.father?.name) {
          processedData.father_name = editingItem.father.name;
        }
        if (field.name === 'father_phone' && editingItem.father?.phone) {
          processedData.father_phone = editingItem.father.phone;
        }
        if (field.name === 'father_job' && editingItem.father?.job) {
          processedData.father_job = editingItem.father.job;
        }
        
        // 🔥 معالجة بيانات الأم
        if (field.name === 'mother_name' && editingItem.mother?.name) {
          processedData.mother_name = editingItem.mother.name;
        }
        if (field.name === 'mother_phone' && editingItem.mother?.phone) {
          processedData.mother_phone = editingItem.mother.phone;
        }
        if (field.name === 'mother_job' && editingItem.mother?.job) {
          processedData.mother_job = editingItem.mother.job;
        }
        
        // معالجة class-selector
        if (field.type === 'custom' && field.component === 'class-selector') {
          if (editingItem.class_ids) {
            processedData.class_ids = Array.isArray(editingItem.class_ids) 
              ? editingItem.class_ids 
              : [editingItem.class_ids];
          } else if (editingItem.classes) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            processedData.class_ids = editingItem.classes.map((cls: any) => cls.id);
          }
        }
        
        // 🔥 تحسين معالجة الصور
        if (['image', 'avatar', 'photo', 'logo'].includes(field.type) && editingItem[field.name]) {
          const imageValue = editingItem[field.name];
          if (typeof imageValue === 'string') {
            processedData[field.name] = imageValue;
          } else if (typeof imageValue === 'object' && imageValue.url) {
            processedData[field.name] = imageValue.url;
          } else {
            processedData[field.name] = imageValue;
          }
        }
      });
      
      console.log('🎯 PROCESSED FORM DATA:', processedData);
      setLocalFormData(processedData);
    } else {
      setLocalFormData({});
    }
  }, [editingItem, safeFormFields]);

  // ✅ تحديث formData الرئيسي
  useEffect(() => {
    if (Object.keys(localFormData).length > 0) {
      onFormDataChange(localFormData);
    }
  }, [localFormData, onFormDataChange]);

  // ✅ تقسيم الحقول ديناميكي للتابات
  const getTabsData = () => {
    if (!Array.isArray(safeFormFields) || safeFormFields.length === 0) {
      return [];
    }

    const basicFields = safeFormFields.filter(field => 
      field && ['text', 'email', 'password', 'tel', 'url', 'number','switch'].includes(field.type)
    );
    
    const selectionFields = safeFormFields.filter(field => 
      field && ['select', 'custom'].includes(field.type)
    );
    
    const settingsFields = safeFormFields.filter(field => 
      field && ['checkbox'].includes(field.type)
    );
    
    const mediaFields = safeFormFields.filter(field => 
      field && ['image', 'file'].includes(field.type)
    );
    
    const advancedFields = safeFormFields.filter(field => 
      field && ['textarea', 'date', 'datetime-local', 'time'].includes(field.type)
    );

    const tabs = [
      { id: 'basic', label: t.basic, fields: basicFields, icon: 'fa-file-alt' },
      { id: 'selection', label: t.selection, fields: selectionFields, icon: 'fa-list' },
      { id: 'settings', label: t.settings, fields: settingsFields, icon: 'fa-cog' },
      { id: 'media', label: t.media, fields: mediaFields, icon: 'fa-image' },
      { id: 'advanced', label: t.advanced, fields: advancedFields, icon: 'fa-tools' },
    ];

    return tabs.filter(tab => tab.fields && tab.fields.length > 0);
  };

  const tabs = getTabsData();
  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0] || { id: 'basic', fields: [] };
  const modalSize = 'w-full max-w-4xl';

  // ✅ دالة محلية لتحديث البيانات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLocalFormDataChange = (fieldName: string, value: any) => {
    setLocalFormData(prev => {
      const newData = { ...prev, [fieldName]: value };
      onFormDataChange(newData);
      return newData;
    });
  };

  // 🔥 عرض رسالة إذا لم توجد حقول
  if (!Array.isArray(safeFormFields) || safeFormFields.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-6 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-xl font-bold z-10"
          >
            ✖
          </button>
          
          <div className="text-center py-8">
            <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t.noFormFields}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t.noFieldsMessage}
            </p>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button
              type="button"
              style={{background:"#fee4e4",color:'black'}}
              className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-200 transition-all rounded-xl border-none py-3 px-6 text-base font-medium"
              onClick={onClose}
            >
              {t.close}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
      <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ${modalSize} p-6 relative max-h-[80vh] overflow-auto`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-xl font-bold z-10"
        >
          ✖
        </button>
        
        {/* الهيدر */}
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {editingItem ? `${t.edit} ${title}` : `${t.add} ${title}`}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {editingItem ? t.updateItem : t.fillDetails}
          </p>
          {/* 🔥 إضافة ملاحظة للباسوورد */}
          {editingItem && safeFormFields.some(f => f && f.type === 'password') && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              💡 {t.passwordNote}
            </p>
          )}
        </div>

        {/* ✅ التابات */}
        {tabs.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl rtl:space-x-reverse">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-1 text-center justify-center
                      ${activeTab === tab.id 
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <i className={`fas ${tab.icon} text-xs`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              onSave({ keepOpen: false });
            }}>
              <div className="min-h-[400px] max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                <div className={`grid gap-6 ${compactLayout ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {currentTab?.fields?.map((field) => (
                    field && (
                      <FormFieldComponent
                        key={field.name}
                        field={field}
                        value={localFormData[field.name] || ""}
                        onChange={(value: unknown) => handleLocalFormDataChange(field.name, value)}
                        additionalQueries={additionalQueries}
                        formData={localFormData}
                        compact={compactLayout}
                        isEditing={!!editingItem}
                        language={language}
                      />
                    )
                  ))}
                </div>

                {(!currentTab?.fields || currentTab.fields.length === 0) && (
                  <div className="text-center py-16">
                    <i className="fas fa-inbox text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      {t.noFieldsInSection}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      {t.switchTabMessage}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700 rtl:space-x-reverse">
                <Button
                  style={{color:'black'}}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-50 to-green-100 text-black hover:bg-green-200 transition-all rounded-xl py-3 text-base font-medium"
                  disabled={saveLoading}
                >
                  {saveLoading ? t.saving : (editingItem ? t.update : t.create)}
                </Button>

                <Button
                  style={{color:'black'}}
                  type="button"
                  className="flex-1 bg-gradient-to-r from-green-50 to-green-100 text-black hover:bg-green-200 transition-all rounded-xl py-3 text-base font-medium"
                  disabled={saveLoading}
                  onClick={() => {
                    onSave({ keepOpen: true });
                  }}
                >
                  {saveLoading ? t.saving : (editingItem ? t.updateAndNew : t.createAndNew)}
                </Button>

                <Button
                  type="button"
                  style={{background:"#fee4e4",color:'black'}}
                  className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-200 transition-all rounded-xl border-none py-3 text-base font-medium"
                  onClick={onClose}
                  disabled={saveLoading}
                >
                  {t.cancel}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t.noFormTabs}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t.noTabsMessage}
            </p>
            <div className="flex justify-center pt-6">
              <Button
                type="button"
                style={{background:"#fee4e4",color:'black'}}
                className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-200 transition-all rounded-xl border-none py-3 px-6 text-base font-medium"
                onClick={onClose}
              >
                {t.close}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;