// contexts/LanguageContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar', // تغيير الافتراضي لـ 'ar'
  setLanguage: () => {},
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ar') // قيمة ابتدائية

  useEffect(() => {
    // جلب اللغة من localStorage عند التحميل
    const loadLanguageFromStorage = () => {
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('lang') as Language
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
          setLanguageState(savedLang)
          applyLanguageSettings(savedLang)
        } else {
          // إذا مفيش لغة محفوظة، خليها عربي
          setLanguageState('ar')
          applyLanguageSettings('ar')
        }
      }
    }

    loadLanguageFromStorage()
  }, [])

  // دالة لتطبيق إعدادات اللغة
  const applyLanguageSettings = (lang: Language) => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const setLanguage = (lang: Language) => {
    // التحقق من اللغة المدخلة
    if (lang !== 'en' && lang !== 'ar') {
      console.warn('Language must be either "en" or "ar"')
      return
    }
    
    setLanguageState(lang)
    applyLanguageSettings(lang)
    localStorage.setItem('lang', lang)
    
    console.log('✅ Language changed to:', lang)
     window.location.reload();
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}