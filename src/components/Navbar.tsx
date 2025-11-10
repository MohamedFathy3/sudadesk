// components/Navbar.tsx
'use client'

import { Search, Bell, User, ChevronsLeft, Bookmark, FileText, LogOut, Globe } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu'

export default function Navbar({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean
  toggleSidebar: () => void
}) {
  const { user, logout } = useAuth()
  const { language, setLanguage } = useLanguage()

  const t = {
    search: language === 'ar' ? 'بحث...' : 'Search...',
    favorites: language === 'ar' ? 'المفضلة' : 'Favorites',
    notifications: language === 'ar' ? 'الإشعارات' : 'Notifications',
    profile: language === 'ar' ? 'الملف الشخصي' : 'Profile',
    logout: language === 'ar' ? 'تسجيل الخروج' : 'Log out',
    reports: language === 'ar' ? 'التقارير' : 'Reports',
    dashboard: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    analytics: language === 'ar' ? 'التحليلات' : 'Analytics',
    openReports: language === 'ar' ? 'فتح التقارير' : 'Open Reports'
  }

  const favorites = [
    { name: t.dashboard, url: '/dashboard' },
    { name: t.reports, url: '/reports' },
    { name: t.analytics, url: '/analytics' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-4">
          {/* زر القائمة */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronsLeft className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
            </Button>
          </div>

          {/* مربع البحث */}
          <div className="relative max-w-md w-full mx-4">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`} />
            <input
              type="text"
              placeholder={t.search}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              className={`pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 focus:outline-none rounded-[15px] focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${language === 'ar' ? 'pr-10 pl-4 text-right' : ''}`}
            />
          </div>

          {/* الجزء الأيمن */}
          <div className="flex items-center space-x-3">
            {/* اختيار اللغة */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title={language === 'ar' ? 'تغيير اللغة' : 'Change language'}>
                  <Globe className="h-5 w-5 text-blue-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  🇸🇦 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* التقارير */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.open(window.location.href, "_blank")} 
              className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
              title={t.openReports}
            >
              <FileText className="h-5 w-5" />
            </Button>

            {/* المفضلة */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-green-600 hover:text-green-600 dark:hover:text-green-400"
                  title={t.favorites}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-1.5 text-sm font-semibold">{t.favorites}</div>
                <DropdownMenuSeparator />
                {favorites.map((fav, index) => (
                  <DropdownMenuItem 
                    key={index}
                    onClick={() => window.location.href = fav.url}
                    className="cursor-pointer"
                  >
                    {fav.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* الإشعارات */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-yellow-600 hover:text-yellow-600 dark:hover:text-yellow-200"
                title={t.notifications}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0.5 right-0.5 h-4 min-w-[16px] px-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>

            <ThemeToggle />

            {/* قائمة المستخدم */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                    {user?.logo ? (
                      <img src={user.logo} alt="User" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name ?? (language === 'ar' ? 'زائر' : 'Guest')}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-semibold">{user?.name ?? (language === 'ar' ? 'زائر' : 'Guest')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email ?? ''}</p>
                </div>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => window.location.href = '/Profile'}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t.profile}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="h-2 w-full bg-gradient-to-bl from-[#3D63F4] to-[#000000]" />
    </>
  )
}