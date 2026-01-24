// SubjectSelector.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, Search, X, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface Subject {
  id: number | string;
  name: string;
  code?: string;
  description?: string;
  level?: string;
}

interface SubjectSelectorProps {
  value: number[] | string[];
  onChange: (value: number[] | string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalQueries?: Record<string, any>;
  label?: string;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  compact?: boolean;
  optionsKey?: string;
}

export default function SubjectSelector({
  value,
  onChange,
  additionalQueries = {},
  label = '',
  required = false,
  multiple = true,
  placeholder = '',
  disabled = false,
  compact = false,
  optionsKey = 'subjectsLists'
}: SubjectSelectorProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // الترجمات
  const t = {
    searchSubjects: language === 'ar' ? 'ابحث عن المواد...' : 'Search subjects...',
    selectSubjects: language === 'ar' ? 'اختر المواد' : 'Select subjects',
    noSubjects: language === 'ar' ? 'لا توجد مواد متاحة' : 'No subjects available',
    loading: language === 'ar' ? 'جاري التحميل...' : 'Loading...',
    selected: language === 'ar' ? 'المحددة: ' : 'Selected: ',
    all: language === 'ar' ? 'الكل' : 'All',
    clearAll: language === 'ar' ? 'مسح الكل' : 'Clear all',
    select: language === 'ar' ? 'تحديد' : 'Select',
    deselect: language === 'ar' ? 'إلغاء التحديد' : 'Deselect',
    subjectCode: language === 'ar' ? 'كود المادة' : 'Subject Code',
    subjectName: language === 'ar' ? 'اسم المادة' : 'Subject Name',
    noResults: language === 'ar' ? 'لا توجد نتائج' : 'No results found'
  };

  // 🔥 DEBUG: console.log للمعطيات الواردة
  console.log('🔍 SubjectSelector Props:', {
    label,
    value,
    valueType: typeof value,
    valueIsArray: Array.isArray(value),
    valueLength: Array.isArray(value) ? value.length : 'N/A',
    optionsKey,
    additionalQueriesKeys: Object.keys(additionalQueries)
  });

  // جلب المواد - أولوية للبيانات من additionalQueries
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);
        
        console.log('📥 Trying to load subjects from additionalQueries...');
        console.log('🔍 Key to look for:', optionsKey);
        console.log('📦 additionalQueries object:', additionalQueries);

        // المحاولة الأولى: استخدام البيانات من additionalQueries
        if (additionalQueries && additionalQueries[optionsKey]) {
          console.log('✅ Found data in additionalQueries for key:', optionsKey);
          
          const queryData = additionalQueries[optionsKey];
          console.log('📊 Query data structure:', queryData);
          console.log('🔍 Query data type:', typeof queryData);
          
          // 🔥 فحص عميق لهيكل البيانات
          if (queryData) {
            console.log('📋 Query data properties:', Object.keys(queryData));
            if (queryData.data) {
              console.log('📋 Query data.data properties:', 
                typeof queryData.data === 'object' ? Object.keys(queryData.data) : 'Not an object'
              );
            }
          }
          
          // معالجة بنية البيانات المختلفة
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let subjectsData: any[] = [];
          
          // الحالة الأكثر شيوعاً: queryData يحتوي على data.data
          if (queryData.data && queryData.data.data && Array.isArray(queryData.data.data)) {
            subjectsData = queryData.data.data;
            console.log('🎯 Found data in queryData.data.data array, count:', subjectsData.length);
          }
          // الحالة: queryData.data هو المصفوفة مباشرة
          else if (Array.isArray(queryData.data)) {
            subjectsData = queryData.data;
            console.log('🎯 Found data in queryData.data array, count:', subjectsData.length);
          }
          // الحالة: queryData نفسه هو المصفوفة
          else if (Array.isArray(queryData)) {
            subjectsData = queryData;
            console.log('🎯 Found data in queryData array, count:', subjectsData.length);
          }
          
          console.log('📚 Extracted subjects data:', subjectsData);
          
          if (subjectsData.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formattedSubjects = subjectsData.map((subject: any) => ({
              id: subject.id,
              name: subject.name || subject.subject_name || `Subject ${subject.id}`,
              code: subject.code || subject.course_code || '',
              description: subject.description || '',
              level: subject.level || subject.grade_level || ''
            }));
            console.log('✅ Formatted subjects:', formattedSubjects);
            console.log('✅ First subject sample:', formattedSubjects[0]);
            setSubjects(formattedSubjects);
            return;
          } else {
            console.warn('⚠️ No subjects data found in extracted array');
          }
        } else {
          console.log('❌ No data found in additionalQueries for key:', optionsKey);
        }

