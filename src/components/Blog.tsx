// components/Blog1.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from '@/lib/api';

interface BlogPost {
  id?: number;
  title: string;
  text: string;
  created_at?: string;
  image?: string;
}

interface SchoolData {
  id: number;
  blog_content: BlogPost[];
}

interface ApiResponse {
  result: string;
  data: SchoolData[];
}

interface Blog1Props {
  pt?: string;
  schoolId?: number;
  useApi?: boolean;
  customBlogs?: Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    comments: number;
    image: string;
  }>;
}

export const Blog1 = ({ pt = "", schoolId, useApi = true, customBlogs }: Blog1Props) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // كلمات رئيسية للعناوين (مثال)
  const keywords = ["Education", "Learning", "School", "Students", "Teaching", "Curriculum", "Development", "Activities", "Programs"];

  useEffect(() => {
    if (useApi && schoolId) {
      fetchSchoolBlogs();
    } else if (!customBlogs) {
      // استخدام بيانات افتراضية للتجربة
      setBlogs([
        {
          id: 1,
          title: "Education",
          text: "Discover the latest teaching methods and educational techniques that are transforming modern classrooms.",
          created_at: "2024-05-09",
        },
        {
          id: 2,
          title: "Learning",
          text: "Explore innovative learning approaches that help students achieve better results and develop critical thinking skills.",
          created_at: "2024-01-09",
        },
        {
          id: 3,
          title: "Development",
          text: "Learn about our comprehensive development programs designed to enhance both academic and personal growth.",
          created_at: "2024-06-03",
        },
      ]);
      setLoading(false);
    }
  }, [schoolId, useApi, customBlogs]);

  const fetchSchoolBlogs = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/schools`) as ApiResponse;
      
      if (response.result === 'Success' && response.data) {
        // البحث عن المدرسة بالـ ID
        const school = response.data.find((s: SchoolData) => s.id === schoolId);
        
        if (school && school.blog_content) {
          setBlogs(school.blog_content);
        } else {
          setError('School not found or no blog content available');
        }
      } else {
        setError('Failed to fetch blog data');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Error loading blog posts');
    } finally {
      setLoading(false);
    }
  };

  // دالة لتحويل التاريخ
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // دالة لإنشاء فقرة تحت العنوان
  const generateParagraph = (title: string, text: string) => {
    // إذا كان النص الموجود كافي، استخدمه
    if (text && text.length > 20) {
      return text;
    }
    
    // وإلا أنشئ فقرة بناءً على العنوان
    const paragraphs: Record<string, string> = {
      "Education": "Explore the latest trends in modern education and discover how innovative teaching methods are transforming learning experiences for students of all ages.",
      "Learning": "Discover effective learning strategies that enhance student engagement and academic performance through interactive and personalized approaches.",
      "School": "Learn about our comprehensive school programs designed to provide a balanced education that nurtures both academic excellence and personal growth.",
      "Students": "See how our student-centered approach helps young learners develop essential skills for success in both academic and personal life.",
      "Teaching": "Explore modern teaching techniques that educators use to create dynamic and effective classroom environments for optimal learning outcomes.",
      "Curriculum": "Discover our well-structured curriculum designed to meet international standards while addressing the unique needs of every student.",
      "Development": "Learn about holistic development programs that focus on academic, social, and emotional growth for comprehensive student development.",
      "Activities": "Explore our diverse extracurricular activities that complement academic learning and help students discover their passions and talents.",
      "Programs": "Discover specialized educational programs designed to provide students with unique learning opportunities and skill development.",
      "blog_content": "Read our latest educational insights and updates about school programs, teaching methods, and student achievements in our learning community."
    };
    
    // البحث عن الفقرة المناسبة
    for (const [key, paragraph] of Object.entries(paragraphs)) {
      if (title.toLowerCase().includes(key.toLowerCase())) {
        return paragraph;
      }
    }
    
    // إذا لم نجد تطابق، أنشئ فقرة عامة
    return "Discover valuable insights and updates about our educational programs, teaching methods, and student success stories. Stay informed about the latest developments in our learning community.";
  };

  // دالة للحصول على كلمة رئيسية من العنوان
  const getKeywordFromTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    
    // إذا لم نجد تطابق، ارجع كلمة من القائمة
    return keywords[Math.floor(Math.random() * keywords.length)];
  };

  // دالة لتقصير الفقرة إذا كانت طويلة جداً
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    
    // ابحث عن أقرب مسافة بعد maxLength
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  if (loading) {
    return (
      <section className={`ed-blog section-gap ${pt}`}>
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="ed-section-head text-center">
                <span className="ed-section-head__sm-title">OUR NEWS & BLOG</span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Latest Educational Insights
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            {[1, 2, 3].map((item) => (
              <div className="col-lg-4 col-md-6 col-12" key={item}>
                <div className="ed-blog__card">
                  <div className="ed-blog__content">
                    <div className="skeleton-text" style={{ width: '80px', height: '20px', marginBottom: '10px' }}></div>
                    <div className="skeleton-text" style={{ width: '100%', height: '24px', marginBottom: '15px' }}></div>
                    <div className="skeleton-text" style={{ width: '100%', height: '60px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`ed-blog section-gap ${pt}`}>
        <div className="container ed-container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="ed-section-head text-center">
                <span className="ed-section-head__sm-title">OUR NEWS & BLOG</span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Latest Educational Insights
                </h3>
                <p className="text-danger mt-2">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`ed-blog section-gap ${pt}`}>
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">OUR NEWS & BLOG</span>
              <h3 className="ed-section-head__title ed-split-text left">
                Latest Educational Insights
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              const keyword = getKeywordFromTitle(blog.title);
              const paragraph = generateParagraph(blog.title, blog.text);
              const truncatedParagraph = truncateText(paragraph, 120);
              
              return (
                <div className="col-lg-4 col-md-6 col-12 mt-4" key={blog.id || index}>
                  <div
                    className="ed-blog__card wow fadeInUp blog-card-enhanced"
                    data-wow-duration="1s"
                  >
                    <div className="ed-blog__content">
                      
                      
                      <Link href="" className="ed-blog__title">
                        <h4 className="blog-title-enhanced">{blog.title}</h4>
                      </Link>
                      
                      <p className="ed-blog__text blog-paragraph">
                        {truncatedParagraph}
                      </p>
                      
                   
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <div className="empty-blog-state">
                <i className="fi fi-rr-document mb-3" style={{ fontSize: "3rem", color: "#ccc" }}></i>
                <h5 className="text-muted">No Blog Posts Yet</h5>
                <p className="text-muted">Educational insights and updates will appear here soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .blog-card-enhanced {
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          padding: 25px;
          height: 100%;
          border: 1px solid #f0f0f0;
        }
        
        .blog-card-enhanced:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          border-color: #667eea;
        }
        
        .blog-keyword-tag {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .blog-title-enhanced {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        
        .blog-card-enhanced:hover .blog-title-enhanced {
          color: #667eea;
        }
        
        .blog-paragraph {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 15px;
        }
        
        .blog-meta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .blog-date {
          font-size: 13px;
          color: #888;
          display: flex;
          align-items: center;
        }
        
        .blog-read-more {
          font-size: 14px;
          font-weight: 600;
          color: #667eea;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .blog-read-more:hover {
          color: #764ba2;
          transform: translateX(3px);
        }
        
        .empty-blog-state {
          padding: 40px 0;
        }
        
        @media (max-width: 768px) {
          .blog-card-enhanced {
            padding: 20px;
          }
          
          .blog-title-enhanced {
            font-size: 18px;
          }
          
          .blog-paragraph {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};