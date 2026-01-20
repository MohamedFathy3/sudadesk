// components/SchoolContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import EdunaLayout from '@/layout/EdunaLayout';
import { Blog1 } from "@/components/Blog";
import { Category2 } from "@/components/Category";
import { ActivitiesGallery } from "@/components/Testimonial";
import { WhyChooseArea3 } from "@/components/WhyChooseArea";
import { apiFetch } from '@/lib/api';
import AboutSection from './AboutSection';

interface SchoolContentProps {
  slug: string;
}

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

interface School {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  active: boolean;
  logo: string;
  slider: {
    title: string;
    image: string;
  };
  about: {
    about_us: string;
    history_vision_values: string;
    stages_and_activities: string;
  };
  why_choose: {
    title: string;
    details: string;
  };
  activities_gallery: Array<{
    image: string;
    caption: string;
  }>;
  blog_content: Array<{
    title: string;
    text: string;
  }>;
  manager: {
    name: string | null;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  result: string;
  data: {
    school: School;
    employees: Employee[];
  };
  message: string;
  status: number;
}

const sections = [
    { id: "about", label: "About Us" },
  { id: "why-choose", label: "Why Choose Us" },
  { id: "Team", label: "Our Team" },
  // { id: "Activities", label: "Activities" },
  { id: "blog", label: "Blog" },
];

export default function SchoolContent({ slug }: SchoolContentProps) {
  const [school, setSchool] = useState<School | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSchoolWithEmployees() {
      try {
        setLoading(true);
        console.log(`📡 Fetching school with slug: ${slug}`);
        
        // ✅ استخدام الـ API الجديد الذي يجلب المدرسة مع الموظفين
        const response = await apiFetch(`/${slug}`) as ApiResponse;
        
        if (response.result === 'Success' && response.data) {
          setSchool(response.data.school);
          setEmployees(response.data.employees || []);
          setError(null);
        } else {
          throw new Error('Failed to fetch school data');
        }
      } catch (err) {
        console.error('Error fetching school:', err);
        // ✅ حاول استخدام الـ API القديم كبديل
        try {
          console.log('Trying old API...');
          const oldResponse = await apiFetch('/schools');
          
          if (oldResponse.result === 'Success' && oldResponse.data) {
            const foundSchool = oldResponse.data.find((s: School) => s.slug === slug);
            
            if (foundSchool) {
              setSchool(foundSchool);
              setEmployees([]); // لا يوجد موظفين في الـ API القديم
            } else {
              throw new Error(`School with slug "${slug}" not found`);
            }
          } else {
            throw new Error('No schools found');
          }
        } catch (fallbackErr) {
          setError(fallbackErr instanceof Error ? fallbackErr.message : 'Failed to load school');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolWithEmployees();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading school data...</p>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'School not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <EdunaLayout 
      header={4} 
      footer={2}
      sections={sections}
      logo={{
        src: school.logo,
        alt: school.name,
        width: 150,
        height: 40,
        href: `/${school.slug}`
      }}  
      showLoginButton={false}
      schoolData={school} 
    >
      {/* Hero Section */}
      <section id="hero">
        <HeroSection
          images={[school.slider.image]}
          title={school.slider.title}
          textAlign="bottom-left"
          fullHeight={false}
          customHeight="650px"
          autoSlide={false}
          containerClassName="rounded-b-xl overflow-hidden"
        />
      </section>
         <section id="about">
        <AboutSection aboutData={school.about} />
      </section>
      {/* Why Choose Us Section */}
      <section id="why-choose">
        <WhyChooseArea3 
          title={school.why_choose.title}
          description={school.why_choose.details}
        />
      </section>
      
      {/* Our Team Section - ✅ تمرير الموظفين مباشرة */}
      <section id="Team">
        <Category2 
          titleCenter={true}
          employees={employees} // ✅ تمرير الموظفين مباشرة من الـ API الجديد
        />
      </section>
   
      {/* Activities Section */}
      {/* <section id="Activities">
        <ActivitiesGallery 
          activities={school?.activities_gallery || []}
          title="Our School Activities"
          subtitle="Discover the vibrant activities and events at our school"
        />
      </section> */}
      
      {/* Blog Section */}
      <section id="blog">
        <Blog1 
          schoolId={school?.id} 
          useApi={true}
        />
      </section>
    </EdunaLayout>
  );
}