        // المحاولة الثانية: إذا لم توجد بيانات، جلب من API مباشر
        console.log('🔄 No data in additionalQueries, fetching directly from API');
        await fetchSubjectsFromAPI();
        
      } catch (error) {
        console.error('❌ Error loading subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [additionalQueries, optionsKey, user?.school_id]);

  // جلب المواد من API مباشرة
  const fetchSubjectsFromAPI = async () => {
    try {
      const queryObj: Record<string, string> = {
        school_id: user?.school_id ? String(user.school_id) : '',
        active: 'true',
        page: '1',
        limit: '100'
      };

      const queryParams = new URLSearchParams(queryObj);
      console.log('🌐 Fetching subjects from API:', `/api/course?${queryParams}`);
      
      const response = await fetch(`/api/course?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 Direct API Response:', data);
        
        // معالجة بنية الرد المختلفة
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let subjectsData: any[] = [];
        
        if (data.data) {
          if (Array.isArray(data.data)) {
            subjectsData = data.data;
            console.log('✅ Using data.data array from API');
          } else if (data.data.data && Array.isArray(data.data.data)) {
            subjectsData = data.data.data;
            console.log('✅ Using data.data.data array from API');
          }
        } else if (Array.isArray(data)) {
          subjectsData = data;
          console.log('✅ Using direct array from API');
        }
        
        console.log('📊 Extracted subjects from API:', subjectsData.length);
        
        if (subjectsData.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedSubjects = subjectsData.map((subject: any) => ({
            id: subject.id,
            name: subject.name || subject.subject_name || `Subject ${subject.id}`,
            code: subject.code || subject.course_code || '',
            description: subject.description || '',
            level: subject.level || subject.grade_level || ''
          }));
          console.log('✅ Formatted subjects from API (first 3):', formattedSubjects.slice(0, 3));
          setSubjects(formattedSubjects);
        } else {
          console.warn('⚠️ No subjects data found in API response');
        }
      } else {
        console.error('❌ API response not OK:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching from API:', error);
    }
  };

  // 🔥 تحديث المواد المختارة عند تغيير القيمة أو المواد المتاحة
  useEffect(() => {
    console.log('🔄 تحديث المواد المختارة - القيمة الواردة:', {
      value,
      valueType: typeof value,
      isArray: Array.isArray(value),
      stringValue: String(value)
    });
    
    // 🔥 الحل: معالجة جميع أنواع القيم
    let processedValue: (number | string)[] = [];
    
    if (Array.isArray(value)) {
      // إذا كانت مصفوفة بالفعل
      processedValue = value;
    } else if (value !== undefined && value !== null && value !== '') {
      // إذا كانت قيمة مفردة
      if (
        typeof value === 'string' &&
        value &&
        typeof (value as string).trim === 'function' &&
        (value as string).trim().startsWith('[') &&
        (value as string).trim().endsWith(']')
      ) {
        // إذا كانت JSON string
        try {
          processedValue = JSON.parse(value);
        } catch (e) {
          console.warn('⚠️ لا يمكن تحليل القيمة كـ JSON:', value);
          processedValue = [value];
        }
      } else {
        // إذا كانت قيمة عادية
        processedValue = [value];
      }
    }
    
    console.log('✅ القيمة المعالجة:', processedValue);
    console.log('✅ عدد المواد المتاحة:', subjects.length);
    
    if (processedValue.length > 0 && subjects.length > 0) {
      // تحويل جميع IDs إلى strings للمقارنة
      const valueIds = processedValue.map(v => String(v));
      console.log('🔢 الـ IDs كـ strings:', valueIds);
      
      const selected = subjects.filter(subject => 
        valueIds.includes(String(subject.id))
      );
      
      console.log('✅ المواد المختارة التي تم العثور عليها:', selected);
      setSelectedSubjects(selected);
    } else {
      console.log('ℹ️ لا توجد مواد مختارة أو مواد متاحة');
      setSelectedSubjects([]);
    }
  }, [value, subjects]);

  const handleSelectSubject = (subject: Subject) => {
    if (disabled) return;

    console.log('🎯 Selecting subject:', subject);
    
    let newValue: (number | string)[];
    
    if (multiple) {
      const isSelected = selectedSubjects.some(s => s.id === subject.id);
      console.log('📌 Is currently selected?', isSelected);
      
      if (isSelected) {
        // إزالة المادة
        const newSelected = selectedSubjects.filter(s => s.id !== subject.id);
        setSelectedSubjects(newSelected);
        newValue = newSelected.map(s => s.id);
      } else {
        // إضافة المادة
        const newSelected = [...selectedSubjects, subject];
        setSelectedSubjects(newSelected);
        newValue = newSelected.map(s => s.id);
      }
    } else {
      // اختيار واحد فقط
      const newSelected = [subject];
      setSelectedSubjects(newSelected);
      newValue = [subject.id];
      setIsOpen(false);
    }
    
    console.log('📤 New value to send:', newValue);
    
    // Ensure newValue is strictly type string[] or number[]
    if (typeof newValue?.[0] === 'string') {
      onChange(newValue as string[]);
    } else if (typeof newValue?.[0] === 'number') {
      onChange(newValue as number[]);
    } else {
      onChange([]);
    }
  };

  const handleClearAll = () => {
    console.log('🧹 Clearing all selected subjects');
    setSelectedSubjects([]);
    onChange([]);
  };

  const filteredSubjects = subjects.filter(subject => {
    const searchLower = searchTerm.toLowerCase();
    return (
      subject.name.toLowerCase().includes(searchLower) ||
      (subject.code && subject.code.toLowerCase().includes(searchLower)) ||
      (subject.level && subject.level.toLowerCase().includes(searchLower))
    );
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔥 Debug render
  console.log('🎨 SubjectSelector rendering:', {
    subjectsCount: subjects.length,
    selectedSubjectsCount: selectedSubjects.length,
    selectedSubjects: selectedSubjects.map(s => ({ id: s.id, name: s.name })),
    isOpen,
    loading
  });

  return (
    <div className={`space-y-2 ${compact ? 'col-span-1' : 'col-span-1'}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* زر الفتح/الإغلاق */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between p-3 
            border rounded-xl text-left transition-all duration-200
            ${disabled 
              ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-not-allowed' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer'
            }
            ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
          `}
        >
          <div className="flex flex-wrap items-center gap-2">
            {selectedSubjects.length > 0 ? (
              selectedSubjects.map(subject => (
                <span
                  key={subject.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                >
                  <BookOpen size={14} />
                  {subject.name}
                  {subject.code && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({subject.code})
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                {placeholder || t.selectSubjects}
              </span>
            )}
          </div>
          <ChevronDown 
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            size={20}
          />
        </button>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-96 overflow-y-auto">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchSubjects}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  const allIds = filteredSubjects.map(s => s.id);
                  if (multiple) {
                    setSelectedSubjects(filteredSubjects);
                    // Ensure allIds is either number[] or string[]
                    if (typeof allIds[0] === "number" || allIds.length === 0) {
                      onChange(allIds as number[]);
                    } else {
                      onChange(allIds as string[]);
                    }
                  } else if (filteredSubjects.length > 0) {
                    handleSelectSubject(filteredSubjects[0]);
                  }
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {t.all}
              </button>
              
              {selectedSubjects.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  {t.clearAll}
                </button>
              )}
            </div>

            {/* Subjects List */}
            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  {t.loading}
                </div>
              ) : filteredSubjects.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <BookOpen className="mx-auto mb-2" size={32} />
                  {subjects.length === 0 ? t.noSubjects : t.noResults}
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredSubjects.map(subject => {
                    const isSelected = selectedSubjects.some(s => s.id === subject.id);
                    console.log('📌 Subject in list:', { id: subject.id, name: subject.name, isSelected });
                    
                    return (
                      <div
                        key={subject.id}
                        onClick={() => handleSelectSubject(subject)}
                        className={`
                          flex items-center justify-between p-3 cursor-pointer transition-colors
                          ${isSelected 
                            ? 'bg-blue-50 dark:bg-blue-900/20' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            flex items-center justify-center w-5 h-5 rounded border
                            ${isSelected 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'border-gray-300 dark:border-gray-600'
                            }
                          `}>
                            {isSelected && <Check size={12} className="text-white" />}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <BookOpen size={16} className="text-gray-500 dark:text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {subject.name}
                              </span>
                              {subject.code && (
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
                                  {subject.code}
                                </span>
                              )}
                            </div>
                            
                            {subject.level && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {subject.level}
                              </p>
                            )}
                            
                            {subject.description && (
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                                {subject.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {isSelected ? t.deselect : t.select}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Selected Count */}
        {selectedSubjects.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.selected} 
              <span className="font-semibold text-blue-600 dark:text-blue-400 ml-1">
                {selectedSubjects.length}
              </span>
              {' '}{language === 'ar' ? 'مادة' : 'subject(s)'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}