  'use client';
  import { useState, useEffect, useRef } from "react";
  import { SelectField } from "./SelectField";
  import { ClassSelector } from "@/components/Tablecomponents/ClassSelector";
  import { ImageUploader } from "@/components/Tablecomponents/ImageUpload";
  import { Switch } from "@/components/Tablecomponents/Switch";
  import  SubjectSelector  from "@/components/Tablecomponents/SubjectSelector";
  interface FormFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (val: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalQueries?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData?: any;
    compact?: boolean;
    isEditing?: boolean;
    language?: 'en' | 'ar';
  }

  export const FormFieldComponent: React.FC<FormFieldProps> = ({
    field,
    value,
    onChange,
    additionalQueries,
    formData = {},
    compact = false,
    isEditing = false,
    language = 'en'
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // الترجمات
    const t = {
      // Labels
      optional: language === 'ar' ? '(اختياري)' : '(Optional)',
      selected: language === 'ar' ? 'تم التحديد:' : 'Selected:',
      selectOptions: language === 'ar' ? `اختر ${field?.label?.toLowerCase() || 'الخيارات'} بالنقر على الخيارات أعلاه` : `Select ${field?.label?.toLowerCase() || 'options'} by clicking on the options above`,
      
      // Placeholders
      leaveEmpty: language === 'ar' ? 'اتركه فارغاً للحفاظ على كلمة المرور الحالية' : 'Leave empty to keep current password',
      
      // Messages
      noFileSelected: language === 'ar' ? 'لم يتم اختيار ملف' : 'No file selected'
    };

    console.log('🔍 FormFieldComponent - field:', field);
    console.log('🔍 FormFieldComponent - value:', value);
    console.log('🔍 FormFieldComponent - isEditing:', isEditing);

    // ✅ معالجة حقل التحديد (select)
    if (field.type === "select") {
      return (
        <div className={`space-y-2 ${compact ? 'col-span-1' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <SelectField
            field={field}
            value={value}
            onChange={onChange}
            additionalQueries={additionalQueries}
          />
        </div>
      );
    }

    // ✅ معالجة class-selector
    if (field.type === "custom" && field.component === "class-selector") {
      console.log('🎯 CLASS SELECTOR FIELD TRIGGERED!', field);
      
      return (
        <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <ClassSelector
            value={value}
            onChange={onChange}
            additionalQueries={additionalQueries}
            label={field.label}
            required={field.required}
            multiple={field.multiple !== false}
          />
        </div>
      );
    }
  // ✅ معالجة subject-selector
  if (field.type === "custom" && field.component === "subject-selector") {
    console.log('🎯 SUBJECT SELECTOR FIELD TRIGGERED!', field);
    
    return (
      <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <SubjectSelector
          value={value}
          onChange={onChange}
          additionalQueries={additionalQueries}
          label={field.label}
          required={field.required}
          multiple={field.multiple !== false}
          compact={compact}
        />
      </div>
    );
  }

  // ✅ معالجة class-subject selector (للمواد بدلاً من الفصول)
  if (field.type === "custom" && field.component === "class-subject") {
    console.log('🎯 CLASS-SUBJECT FIELD TRIGGERED!', field);
    
    return (
      <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <SubjectSelector
          value={value}
          onChange={onChange}
          additionalQueries={additionalQueries}
          label={field.label}
          required={field.required}
          multiple={field.multiple !== false}
          compact={compact}
        />
      </div>
    );
  }
    
    // ✅ تحديد إذا كان حقل صورة
    const isImageField = (fieldName: string, fieldType: string): boolean => {
      const imageFieldNames = [
        'logo', 'image', 'avatar', 'photo', 'picture', 
        'profile_image', 'cover_image', 'banner', 'thumbnail'
      ];
      
      return fieldType === 'image' || imageFieldNames.some(name => 
        fieldName.toLowerCase().includes(name)
      );
    };

    // ✅ معالجة حقول الصور
    if (isImageField(field.name, field.type)) {
      console.log('🖼️ Image field detected:', field.name, 'Value:', value);
      
      return (
        <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <ImageUploader
            value={value}
            onChange={onChange}
            label={field.label}
            required={field.required}
            multiple={field.multiple}
            accept={field.accept || "image/png, image/jpg, image/jpeg, image/svg+xml"}
            compact={compact}
            isEditing={isEditing}
          />
        </div>
      );
    }

    // ✅ معالجة file input عادي (ليس صورة)
    if (field.type === "file") {
      const handleFileChange = (file: File | null) => {
        onChange(file);
        
        // Reset الـ input إذا كان null
        if (!file && fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

      return (
        <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          <input
            ref={fileInputRef}
            name={field.name}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] || null;
              handleFileChange(file);
            }}
            required={field.required}
            className="w-full p-3 rounded-xl dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept={field.accept}
          />
          
          {/* عرض اسم الملف إذا كان موجود */}
          {value && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ {t.selected} {value.name}
            </p>
          )}
        </div>
      );
    }

    // ✅ معالجة الـ checkbox group
    if (field.type === "custom" && field.component === "checkbox-group") {
      console.log('🎯 CHECKBOX GROUP FIELD TRIGGERED!', field);
      
      const selectedValues = Array.isArray(value) ? value : [];
      type OptionType = { value: string | number; label: string };

      return (
        <div className={`space-y-4 ${compact ? 'col-span-2' : 'col-span-1'}`}>
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {field.options?.map((option: OptionType) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <label 
                  key={option.value.toString()} 
                  className={`
                    relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md scale-105' 
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 hover:shadow-lg'
                    }
                    hover:scale-105 active:scale-95
                  `}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isSelected}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter((v: string | number) => v !== option.value);
                      onChange(newValues);
                    }}
                    className="sr-only"
                  />
                  
                  <div className={`
                    flex items-center justify-center w-6 h-6 rounded border-2 mr-4 transition-all duration-300
                    ${isSelected 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'bg-white dark:bg-gray-700 border-gray-400 group-hover:border-blue-500'
                    }
                  `}>
                    {isSelected && (
                      <svg 
                        className="w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    )}
                  </div>
                  
                  <span className={`
                    text-base font-medium transition-colors duration-300
                    ${isSelected 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600'
                    }
                  `}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          
          {selectedValues.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
              <i className="fas fa-mouse-pointer text-3xl text-gray-400 mb-3"></i>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {t.selectOptions}
              </p>
            </div>
          )}
        </div>
      );
    }

    // ✅ معالجة الـ Switch
    if (field.type === "switch") {
      return (
        <div className={`flex items-center justify-between ${compact ? 'col-span-1' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          <Switch checked={!!value} onChange={onChange} />
        </div>
      );
    }

    // ✅ textarea
    if (field.type === "textarea") {
      return (
        <div className={`space-y-2 ${compact ? 'col-span-2' : 'col-span-1'}`}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            name={field.name}
            value={value?.toString() || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            rows={field.rows || 4}
            className="w-full p-3 rounded-xl dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical"
            placeholder={field.placeholder}
          />
        </div>
      );
    }

    // ✅ باقي الحقول العادية مع تحسين الباسوورد
    return (
      <div className={`space-y-2 ${compact ? 'col-span-1' : 'col-span-1'}`}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && !(field.type === 'password' && isEditing) && (
            <span className="text-red-500 ml-1">*</span>
          )}
          {field.type === 'password' && isEditing && (
            <span className="text-xs text-blue-500 ml-1">{t.optional}</span>
          )}
        </label>
        
        <input
          name={field.name}
          type={field.type}
          placeholder={
            field.type === 'password' && isEditing 
              ? t.leaveEmpty
              : field.placeholder || field.label
          }
          value={value?.toString() || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required && !(field.type === 'password' && isEditing)}
          className="w-full p-3 rounded-xl dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min={field.type === 'number' ? field.min : undefined}
          max={field.type === 'number' ? field.max : undefined}
          step={field.type === 'number' ? field.step : undefined}
        />
      </div>
    );
  };

  export default FormFieldComponent;