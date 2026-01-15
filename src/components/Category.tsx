// components/Category2.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// تعريف interface للموظف
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  school_id: number;
  attendance_count: number;
  absent_count: number;
  last_salary: string | null;
}

interface Category2Props {
  titleCenter?: boolean;
  employees?: Employee[];
}

export const Category2 = ({
  titleCenter = true,
  employees: propEmployees = []
}: Category2Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // صور فريق من Unsplash - صور مجانية عالية الجودة
  const teamImages = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face", // مدرس 1
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=300&fit=crop&crop=face", // مدرس 2
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=300&fit=crop&crop=face", // مدير
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face", // محاسب
    "https://images.unsplash.com/photo-1551836026-d5c2e3145b7c?w=400&h=300&fit=crop&crop=face", // استقبال
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face", // مشرف
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face", // معلم
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face", // مدير قسم
  ];

  // أيقونات من Flaticon أو FontAwesome (بدائل مجانية)
  const roleIcons: Record<string, string> = {
    teacher: "/assets/images/category/category-1/3.svg",
    reception: "/assets/images/category/category-1/1.svg",
    class_supervisor: "/assets/images/category/category-1/7.svg",
    director: "/assets/images/category/category-1/4.svg",
    accountant: "/assets/images/category/category-1/5.svg",
  };

  // ترجمة الأدوار إلى الإنجليزية
  const roleTranslations: Record<string, string> = {
    teacher: "Teacher",
    reception: "Receptionist",
    class_supervisor: "Class Supervisor",
    director: "Director",
    accountant: "Accountant",
  };

  useEffect(() => {
    if (propEmployees && propEmployees.length > 0) {
      setEmployees(propEmployees);
    } else {
      setEmployees([]);
    }
  }, [propEmployees]);

  // الحصول على صورة من Unsplash حسب ID الموظف
  const getTeamImage = (id: number) => {
    return teamImages[(id - 1) % teamImages.length];
  };

  // الحصول على أيقونة الدور
  const getRoleIcon = (role: string) => {
    return roleIcons[role] || "/assets/images/category/category-1/1.svg";
  };

  // ترجمة الدور
  const translateRole = (role: string) => {
    return roleTranslations[role] || role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (employees.length === 0) {
    return (
      <section className="ed-category ed-category--style2 section-gap overflow-hidden">
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <div className={`ed-section-head ${titleCenter ? "text-center" : "text-left"}`}>
                <span className="ed-section-head__sm-title">OUR TEAM</span>
                <h3 className="ed-section-head__title m-0 ed-split-text left">
                  Meet Our Professional Team
                </h3>
                <p className="text-muted mt-3 text-center">
                  No team members available at the moment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ed-category ed-category--style2 mt-3 overflow-hidden">
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className={`ed-section-head ${titleCenter ? "text-center" : "text-left"}`}>
              <span className="ed-section-head__sm-title">OUR TEAM</span>
              <h3 className="ed-section-head__title m-0 ed-split-text left">
                Meet Our Professional Team
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.team-pagination',
            }}
            navigation={{
              nextEl: '.team-next',
              prevEl: '.team-prev',
            }}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="team-slider"
          >
            {employees.map((employee) => (
              <SwiperSlide key={employee.id}>
                <div className="team-card">
                  <div className="team-image">
                    <img
                      src={getTeamImage(employee.id)}
                      alt={`${employee.name} - ${translateRole(employee.role)}`}
                      className="team-img"
                      onError={(e) => {
                        // Fallback to placeholder if image fails
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=4F46E5&color=fff&size=200`;
                      }}
                    />
                    <div className="team-role-badge">
                      {translateRole(employee.role)}
                    </div>
                  </div>
                  <div className="team-content">
                    
                    <div className="team-info">
                      <h4 className="team-name">{employee.name}</h4>
                      <div className="team-contact">
                        <p className="team-email">
                          <i className="fi fi-rr-envelope me-2"></i>
                          {employee.email}
                        </p>
                    
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

   
        </div>
      </div>

      <style jsx>{`
        .team-slider {
          padding: 20px 10px 50px;
        }
        
        .team-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        .team-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .team-role-badge {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }
        
        .team-content {
          padding: 20px;
        }
        
        .team-icon {
          margin-bottom: 15px;
        }
        
        .role-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        
        .team-name {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }
        
        .team-contact {
          margin-bottom: 15px;
        }
        
        .team-email, .team-phone {
          font-size: 13px;
          color: #666;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }
        
        .team-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-label {
          display: block;
          font-size: 11px;
          color: #888;
          margin-bottom: 3px;
        }
        
        .stat-value {
          display: block;
          font-size: 16px;
          font-weight: 700;
        }
        
        .stat-value.success {
          color: #10b981;
        }
        
        .stat-value.warning {
          color: #f59e0b;
        }
        
        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        
        .slider-nav-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .slider-nav-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .team-pagination {
          position: static !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        
        .team-pagination :global(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          background: #ddd;
          opacity: 1;
        }
        
        .team-pagination :global(.swiper-pagination-bullet-active) {
          background: #667eea;
          width: 20px;
          border-radius: 10px;
        }
        
        @media (max-width: 768px) {
          .team-slider {
            padding: 10px 5px 40px;
          }
          
          .team-image {
            height: 180px;
          }
          
          .team-content {
            padding: 15px;
          }
          
          .team-name {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Category2;