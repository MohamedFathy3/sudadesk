// components/WhyChooseArea3.tsx
"use client";

interface WhyChooseArea3Props {
  title: string;
  description: string;
  className?: string;
}

export const WhyChooseArea3 = ({ 
  title, 
  description,
  className = ""
}: WhyChooseArea3Props) => {
  return (
    <section id="why-choose" className={`section-gap position-relative ${className}`}>
      <div className="container ed-container">
        <div className="row justify-content-center">
          {/* Text Content Only - Takes half width */}
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__content text-center">
              <div className="ed-section-head">
                {/* Optional Small Title - يمكن حذفه لو مش محتاج */}
                <span className="ed-section-head__sm-title text-primary">
                  WHY CHOOSE US
                </span>
                
                {/* Main Title */}
                <h3 className="ed-section-head__title ed-split-text left mt-3 mb-4">
                  {title}
                </h3>
                
                {/* Description */}
                <p className="ed-section-head__text lead text-gray-600">
                  {description}
                </p>
              </div>

              {/* Optional Divider */}
              <div className="mt-6 pt-4 border-top border-gray-200">
                {/* يمكن إضافة أي محتوى إضافي هنا إذا احتجت */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Background Elements - يمكن إزالتها */}
      <div className="position-absolute top-0 left-0 w-100 h-100 z-n1">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 w-100 h-100"></div>
      </div>
    </section>
  );
};