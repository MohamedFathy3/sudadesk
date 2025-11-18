// app/exams/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { apiFetch } from '@/lib/api';
import { 
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  BookOpen,
  FileText,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  GraduationCap
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from 'react-hot-toast';

interface Question {
  question: string;
  answer: string;
}

interface ExamData {
  exam_name: string;
  class_id: number;
  course_id: number;
  total_mark: number;
  questions: Question[];
}

interface Class {
  id: number;
  name: string;
  count: string;
  school_id: number;
  school_name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  name: string;
  active: boolean;
  school_id: number;
}

export default function AddExam() {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [formData, setFormData] = useState<ExamData>({
    exam_name: '',
    class_id: 0,
    course_id: 0,
    total_mark: 100,
    questions: [
      { question: '', answer: '' }
    ]
  });

  const t = {
    // العناوين الرئيسية
    create_new_exam: language === 'ar' ? 'إنشاء امتحان جديد' : 'Create New Exam',
    design_exam: language === 'ar' ? 'صمم امتحانك بالأسئلة والإجابات' : 'Design your exam with questions and answers',
    back_to_exams: language === 'ar' ? 'العودة إلى الامتحانات' : 'Back to Exams',
    loading: language === 'ar' ? 'جاري التحميل...' : 'Loading...',
    
    exam_information: language === 'ar' ? 'معلومات الامتحان' : 'Exam Information',
    basic_details: language === 'ar' ? 'التفاصيل الأساسية عن الامتحان' : 'Basic details about your exam',
    exam_name: language === 'ar' ? 'اسم الامتحان *' : 'Exam Name *',
    exam_name_placeholder: language === 'ar' ? 'مثال: امتحان منتصف الفصل للعلوم، الامتحان النهائي للرياضيات' : 'e.g., Science Midterm, Math Final Exam',
    total_mark: language === 'ar' ? 'الدرجة الكلية *' : 'Total Mark *',
    select_class: language === 'ar' ? 'اختر الفصل *' : 'Select Class *',
    select_course: language === 'ar' ? 'اختر المادة *' : 'Select Course *',
    selected: language === 'ar' ? 'المحدد:' : 'Selected:',
    students: language === 'ar' ? 'طالب' : 'students',
    course: language === 'ar' ? 'المادة' : 'Course',
    
    // الأسئلة
    exam_questions: language === 'ar' ? 'أسئلة الامتحان' : 'Exam Questions',
    add_questions_answers: language === 'ar' ? 'أضف الأسئلة وإجاباتها الصحيحة' : 'Add questions and their correct answers',
    questions: language === 'ar' ? 'أسئلة' : 'questions',
    question: language === 'ar' ? 'سؤال' : 'Question',
    question_text: language === 'ar' ? 'نص السؤال *' : 'Question Text *',
    question_placeholder: language === 'ar' ? 'أدخل السؤال هنا... (مثال: ما هي عاصمة فرنسا؟)' : 'Enter the question here... (e.g., What is the capital of France?)',
    correct_answer: language === 'ar' ? 'الإجابة الصحيحة *' : 'Correct Answer *',
    answer_placeholder: language === 'ar' ? 'أدخل الإجابة الصحيحة... (مثال: باريس)' : 'Enter the correct answer... (e.g., Paris)',
    add_another_question: language === 'ar' ? 'إضافة سؤال آخر' : 'Add Another Question',
    
    // الملخص والإحصائيات
    exam_summary: language === 'ar' ? 'ملخص الامتحان' : 'Exam Summary',
    ready_to_create: language === 'ar' ? 'جاهز لإنشاء الامتحان!' : 'Ready to create exam!',
    add_questions_to_continue: language === 'ar' ? 'أضف أسئلة للمتابعة' : 'Add questions to continue',
    quick_stats: language === 'ar' ? 'إحصائيات سريعة' : 'Quick Stats',
    total_marks: language === 'ar' ? 'الدرجات الكلية' : 'Total Marks',
    classes: language === 'ar' ? 'الفصول' : 'Classes',
    courses_count: language === 'ar' ? 'المواد' : 'Courses',
    not_selected: language === 'ar' ? 'غير محدد' : 'Not selected',
    
    // الأزرار والإجراءات
    create_exam: language === 'ar' ? 'إنشاء الامتحان' : 'Create Exam',
    creating_exam: language === 'ar' ? 'جاري إنشاء الامتحان...' : 'Creating Exam...',
    cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
    
    // رسائل التحقق
    enter_exam_name: language === 'ar' ? 'يرجى إدخال اسم الامتحان' : 'Please enter exam name',
    select_class_first: language === 'ar' ? 'يرجى اختيار فصل' : 'Please select a class',
    select_course_first: language === 'ar' ? 'يرجى اختيار مادة' : 'Please select a course',
    mark_greater_than_zero: language === 'ar' ? 'يجب أن تكون الدرجة الكلية أكبر من صفر' : 'Total mark must be greater than 0',
    add_at_least_one_question: language === 'ar' ? 'يرجى إضافة سؤال واحد على الأقل' : 'Please add at least one question',
    exam_added_success: language === 'ar' ? 'تم إضافة الامتحان بنجاح!' : 'Exam added successfully!',
    error_adding_exam: language === 'ar' ? 'خطأ في إضافة الامتحان. يرجى المحاولة مرة أخرى.' : 'Error adding exam. Please try again.',
    
    // حالات التحميل
    loading_classes: language === 'ar' ? 'جاري تحميل الفصول...' : 'Loading classes...',
    no_classes_available: language === 'ar' ? 'لا توجد فصول متاحة' : 'No classes available',
    loading_courses: language === 'ar' ? 'جاري تحميل المواد...' : 'Loading courses...',
    no_courses_available: language === 'ar' ? 'لا توجد مواد متاحة' : 'No courses available',
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setClassesLoading(true);
        const data = await apiFetch('/classe/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
        if (data && data.data) {
          setClasses(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, class_id: data.data[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
        toast.error(language === 'ar' ? 'خطأ في تحميل الفصول' : 'Error loading classes');
      } finally {
        setClassesLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        const data = await apiFetch('/course/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (data && data.data) {
          setCourses(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, course_id: data.data[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error(language === 'ar' ? 'خطأ في تحميل المواد' : 'Error loading courses');
      } finally {
        setCoursesLoading(false);
      }
    };

    if (user) {
      fetchClasses();
      fetchCourses();
    }
  }, [user, language]);

  if (authLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-muted-foreground">{t.loading}</p>
      </div>
    );
  }

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', answer: '' }]
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.exam_name.trim()) {
      toast.error(t.enter_exam_name);
      return;
    }
    if (formData.class_id === 0) {
      toast.error(t.select_class_first);
      return;
    }
    if (formData.course_id === 0) {
      toast.error(t.select_course_first);
      return;
    }
    if (formData.total_mark <= 0) {
      toast.error(t.mark_greater_than_zero);
      return;
    }

    const validQuestions = formData.questions.filter(q => 
      q.question.trim() !== '' && q.answer.trim() !== ''
    );

    if (validQuestions.length === 0) {
      toast.error(t.add_at_least_one_question);
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        questions: validQuestions
      };

      const response = await apiFetch('/add/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (response) {
        toast.success(t.exam_added_success);
        router.push('/teacher/Exam');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
      toast.error(t.error_adding_exam);
    } finally {
      setLoading(false);
    }
  };

  const selectedClass = classes.find(cls => cls.id === formData.class_id);
  const selectedCourse = courses.find(course => course.id === formData.course_id);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className={`flex items-center justify-between mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className={`hover:bg-blue-50 text-blue-600 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {t.back_to_exams}
              </Button>
              
              <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                <h1 className="text-2xl font-bold text-gray-900">{t.create_new_exam}</h1>
                <p className="text-gray-600">{t.design_exam}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* Main Form */}
              <div className="xl:col-span-3 space-y-6">
                
                {/* Exam Basic Info */}
                <Card className="border-2 border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <CardTitle className="text-white">{t.exam_information}</CardTitle>
                        <CardDescription className="text-blue-100">
                          {t.basic_details}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="exam_name" className={`text-sm font-semibold text-gray-700 flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>{t.exam_name}</span>
                        </Label>
                        <Input
                          id="exam_name"
                          value={formData.exam_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, exam_name: e.target.value }))}
                          placeholder={t.exam_name_placeholder}
                          className="h-12 text-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="total_mark" className={`text-sm font-semibold text-gray-700 flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{t.total_mark}</span>
                        </Label>
                        <Input
                          id="total_mark"
                          type="number"
                          value={formData.total_mark}
                          onChange={(e) => setFormData(prev => ({ ...prev, total_mark: parseInt(e.target.value) || 0 }))}
                          className="h-12 text-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Class Selection */}
                      <div className="space-y-3">
                        <Label className={`text-sm font-semibold text-gray-700 flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>{t.select_class}</span>
                        </Label>
                        <Select
                          value={formData.class_id.toString()}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, class_id: parseInt(value) }))}
                        >
                          <SelectTrigger className="h-12 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                            <SelectValue placeholder={t.select_class} />
                          </SelectTrigger>
                          <SelectContent>
                            {classesLoading ? (
                              <SelectItem value="loading" disabled>
                                {t.loading_classes}
                              </SelectItem>
                            ) : classes.length === 0 ? (
                              <SelectItem value="no-classes" disabled>
                                {t.no_classes_available}
                              </SelectItem>
                            ) : (
                              classes.map((cls) => (
                                <SelectItem key={cls.id} value={cls.id.toString()}>
                                  <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <span>{cls.name}</span>
                                    <Badge variant="secondary">
                                      {cls.count} {t.students}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        
                        {selectedClass && (
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <span className="text-sm font-medium text-purple-800">
                                {t.selected} {selectedClass.name}
                              </span>
                              <span className="text-sm text-purple-600">
                                {selectedClass.count} {t.students}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Course Selection */}
                      <div className="space-y-3">
                        <Label className={`text-sm font-semibold text-gray-700 flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <GraduationCap className="h-4 w-4 text-orange-500" />
                          <span>{t.select_course}</span>
                        </Label>
                        <Select
                          value={formData.course_id.toString()}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, course_id: parseInt(value) }))}
                        >
                          <SelectTrigger className="h-12 text-lg border-2 border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
                            <SelectValue placeholder={t.select_course} />
                          </SelectTrigger>
                          <SelectContent>
                            {coursesLoading ? (
                              <SelectItem value="loading" disabled>
                                {t.loading_courses}
                              </SelectItem>
                            ) : courses.length === 0 ? (
                              <SelectItem value="no-courses" disabled>
                                {t.no_courses_available}
                              </SelectItem>
                            ) : (
                              courses.map((course) => (
                                <SelectItem key={course.id} value={course.id.toString()}>
                                  <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <span>{course.name}</span>
                                    <Badge variant={course.active ? "default" : "secondary"}>
                                      {course.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        
                        {selectedCourse && (
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <span className="text-sm font-medium text-orange-800">
                                {t.selected} {selectedCourse.name}
                              </span>
                              <span className={`text-sm ${selectedCourse.active ? 'text-orange-600' : 'text-gray-500'}`}>
                                {selectedCourse.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Questions Section */}
                <Card className="border-2 border-green-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className="p-2 bg-white/20 rounded-lg">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <CardTitle className="text-white">{t.exam_questions}</CardTitle>
                          <CardDescription className="text-green-100">
                            {t.add_questions_answers}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full">
                        <span className="font-bold">{formData.questions.length}</span>
                        <span className="ml-1">{t.questions}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {formData.questions.map((question, index) => (
                        <div key={index} className="border-2 border-green-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              </div>
                              <span className="font-bold text-green-800 text-lg">
                                {t.question} {index + 1}
                              </span>
                            </div>
                            {formData.questions.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeQuestion(index)}
                                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 shadow-sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-700">
                                {t.question_text}
                              </Label>
                              <Textarea
                                value={question.question}
                                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                placeholder={t.question_placeholder}
                                className="min-h-[100px] text-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-700">
                                {t.correct_answer}
                              </Label>
                              <Input
                                value={question.answer}
                                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                                placeholder={t.answer_placeholder}
                                className="h-12 text-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      onClick={addQuestion}
                      className={`w-full mt-6 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg shadow-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                      <Plus className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      {t.add_another_question}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Summary Card */}
                <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-0 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className={`flex items-center space-x-3 mb-6 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl">{t.exam_summary}</CardTitle>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">{t.questions}:</span>
                        <span className="font-bold text-2xl">{formData.questions.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">{t.total_mark}:</span>
                        <span className="font-bold text-2xl">{formData.total_mark}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">{t.classes}:</span>
                        <span className="font-bold text-lg">
                          {selectedClass ? selectedClass.name : t.not_selected}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">{t.course}:</span>
                        <span className="font-bold text-lg">
                          {selectedCourse ? selectedCourse.name : t.not_selected}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/20 rounded-xl border border-white/30">
                      <p className="text-blue-100 text-center font-medium">
                        {formData.questions.length > 0 ? t.ready_to_create : t.add_questions_to_continue}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-2 border-blue-100 shadow-lg">
                  <CardHeader className="bg-blue-50 border-b-2 border-blue-200">
                    <CardTitle className={`text-blue-900 flex items-center space-x-2 text-lg ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Clock className="h-5 w-5" />
                      <span>{t.quick_stats}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-700">{t.questions}</span>
                      <Badge variant="default">
                        {formData.questions.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-green-700">{t.total_marks}</span>
                      <Badge variant="default">
                        {formData.total_mark}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="text-sm font-medium text-purple-700">{t.classes}</span>
                      <Badge variant="default">
                        {classes.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="text-sm font-medium text-orange-700">{t.courses_count}</span>
                      <Badge variant="default">
                        {courses.length}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="border-2 border-green-100 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <Button 
                      type="submit" 
                      className={`w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                      disabled={loading || formData.questions.length === 0 || formData.class_id === 0 || formData.course_id === 0}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t.creating_exam}
                        </>
                      ) : (
                        <>
                          <Save className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                          {t.create_exam}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className={`w-full h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                      onClick={() => router.back()}
                    >
                      <XCircle className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      {t.cancel}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

// Badge component
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'secondary' }) => {
  const baseClasses = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};