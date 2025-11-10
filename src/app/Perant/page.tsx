'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Phone, 
  Mail, 
  School, 
  BookOpen, 
  Users, 
  Calendar,
  Briefcase,
  Shield,
  Clock,
  Edit,
  Award,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function ProfilePage() {
  const { user, role } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-green-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

const examStats = user.exam_results?.reduce((acc, exam) => {
  if (exam && exam.student_mark !== undefined && exam.total_mark !== undefined && exam.total_mark > 0) {
    const percentage = (exam.student_mark / exam.total_mark) * 100;
    acc.totalExams++;
    acc.averageScore += percentage;
    if (percentage >= 50) acc.passedExams++;
    if (percentage > acc.highestScore) acc.highestScore = percentage;
  }
  return acc;
}, { totalExams: 0, averageScore: 0, passedExams: 0, highestScore: 0 }) || {
  totalExams: 0,
  averageScore: 0,
  passedExams: 0,
  highestScore: 0
};

const averageScore = examStats.totalExams > 0 ? examStats.averageScore / examStats.totalExams : 0;


  const attendanceData = user.attendance_report ? Object.values(user.attendance_report)[0] : null;

  return (
    <div className="min-h-screen  via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-6">
              {/* Student Avatar */}
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              
              {/* Student Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {role} - Age {user.age}
                  </span>
                </div>
                <p className="text-green-600 font-medium mb-4">Student Profile - {user.classroom}</p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <School className="w-4 h-4" />
                    <span>{user.school?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{user.education_stage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{user.term}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Summary */}
            <div className="mt-6 lg:mt-0 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceData?.totals.attendance_rate || '0%'}
                  </div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {examStats?.totalExams || 'null'}
                  </div>
                  <div className="text-sm text-gray-600">Exams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {averageScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Average</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Student Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                Student Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Education Stage</p>
                      <p className="font-medium text-gray-900">{user.education_stage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Term</p>
                      <p className="font-medium text-gray-900">{user.term}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                    <School className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Previous School</p>
                      <p className="font-medium text-gray-900">{user.previous_school}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Classroom</p>
                      <p className="font-medium text-gray-900">{user.classroom}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                    <Shield className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className={`font-medium ${user.active ? 'text-green-600' : 'text-red-600'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Results Card */}
            {user.exam_results && user.exam_results.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Exam Results
                </h2>
                
                <div className="space-y-4">
                  {user.exam_results.map((exam, index) => {
                    const percentage = (exam.student_mark / exam.total_mark) * 100;
                    const isPassing = percentage >= 50;
                    
                    return (
                      <div key={exam.exam_id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{exam.exam_name}</h3>
                            <p className="text-sm text-gray-600">Teacher: {exam.teacher_name}</p>
                            <p className="text-sm text-gray-600">
                              Date: {new Date(exam.exam_date).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900">
                                {exam.student_mark}/{exam.total_mark}
                              </div>
                              <div className="text-sm text-gray-600">Score</div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-lg font-bold ${
                                isPassing ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {percentage.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">Percentage</div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isPassing ? 'Pass' : 'Fail'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isPassing ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Parents Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Parents Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Information */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Father
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{user.father?.name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user.father?.phone || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.father?.job || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Mother Information */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-pink-600" />
                    Mother
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{user.mother?.name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user.mother?.phone || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.mother?.job || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-8">
            
            {/* Attendance Card */}
            {attendanceData && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-green-500" />
                  Attendance Report
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{attendanceData.totals.present}</div>
                      <div className="text-xs text-gray-600">Present</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-600">{attendanceData.totals.absent}</div>
                      <div className="text-xs text-gray-600">Absent</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{attendanceData.totals.leave}</div>
                      <div className="text-xs text-gray-600">Leave</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{attendanceData.totals.attendance_rate}</div>
                    <div className="text-sm text-gray-600">Overall Attendance Rate</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Recent Attendance:</h4>
                    <div className="space-y-2">
                      {Object.entries(attendanceData.days).map(([date, status]) => (
                        <div key={date} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : status === 'absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* School Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <School className="w-5 h-5 text-purple-500" />
                School Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <School className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">School Name</p>
                    <p className="font-semibold text-gray-900">{user.school?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">School ID</p>
                    <p className="font-semibold text-gray-900">#{user.school_id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reception Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Reception Contact
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                  <User className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Receptionist</p>
                    <p className="font-semibold text-gray-900">{user.reception?.name || 'ds'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{user.reception?.email || 'null'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                Performance Summary
              </h2>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {examStats?.passedExams || 'null' }/{examStats?.totalExams  || 'null'}
                  </div>
                  <div className="text-sm text-gray-600">Exams Passed</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {examStats?.highestScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Highest Score</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date(user.created_at).getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600">Registration Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}