'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { useParams } from 'next/navigation';
import MainLayout from "@/components/MainLayout";

import { 
  Calendar, 
  FileText, 
  Users, 
  Award, 
  BookOpen,
  ArrowLeft,
  Download,
  Share2,
  BarChart3,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Types
interface ExamDetails {
  id: number;
  exam_name: string;
  total_mark: number;
  class: string;
  created_at: string;
}

interface ApiResponse {
  result: string;
  message: string;
  data: ExamDetails;
}

export default function ExamDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch exam details
  const fetchExamDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiFetch(`/exams/${id}`);
      setExam(response.data);
    } catch (err) {
      console.error('Error fetching exam details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load exam details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExamDetails();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-4 text-green-600 font-medium">Loading exam details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-500 text-4xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Exam</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <div className="text-yellow-500 text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">Exam Not Found</h2>
            <p className="text-yellow-600 mb-6">The requested exam could not be found.</p>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>   <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <div className="mb-8">
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exams
          </Link>
        </div>

        {/* Exam Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{exam.exam_name}</h1>
                  <p className="text-green-600 font-medium">Exam Details</p>
                </div>
              </div>

              {/* Exam Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Marks</p>
                      <p className="text-2xl font-bold text-green-600">{exam.total_mark}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Class</p>
                      <p className="text-xl font-bold text-blue-600">{exam.class}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created Date</p>
                      <p className="text-lg font-bold text-purple-600">{formatDate(exam.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
           
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exam Statistics Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Exam Statistics
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Exam ID</span>
                <span className="font-mono font-bold text-green-600">#{exam.id}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Completed
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Duration</span>
                <span className="flex items-center gap-1 text-purple-600 font-medium">
                  <Clock className="w-4 h-4" />
                  2 Hours
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-gray-700">Questions</span>
                <span className="font-bold text-orange-600">25</span>
              </div>
            </div>
          </div>

          {/* Class Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Class Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{exam.class}</h3>
                  <p className="text-sm text-gray-600">Class Name</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-gray-600">Participation</div>
                </div>
              </div>
              
          
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 border border-green-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Recent Activity
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Exam created</p>
                <p className="text-xs text-gray-600">{formatDate(exam.created_at)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Students enrolled</p>
                <p className="text-xs text-gray-600">24 students added to exam</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Results published</p>
                <p className="text-xs text-gray-600">All results are now available</p>
              </div>
            </div>
          </div>
        </div>
      

      </div>
    </div></MainLayout>
 
  );
}