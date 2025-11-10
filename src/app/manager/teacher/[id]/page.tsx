// app/teachers/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Users, BookOpen, Calendar, School, User, Clock, Edit, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import MainLayout from "@/components/MainLayout";
import { apiFetch } from '@/lib/api';

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

interface School {
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

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  school_id: number;
  active: boolean;
  avatar: string | null;
  school: School;
  classes: Class[];
  created_at: string;
  updated_at: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exams: any[];
}

export default function TeacherShowPage() {
  const params = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const teacherId = params.id;

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/teacher/${teacherId}`);
        
        if (data && data.data) {
          setTeacher(data.data);
        } else {
          throw new Error('Teacher data not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teacher');
        console.error('Error fetching teacher:', err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teacher information...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !teacher) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Teacher Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/manager/teacher/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Teachers
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/manager/teacher/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg border shadow-sm"
              >
                <ArrowLeft size={20} />
                <span>Back to Teachers</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Teacher Details</h1>
                <p className="text-gray-600 text-sm">Complete information about the teacher</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/manager/teacher/${teacherId}/edit`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Edit size={16} />
                <span>Edit Teacher</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Teacher Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Teacher Basic Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {teacher.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                      <p className="text-gray-600">Teacher ID: TCH{String(teacher.id).padStart(3, '0')}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                    teacher.active 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {teacher.active ? '🟢 Active' : '🔴 Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="text-gray-900 font-medium">{teacher.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="text-gray-900 font-medium">{teacher.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-orange-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="text-gray-900 font-medium">{teacher.address || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Role</p>
                        <p className="text-gray-900 font-medium capitalize">{teacher.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <School className="text-blue-600" size={24} />
                  <span>School Information</span>
                </h3>
                
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  {teacher.school.logo && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md">
                      <img 
                        src={teacher.school.logo} 
                        alt={teacher.school.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{teacher.school.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{teacher.school.manager_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classes Section */}
              {teacher.classes && teacher.classes.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <BookOpen className="text-green-600" size={24} />
                    <span>Assigned Classes ({teacher.classes.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.classes.map((classItem) => (
                      <div key={classItem.id} className="border-2 border-gray-100 rounded-lg p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 text-lg">{classItem.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            classItem.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {classItem.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <Users size={14} />
                              <span>Students</span>
                            </span>
                            <span className="text-gray-900 font-medium">{classItem.count}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <School size={14} />
                              <span>School</span>
                            </span>
                            <span className="text-gray-900 font-medium text-sm">{classItem.school_name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>Created</span>
                            </span>
                            <span className="text-gray-900 font-medium text-sm">
                              {new Date(classItem.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Summary */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <GraduationCap className="text-blue-600" size={20} />
                  <span>Teacher Summary</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      teacher.active ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {teacher.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Classes</span>
                    <span className="text-gray-900 font-bold">{teacher.classes?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Member Since</span>
                    <span className="text-gray-900 text-sm">
                      {new Date(teacher.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="text-gray-900 text-sm">
                      {new Date(teacher.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}