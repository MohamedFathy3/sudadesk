'use client';

import { useState, useEffect } from "react";

interface ActivitiesGalleryProps {
  activities: Array<{
    image: string | null;
    caption: string;
  }>;
  title?: string;
  subtitle?: string;
}

// ⭐⭐ دالة تنظيف نهائية
const cleanImageUrl = (url: string | null): string => {
  if (!url || url.trim() === '' || url === 'null' || url === 'undefined') {
    return '/assets/images/default-activity.jpg';
  }

  const cleanedUrl = url.trim();
  
  // حالة: URL مزدوج كامل
  if (cleanedUrl.includes('http://suducsback.solunile.com/storage/http://suducsback.solunile.com/storage/')) {
    return cleanedUrl.replace(
      'http://suducsback.solunile.com/storage/http://suducsback.solunile.com/storage/',
      'http://suducsback.solunile.com/storage/'
    );
  }
  
  // حالة: storage/ مكرر
  if (cleanedUrl.includes('/storage/storage/')) {
    return cleanedUrl.replace('/storage/storage/', '/storage/');
  }
  
  // حالة: URL يبدأ مباشرة بـ schools/
  if (cleanedUrl.startsWith('schools/')) {
    return 'http://suducsback.solunile.com/storage/' + cleanedUrl;
  }
  
  return cleanedUrl;
};

// ⭐⭐ دالة للتحقق من وجود الصورة
const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors' // ⭐⭐ مهم لتفادي مشاكل CORS
    });
    return true;
  } catch (error) {
    console.error('❌ فشل في الوصول للصورة:', url, error);
    return false;
  }
};

export const ActivitiesGallery = ({ 
  activities, 
  title = "Our School Activities", 
  subtitle = "Discover the vibrant activities and events at our school"
}: ActivitiesGalleryProps) => {
  const [displayActivities, setDisplayActivities] = useState<
    Array<{
      image: string;
      caption: string;
      id: number;
      status: 'loading' | 'loaded' | 'error';
    }>
  >([]);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const processActivities = async () => {
      setIsChecking(true);
      
      const processed = await Promise.all(
        activities
          .filter(item => item.image && item.image !== 'null' && item.image !== 'undefined')
          .map(async (item, index) => {
            const cleanedUrl = cleanImageUrl(item.image);
            
            // ⭐⭐ اختياري: التحقق من وجود الصورة
            // يمكنك تعطيل هذا الجزء إذا كان يسبب بطئ
            let imageExists = true;
            try {
              // اختبار بسيط دون fetch
              const testImage = new Image();
              testImage.src = cleanedUrl;
              await new Promise((resolve, reject) => {
                testImage.onload = resolve;
                testImage.onerror = reject;
                setTimeout(resolve, 2000); // timeout بعد ثانيتين
              });
            } catch {
              imageExists = false;
            }
            
            return {
              image: imageExists ? cleanedUrl : '/assets/images/default-activity.jpg',
              caption: item.caption || `Activity ${index + 1}`,
              id: index,
              status: imageExists ? 'loading' : 'error'
            };
          })
      );

      // Fix status type to match the allowed values
      const safeProcessed = processed.map(item => ({
        ...item,
        status:
          item.status === 'loading' ||
          item.status === 'loaded' ||
          item.status === 'error'
            ? item.status
            : 'loading' // default to 'loading' if something unexpected
      }));

      // Enforce correct type for status using a type assertion
      setDisplayActivities(safeProcessed as {
        image: string;
        caption: string;
        id: number;
        status: "loading" | "loaded" | "error";
      }[]);
      setIsChecking(false);
    };

    processActivities();
  }, [activities]);

  const handleImageLoad = (id: number) => {
    setDisplayActivities(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'loaded' } : item
      )
    );
  };

  const handleImageError = (id: number) => {
    setDisplayActivities(prev =>
      prev.map(item =>
        item.id === id ? { 
          ...item, 
          status: 'error',
          image: '/assets/images/default-activity.jpg'
        } : item
      )
    );
  };

  if (isChecking) {
    return (
      <section className="ed-testimonials section-gap">
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="ed-section-head text-center">
                <span className="ed-section-head__sm-title">{subtitle}</span>
                <h3 className="ed-section-head__title">{title}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Preparing activities gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayActivities.length === 0) {
    return (
      <section className="ed-testimonials section-gap">
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="ed-section-head text-center">
                <span className="ed-section-head__sm-title">{subtitle}</span>
                <h3 className="ed-section-head__title">{title}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="alert alert-info d-inline-block">
                <i className="fas fa-info-circle me-2"></i>
                No activities to display. Add some activities in the school profile.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ed-testimonials mt-5">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title text-muted d-block mb-2">
                {subtitle}
              </span>
              <h3 className="ed-section-head__title display-5 fw-bold">
                {title}
              </h3>
              <div className="mt-3">
                <span className="badge bg-primary rounded-pill px-3 py-2">
                  {displayActivities.length} Activities
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-4 mt-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="col-lg-4 col-md-6 col-12">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <div 
                  className="position-relative" 
                  style={{ 
                    height: '250px', 
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  {/* حالة التحميل */}
                  {activity.status === 'loading' && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  
                  {/* حالة الخطأ */}
                  {activity.status === 'error' && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light">
                      <i className="fas fa-image fa-3x text-muted mb-2"></i>
                      <small className="text-muted">Default Activity Image</small>
                    </div>
                  )}
                  
                  {/* الصورة */}
                  <img
                    src={activity.image}
                    alt={activity.caption}
                    className={`img-fluid w-100 h-100 ${activity.status === 'loading' ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                      transition: 'opacity 0.3s ease',
                      objectFit: 'cover'
                    }}
                    onLoad={() => handleImageLoad(activity.id)}
                    onError={() => handleImageError(activity.id)}
                    loading="lazy"
                  />
                  
                  {/* Badge لحالة الصورة */}
                  <div className="position-absolute top-2 end-2">
                    {activity.status === 'error' ? (
                      <span className="badge bg-danger">
                        <i className="fas fa-times me-1"></i>
                        Default
                      </span>
                    ) : activity.status === 'loading' ? (
                      <span className="badge bg-warning">
                        <i className="fas fa-spinner fa-spin me-1"></i>
                        Loading
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        <i className="fas fa-check me-1"></i>
                        Original
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="card-body text-center p-4">
                  <h6 className="card-title fw-semibold mb-2">
                    {activity.caption}
                  </h6>
                  <small className="text-muted d-block">
                    <a 
                      href={activity.image.startsWith('http') ? activity.image : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      onClick={(e) => {
                        if (!activity.image.startsWith('http')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <i className="fas fa-external-link-alt me-1"></i>
                      {activity.status === 'error' ? 'View Default Image' : 'View Full Image'}
                    </a>
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tips Section */}
      
      </div>
    </section>
  );
};