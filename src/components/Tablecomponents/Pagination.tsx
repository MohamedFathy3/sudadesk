// components/Pagination.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  language?: 'en' | 'ar';
}

export default function Pagination({
  currentPage,
  lastPage,
  total,
  perPage,
  onPageChange,
  className = "",
  language = 'en'
}: PaginationProps) {
  const startItem = ((currentPage - 1) * perPage) + 1;
  const endItem = Math.min(currentPage * perPage, total);

  // الترجمات
  const t = {
    showing: language === 'ar' ? 'عرض' : 'Showing',
    to: language === 'ar' ? 'إلى' : 'to',
    of: language === 'ar' ? 'من' : 'of',
    entries: language === 'ar' ? 'عنصر' : 'entries',
    page: language === 'ar' ? 'صفحة' : 'Page',
    first: language === 'ar' ? 'الأولى' : 'First',
    previous: language === 'ar' ? 'السابقة' : 'Previous',
    next: language === 'ar' ? 'التالية' : 'Next',
    last: language === 'ar' ? 'الأخيرة' : 'Last',
    goTo: language === 'ar' ? 'اذهب إلى:' : 'Go to:',
    pageOf: language === 'ar' ? 'من' : 'of'
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 2) {
        // في النهاية
        pages.push(1);
        pages.push('...');
        for (let i = lastPage - 3; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        // في المنتصف
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mt-6 ${className}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* معلومات الصفحة */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {t.showing} {startItem} {t.to} {endItem} {t.of} {total} {t.entries} • {t.page} {currentPage} {t.pageOf} {lastPage}
      </div>
      
      {/* عناصر التحكم في الصفحات */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* أول صفحة */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="min-w-[60px]"
        >
          {t.first}
        </Button>
        
        {/* الصفحة السابقة */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="min-w-[80px] text-black bg-green-300 dark:bg-green-900/30 hover:bg-green-400 dark:hover:bg-green-800/40 transition-colors duration-200"
        >
          {t.previous}
        </Button>
        
        {/* أرقام الصفحات */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span 
              key={`ellipsis-${index}`} 
              className="px-3 py-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] ${
                currentPage === page 
                  ? "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700" 
                  : "hover:bg-green-100 dark:hover:bg-green-900/20"
              } transition-colors duration-200`}
            >
              {page}
            </Button>
          )
        ))}
        
        {/* الصفحة التالية */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="min-w-[60px] bg-green-300 dark:bg-green-900/30 hover:bg-green-400 dark:hover:bg-green-800/40 text-black transition-colors duration-200"
        >
          {t.next}
        </Button>
        
        {/* آخر صفحة */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(lastPage)}
          className="min-w-[60px]"
        >
          {t.last}
        </Button>
      </div>
      
      {/* الانتقال لصفحة محددة */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {t.goTo}
        </span>
        <Input
          type="number"
          min="1"
          max={lastPage}
          defaultValue={currentPage}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement;
              const page = parseInt(input.value);
              if (page >= 1 && page <= lastPage) {
                onPageChange(page);
                input.value = currentPage.toString(); 
              }
            }
          }}
          onChange={(e) => {
            const page = parseInt(e.target.value);
            if (page >= 1 && page <= lastPage) {
              onPageChange(page);
            }
          }}
          className="w-20 text-center text-black dark:text-gray-100 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-gray-800 transition-all duration-200"
          placeholder={currentPage.toString()}
        />
      </div>
    </div>
  );
}