// app/exams/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
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
  XCircle
} from 'lucide-react';

// استيراد المكونات الأساسية
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

export default function AddExam() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [formData, setFormData] = useState<ExamData>({
    exam_name: '',
    class_id: 0,
    total_mark: 100,
    questions: [
      { question: '', answer: '' }
    ]
  });
// في الـ useEffect في AddExam page
useEffect(() => {
  const fetchClasses = async () => {
    try {
      setClassesLoading(true);
      // أضف body فارغ للـ POST request
      const data = await apiFetch('/classe/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // ✅ أضف body فارغ
      });
      if (data && data.data) {
        setClasses(data.data);
        if (data.data.length > 0) {
          setFormData(prev => ({ ...prev, class_id: data.data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setClassesLoading(false);
    }
  };

  if (user) {
    fetchClasses();
  }
}, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading...</p>
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
      alert('Please enter exam name');
      return;
    }
    if (formData.class_id === 0) {
      alert('Please select a class');
      return;
    }
    if (formData.total_mark <= 0) {
      alert('Total mark must be greater than 0');
      return;
    }

    const validQuestions = formData.questions.filter(q => 
      q.question.trim() !== '' && q.answer.trim() !== ''
    );

    if (validQuestions.length === 0) {
      alert('Please add at least one question');
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
        toast.success('Exam added successfully!');
        router.push('/teacher/Exam');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
      alert('Error adding exam. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedClass = classes.find(cls => cls.id === formData.class_id);

  return (
    <MainLayout>
      <div className="min-h-screen  via-white to-green-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="hover:bg-blue-50 text-blue-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exams
              </Button>
              
              <div className="text-right">
                <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
                <p className="text-gray-600">Design your exam with questions and answers</p>
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
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-white">Exam Information</CardTitle>
                        <CardDescription className="text-blue-100">
                          Basic details about your exam
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="exam_name" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>Exam Name *</span>
                        </Label>
                        <Input
                          id="exam_name"
                          value={formData.exam_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, exam_name: e.target.value }))}
                          placeholder="e.g., Science Midterm, Math Final Exam"
                          className="h-12 text-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="total_mark" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Total Mark *</span>
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

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span>Select Class *</span>
                      </Label>
                      <Select
                        value={formData.class_id.toString()}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, class_id: parseInt(value) }))}
                      >
                        <SelectTrigger className="h-12 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classesLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading classes...
                            </SelectItem>
                          ) : classes.length === 0 ? (
                            <SelectItem value="no-classes" disabled>
                              No classes available
                            </SelectItem>
                          ) : (
                            classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                <div className="flex items-center space-x-2">
                                  <span>{cls.name}</span>
                                  <Badge variant="secondary" >
                                    {cls.count} students
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      
                      {selectedClass && (
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-800">
                              Selected: {selectedClass.name}
                            </span>
                            <span className="text-sm text-purple-600">
                              {selectedClass.count} students
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Questions Section */}
                <Card className="border-2 border-green-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-white">Exam Questions</CardTitle>
                          <CardDescription className="text-green-100">
                            Add questions and their correct answers
                          </CardDescription>
                        </div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full">
                        <span className="font-bold">{formData.questions.length}</span>
                        <span className="ml-1">questions</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {formData.questions.map((question, index) => (
                        <div key={index} className="border-2 border-green-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              </div>
                              <span className="font-bold text-green-800 text-lg">Question {index + 1}</span>
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
                                Question Text *
                              </Label>
                              <Textarea
                                value={question.question}
                                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                placeholder="Enter the question here... (e.g., What is the capital of France?)"
                                className="min-h-[100px] text-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-700">
                                Correct Answer *
                              </Label>
                              <Input
                                value={question.answer}
                                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                                placeholder="Enter the correct answer... (e.g., Paris)"
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
                      className="w-full mt-6 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg shadow-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Another Question
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Summary Card */}
                <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-0 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl">Exam Summary</CardTitle>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">Questions:</span>
                        <span className="font-bold text-2xl">{formData.questions.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">Total Mark:</span>
                        <span className="font-bold text-2xl">{formData.total_mark}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="text-blue-100">Class:</span>
                        <span className="font-bold text-lg">
                          {selectedClass ? selectedClass.name : 'Not selected'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/20 rounded-xl border border-white/30">
                      <p className="text-blue-100 text-center font-medium">
                        {formData.questions.length > 0 ? 'Ready to create exam!' : 'Add questions to continue'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-2 border-blue-100 shadow-lg">
                  <CardHeader className="bg-blue-50 border-b-2 border-blue-200">
                    <CardTitle className="text-blue-900 flex items-center space-x-2 text-lg">
                      <Clock className="h-5 w-5" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-700">Questions</span>
                      <Badge variant="default" >
                        {formData.questions.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-green-700">Total Marks</span>
                      <Badge variant="default" >
                        {formData.total_mark}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="text-sm font-medium text-purple-700">Classes</span>
                      <Badge variant="default">
                        {classes.length}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="border-2 border-green-100 shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                      disabled={loading || formData.questions.length === 0 || formData.class_id === 0}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating Exam...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5 mr-2" />
                          Create Exam
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold"
                      onClick={() => router.back()}
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
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