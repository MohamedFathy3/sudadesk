'use client'

import { 
  Home, School, Users, UserPlus, BookOpen, GraduationCap, User, Shield, Crown,
  FileText, Gauge, ChevronDown, Building, Briefcase, CreditCard, UserCog, Check,
  Filter, DollarSign, ClipboardCheck, Settings, BarChart
} from "lucide-react"

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { useState, useEffect } from 'react'
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
  const { user, role, hasRole } = useAuth()
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false)
  const { language, setLanguage } = useLanguage()
  
  // متغير محلي في السايدبار فقط لتحديد الدور الحالي
  const [currentRole, setCurrentRole] = useState<string | null>(null)
  const [showAllItems, setShowAllItems] = useState<boolean>(true)

  // عند تحميل المكون، نحدد الدور الحالي
  useEffect(() => {
    if (user && !currentRole) {
      // نستخدم الدور الأساسي أولاً
      setCurrentRole(role || 'teacher')
      setShowAllItems(true)
    }
  }, [user, role, currentRole])

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')

  const t = {
    dashboard: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    schoolManagement: language === 'ar' ? 'إدارة المدارس' : 'School Management',
    addStudents: language === 'ar' ? 'إضافة الطلاب' : 'Add Students',
    reception: language === 'ar' ? 'ادارة شؤون الطلاب' : 'Reception Management',
    hr: language === 'ar' ? 'إدارة الموارد البشرية' : 'HR Management',
    accountant: language === 'ar' ? 'إدارة المحاسبة' : 'Accountant Management',
    chapters: language === 'ar' ? 'إدارة الفصول' : 'Chapters Management',
    students: language === 'ar' ? 'إدارة الطلاب' : 'Students Management',
    teachers: language === 'ar' ? 'إدارة المعلمين' : 'Teachers Management',
    supervisors: language === 'ar' ? 'إدارة المشرفين الصف' : 'Supervisors Management',
    directors: language === 'ar' ? 'إدارة المشرف الأكاديمي' : 'Directors Management',
    attendance: language === 'ar' ? 'إدارة الحضور' : 'Attendance',
    myStudents: language === 'ar' ? 'طلابي' : 'My Students',
    createExam: language === 'ar' ? 'إنشاء اختبار' : 'Create Exam',
    exam: language === 'ar' ? 'الاختبارات' : 'Exams',
    parent: language === 'ar' ? 'ولي الأمر' : 'Parent',
    account: language === 'ar' ? 'الحساب' : 'Account',
    expenses: language === 'ar' ? 'المصروفات' : 'Expenses',
    role: language === 'ar' ? 'الدور:' : 'Role:',
    language: language === 'ar' ? 'اللغة' : 'Language',
    material: language === 'ar' ? 'المادة' : 'Material',
    expensesstudents: language === 'ar' ? 'مصروفات الطلاب' : 'Student Expenses',
    academicManagement: language === 'ar' ? 'الإدارة الأكاديمية' : 'Academic Management',
    financialManagement: language === 'ar' ? 'الإدارة المالية' : 'Financial Management',
    humanResources: language === 'ar' ? 'الموارد البشرية' : 'Human Resources',
    systemSettings: language === 'ar' ? 'إعدادات النظام' : 'System Settings',
    profile: language === 'ar' ? 'ملف النظام' : 'Profile Settings',
    profileSetting: language === 'ar' ? 'إعدادات الموقع' : 'Site Settings',
    allRoles: language === 'ar' ? 'عرض الكل' : 'Show All',
    filterByRole: language === 'ar' ? 'تصفية حسب الدور' : 'Filter by Role',
    clearFilter: language === 'ar' ? 'مسح التصفية' : 'Clear Filter',
    currentView: language === 'ar' ? 'العرض الحالي:' : 'Current View:',
    reports: language === 'ar' ? 'التقارير' : 'Reports',
    payments: language === 'ar' ? 'المدفوعات' : 'Payments',
    settings: language === 'ar' ? 'الإعدادات' : 'Settings',
  }

  // دالة للحصول على أسماء وأيقونات الأدوار
  const getRoleInfo = (role: string) => {
    const roleInfo: Record<string, { 
      en: string, 
      ar: string, 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: any,
      color: string,
      bgColor: string
    }> = {
      teacher: { 
        en: 'Teacher', 
        ar: 'معلم', 
        icon: User, 
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
      },
      hr: { 
        en: 'HR Manager', 
        ar: 'موارد بشرية', 
        icon: Users, 
        color: 'text-purple-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
      },
      reception: { 
        en: 'Reception', 
        ar: 'استقبال', 
        icon: Briefcase, 
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30'
      },
      accountant: { 
        en: 'Accountant', 
        ar: 'محاسب', 
        icon: CreditCard, 
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/30'
      },
      director: { 
        en: 'Academic Director', 
        ar: 'مشرف أكاديمي', 
        icon: Crown, 
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
      },
      class_supervisor: { 
        en: 'Class Supervisor', 
        ar: 'مشرف صف', 
        icon: Shield, 
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
      },
      manager: { 
        en: 'School Manager', 
        ar: 'مدير مدرسة', 
        icon: Building, 
        color: 'text-orange-600',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30'
      },
      super_admin: { 
        en: 'Super Admin', 
        ar: 'مدير عام', 
        icon: UserCog, 
        color: 'text-pink-600',
        bgColor: 'bg-pink-100 dark:bg-pink-900/30'
      },
      Perant: { 
        en: 'Parent', 
        ar: 'ولي أمر', 
        icon: Users, 
        color: 'text-teal-600',
        bgColor: 'bg-teal-100 dark:bg-teal-900/30'
      },
    }
    return roleInfo[role] || { 
      en: role, 
      ar: role, 
      icon: User, 
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    }
  }

  // تعريف المجموعات مع عناوينها
  const menuGroups = [
    {
      id: 'general',
      title: language === 'ar' ? 'عام' : 'General',
      roles: ['super_admin', 'director', 'manager', 'teacher', 'accountant', 'hr', 'reception', 'Perant'],
      items: [
        { name: t.dashboard, icon: Home, href: '/admin', roles: ['super_admin'] },
        { name: t.schoolManagement, icon: School, href: '/admin/createSchool', roles: ['super_admin'] },
        { name: t.schoolManagement, icon: School, href: '/director', roles: ['director', 'class_supervisor'] },
        { name: t.dashboard, icon: Home, href: '/reception', roles: ['reception'] },
        { name: t.addStudents, icon: UserPlus, href: '/reception/students', roles: ['reception'] },
        { name: t.dashboard, icon: Gauge, href: '/manager', roles: ['manager'] },
        { name: t.dashboard, icon: Home, href: '/teacher', roles: ['teacher'] },
        { name: t.parent, icon: Home, href: '/Perant', roles: ['Perant'] },
      ]
    },
    
    {
      id: 'academic',
      title: t.academicManagement,
      roles: ['manager'],
      items: [
        { name: t.reception, icon: Users, href: '/manager/reseption', roles: ['manager'] },
        { name: t.material, icon: Users, href: '/manager/material', roles: ['manager'] },
        { name: t.chapters, icon: BookOpen, href: '/manager/Chapters', roles: ['manager'] },
        { name: t.students, icon: GraduationCap, href: '/manager/students', roles: ['manager'] },
        { name: t.teachers, icon: User, href: '/manager/teacher', roles: ['manager'] },
        { name: t.supervisors, icon: Shield, href: '/manager/supervisor', roles: ['manager'] },
        { name: t.directors, icon: Crown, href: '/manager/director', roles: ['manager'] },
        { name: t.profileSetting, icon: FileText, href: '/manager/SchoolProfile', roles: ['manager'] },
      ]
    },
    
    {
      id: 'financial',
      title: t.financialManagement,
      roles: ['accountant','manager'],
      items: [
        { name: t.account, icon: Home, href: '/Account', roles: ['accountant'] },
        { name: t.accountant, icon: Building, href: '/manager/accountant', roles: ['accountant', 'manager'] },
        { name: t.expenses, icon: DollarSign, href: '/Account/expent', roles: ['accountant','manager'] },
        { name: t.expensesstudents, icon: FileText, href: '/Account/students', roles: ['accountant','manager'] },
        { name: t.reports, icon: BarChart, href: '/Account/', roles: ['accountant','manager'] },
      ]
    },

    {
      id: 'hr',
      title: t.humanResources,
      roles: ['hr', 'manager'],
      items: [
        { name: t.hr, icon: Users, href: '/manager/hr', roles: ['manager'] },
        { name: t.hr, icon: Users, href: '/hr', roles: ['hr'] },
        { name: t.attendance, icon: ClipboardCheck, href: '/hr/attendance', roles: ['hr','manager'] },
      ]
    },

    {
      id: 'teacher',
      title: language === 'ar' ? 'المعلمين' : 'Teachers',
      roles: ['teacher'],
      items: [
        { name: t.myStudents, icon: Users, href: '/teacher/students', roles: ['teacher'] },
        { name: t.createExam, icon: FileText, href: '/teacher/AddExam', roles: ['teacher'] },
        { name: t.exam, icon: FileText, href: '/teacher/Exam', roles: ['teacher'] },
        { name: t.attendance, icon: ClipboardCheck, href: '/teacher/attendance', roles: ['teacher'] },
      ]
    },

    {
      id: 'settings',
      title: language === 'ar' ? 'الإعدادات' : 'Settings',
      roles: ['accountant','manager'],
      items: [
        { name: t.profile, icon: Settings, href: '/manager/profile', roles: ['manager'] },
        { name: t.systemSettings, icon: Settings, href: '/admin/settings', roles: ['super_admin'] },
      ]
    },
  ]

  const toggleDropdown = (groupId: string) => {
    setOpenDropdown(openDropdown === groupId ? null : groupId)
  }

  // الحصول على جميع الأدوار المتاحة
  const getAvailableRoles = () => {
    const roles: string[] = []
    if (role) roles.push(role)
    if (user?.secound_role) roles.push(...user.secound_role)
    return Array.from(new Set(roles))
  }

  const availableRoles = getAvailableRoles()

  // دالة للحصول على العناصر المعروضة بناءً على الفلترة
  const getFilteredItems = () => {
    // إذا كان showAllItems = true، نعرض كل العناصر المتاحة
    if (showAllItems) {
      return menuGroups.flatMap(group => 
        group.items.filter(item => hasRole(item.roles))
      )
    }
    
    // إذا كان هناك currentRole محدد، نعرض فقط العناصر الخاصة بهذا الدور
    if (currentRole) {
      return menuGroups.flatMap(group => 
        group.items.filter(item => item.roles.includes(currentRole))
      )
    }
    
    // إذا لم يكن هناك currentRole، نعرض العناصر الخاصة بالدور الأساسي
    return menuGroups.flatMap(group => 
      group.items.filter(item => item.roles.includes(role || ''))
    )
  }

  const filteredItems = getFilteredItems()

  // الحصول على اسم العرض الحالي
  const getCurrentViewName = () => {
    if (showAllItems) {
      return t.allRoles
    }
    if (currentRole) {
      const roleInfo = getRoleInfo(currentRole)
      return roleInfo[language === 'ar' ? 'ar' : 'en']
    }
    return t.allRoles
  }

  // تصفية المجموعات بناءً على العناصر المتاحة
  const getFilteredGroups = () => {
    return menuGroups.filter(group => {
      const groupItems = group.items.filter(item => {
        if (showAllItems) {
          return hasRole(item.roles)
        } else if (currentRole) {
          return item.roles.includes(currentRole)
        } else {
          return item.roles.includes(role || '')
        }
      })
      return groupItems.length > 0
    })
  }

  const filteredGroups = getFilteredGroups()

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
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                  {language === 'ar' ? 'نظام الإدارة' : 'Management'}
                </h2>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mx-auto">
                E
              </div>
            )}

            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={t.language}
                className="h-8 w-8"
              >
                <Globe className="h-4 w-4 text-green-600" />
              </Button>
            )}
          </div>

          {/* زر الفلترة - تصميم مضغوط */}
          {!collapsed && availableRoles.length > 0 && (
            <div className="relative border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                    <Filter className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.filterByRole}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                      {t.currentView} <span className="font-medium text-green-600 dark:text-green-400">{getCurrentViewName()}</span>
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    filterDropdownOpen ? "rotate-180" : ""
                  )} 
                />
              </button>

              {/* Dropdown الفلترة */}
              {filterDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setFilterDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
                    {/* زر عرض الكل */}
                    <button
                      onClick={() => {
                        setShowAllItems(true)
                        setCurrentRole(null)
                        setFilterDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700",
                        showAllItems ? "bg-green-50 dark:bg-green-900/20" : ""
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">
                            {t.allRoles}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {filteredItems.length} {language === 'ar' ? 'صفحة' : 'pages'}
                          </p>
                        </div>
                      </div>
                      {showAllItems && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </button>

                    {/* أدوار المستخدم */}
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      {availableRoles.map((availableRole) => {
                        const roleInfo = getRoleInfo(availableRole)
                        const Icon = roleInfo.icon
                        const isActive = currentRole === availableRole && !showAllItems
                        
                        return (
                          <button
                            key={availableRole}
                            onClick={() => {
                              setCurrentRole(availableRole)
                              setShowAllItems(false)
                              setFilterDropdownOpen(false)
                            }}
                            className={cn(
                              "w-full flex items-center justify-between p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700",
                              isActive ? "bg-green-50 dark:bg-green-900/20" : ""
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded-md", roleInfo.bgColor)}>
                                <Icon className={cn("h-4 w-4", roleInfo.color)} />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-medium capitalize">
                                  {language === 'ar' ? roleInfo.ar : roleInfo.en}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {filteredItems.filter(item => item.roles.includes(availableRole)).length} {language === 'ar' ? 'صفحة' : 'pages'}
                                </p>
                              </div>
                            </div>
                            {isActive && (
                              <Check className="h-4 w-4 text-green-600" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* زر مسح الفلترة */}
                    {(!showAllItems || currentRole) && (
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => {
                            setShowAllItems(true)
                            setCurrentRole(null)
                            setFilterDropdownOpen(false)
                          }}
                          className="w-full flex items-center justify-center p-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span>{t.clearFilter}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6 px-3">
              {filteredGroups.length === 0 ? (
                <div className="text-center py-8 px-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'لا توجد صفحات لهذا الدور' : 'No pages for this role'}
                  </p>
                </div>
              ) : (
                filteredGroups.map((group) => {
                  // تصفية عناصر المجموعة بناءً على الفلترة
                  const groupItems = group.items.filter(item => {
                    if (showAllItems) {
                      return hasRole(item.roles)
                    } else if (currentRole) {
                      return item.roles.includes(currentRole)
                    } else {
                      return item.roles.includes(role || '')
                    }
                  })

                  if (groupItems.length === 0) return null

                  const isDropdownOpen = openDropdown === group.id
                  const hasMultipleItems = groupItems.length > 1

                  return (
                    <div key={group.id} className="space-y-2">
                      {/* Group Title - يظهر دائماً عندما لا يكون collapsed */}
                      {!collapsed && (
                        <div className="px-2">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {group.title}
                          </h3>
                          <div className="mt-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                      )}

                      {/* Group Items */}
                      <ul className="space-y-1">
                        {groupItems.map((item) => {
                          const isActive = pathname === item.href
                          const Icon = item.icon

                          return (
                            <li key={`${item.href}-${item.name}`}>
                              <Link
                                href={item.href}
                                className={cn(
                                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                                  collapsed && 'justify-center',
                                  isActive
                                    ? 'bg-green-500 text-white dark:bg-green-600 shadow-lg border border-green-600'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600'
                                )}
                                onClick={collapsed ? undefined : () => {}}
                              >
                                <Icon className={cn(
                                  "h-4 w-4 shrink-0 transition-colors",
                                  isActive ? "text-white" : "text-gray-400 group-hover:text-green-500"
                                )} />
                                <span
                                  className={cn(
                                    'transition-all duration-300 truncate',
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
                    </div>
                  )
                })
              )}
            </div>
          </nav>

          {/* معلومات المستخدم - مضغوطة */}
          {!collapsed && user && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  {user.logo ? (
                    <img 
                      src={user.logo} 
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-green-500"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {getCurrentViewName()}
                    </span>
                    {availableRoles.length > 1 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        • {availableRoles.length} {language === 'ar' ? 'أدوار' : 'roles'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}