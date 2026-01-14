// components/Testimonial.tsx - نسخة أبسط
'use client';

import Image from "next/image";

interface ActivitiesGalleryProps {
  activities: Array<{
    image: string | null;
    caption: string;
  }>;
  title?: string;
  subtitle?: string;
}

export const ActivitiesGallery = ({ 
  activities, 
  title = "Our School Activities", 
  subtitle = "Discover the vibrant activities and events at our school"
}: ActivitiesGalleryProps) => {
  // تصفية الأنشطة اللي فيها صور فقط
  const activitiesWithImages = activities.filter(item => item.image);

  if (activitiesWithImages.length === 0) {
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
              <p className="text-muted">No activities available yet.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        
        <div className="row g-4">
          {activitiesWithImages.map((activity, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12">
              <div className="ed-testimonials__card h-100">
                <div className="ed-testimonials__img mb-3">
                  <Image
                    width={400}
                    height={250}
                    src={activity.image || "/assets/images/default-gallery.jpg"}
                    alt={activity.caption}
                    className="img-fluid rounded"
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/images/default-gallery.jpg";
                    }}
                  />
                </div>
                <div className="ed-testimonials__content text-center">
                  <p className="ed-testimonials__text fw-medium">
                    {activity.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};