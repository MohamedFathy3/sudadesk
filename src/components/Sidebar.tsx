'use client'

import { 
  Home, School, Users, UserPlus, BookOpen, GraduationCap, User, Shield, Crown,
  FileText, Gauge
} from "lucide-react"

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

export default function Sidebar({
  open,
  collapsed,
  onClose,
}: {
  open: boolean
  collapsed: boolean
  onClose: () => void
}) {
  const { role, hasRole } = useAuth()
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')

  const t = {
    dashboard: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    schoolManagement: language === 'ar' ? 'إدارة المدارس' : 'School Management',
    addStudents: language === 'ar' ? 'إضافة الطلاب' : 'Add Students',
    reception: language === 'ar' ? 'الاستقبال' : 'Reception Management',
    hr: language === 'ar' ? 'إدارة الموارد البشرية' : 'HR Management',
    accountant: language === 'ar' ? 'إدارة المحاسبة' : 'Accountant Management',
    chapters: language === 'ar' ? 'إدارة الفصول' : 'Chapters Management',
    students: language === 'ar' ? 'إدارة الطلاب' : 'Students Management',
    teachers: language === 'ar' ? 'إدارة المعلمين' : 'Teachers Management',
    supervisors: language === 'ar' ? 'إدارة المشرفين' : 'Supervisors Management',
    directors: language === 'ar' ? 'إدارة المديرين' : 'Directors Management',
    attendance: language === 'ar' ? 'إدارة الحضور' : 'Attendance',
    myStudents: language === 'ar' ? 'طلابي' : 'My Students',
    createExam: language === 'ar' ? 'إنشاء اختبار' : 'Create Exam',
    exam: language === 'ar' ? 'الاختبارات' : 'Exams',
    parent: language === 'ar' ? 'ولي الأمر' : 'Parent',
    account: language === 'ar' ? 'الحساب' : 'Account',
    expenses: language === 'ar' ? 'المصروفات' : 'Expenses',
    role: language === 'ar' ? 'الدور:' : 'Role:',
    language: language === 'ar' ? 'اللغة' : 'Language',
  }

  const navItems = [
    { name: t.dashboard, icon: Home, href: '/admin', roles: ['super_admin'] },
    { name: t.schoolManagement, icon: School, href: '/admin/createSchool', roles: ['super_admin'] },
    { name: t.schoolManagement, icon: School, href: '/director', roles: ['director', 'class_supervisor'] },
    { name: t.dashboard, icon: Home, href: '/reception', roles: ['reception'] },
    { name: t.addStudents, icon: UserPlus, href: '/reception/students', roles: ['reception'] },
    { name: t.dashboard, icon: Gauge, href: '/manager', roles: ['manager'] },
    { name: t.reception, icon: Users, href: '/manager/reseption', roles: ['manager'] },
    { name: t.hr, icon: Users, href: '/manager/hr', roles: ['manager'] },
    { name: t.accountant, icon: Users, href: '/manager/accountant', roles: ['manager'] },
    { name: t.chapters, icon: BookOpen, href: '/manager/Chapters', roles: ['manager'] },
    { name: t.students, icon: GraduationCap, href: '/manager/students', roles: ['manager'] },
    { name: t.teachers, icon: User, href: '/manager/teacher', roles: ['manager'] },
    { name: t.supervisors, icon: Shield, href: '/manager/supervisor', roles: ['manager'] },
    { name: t.directors, icon: Crown, href: '/manager/director', roles: ['manager'] },
    { name: t.attendance, icon: FileText, href: '/hr/attendance', roles: ['hr'] },
    { name: t.dashboard, icon: Home, href: '/teacher', roles: ['teacher'] },
    { name: t.myStudents, icon: Users, href: '/teacher/students', roles: ['teacher'] },
    { name: t.createExam, icon: FileText, href: '/teacher/AddExam', roles: ['teacher'] },
    { name: t.exam, icon: FileText, href: '/teacher/Exam', roles: ['teacher'] },
    { name: t.account, icon: Home, href: '/Account', roles: ['accountant'] },
    { name: t.expenses, icon: FileText, href: '/Account/expent', roles: ['accountant'] },
    { name: t.parent, icon: Home, href: '/Perant', roles: ['Perant'] },
  ]

  const filteredNavItems = navItems.filter(item =>
    item.roles?.some(r => hasRole(r))
  )

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-900 border-r dark:border-gray-700',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:inset-auto'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed ? (
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">System</h2>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                E
              </div>
            )}

            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={t.language}
              >
                <Globe className="h-5 w-5 text-green-600" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href!}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors group',
                        collapsed && 'justify-center',
                        isActive
                          ? 'bg-green-500 text-white dark:bg-green-600 shadow-lg border border-green-600'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600'
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-green-500"
                      )} />
                      <span
                        className={cn(
                          'transition-all duration-300',
                          collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Role Display */}
          {!collapsed && role && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t.role}</span>
                <span className="font-medium text-green-600 dark:text-green-400 capitalize">
                  {role}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
