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
import { Course3 } from './Course';

interface SchoolContentProps {
  slug: string;
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

const sections = [
  { id: "why-choose", label: "Why Choose Us" },
  { id: "categories", label: "Categories" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
  { id: "Activities", label: "Activities" },
];

export default function SchoolContent({ slug }: SchoolContentProps) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSchool() {
      try {
        setLoading(true);
        console.log(`📡 Fetching school with slug: ${slug}`);
        
        // جلب كل المدارس
        const response = await apiFetch('/schools');
        
        if (!response.data || response.data.length === 0) {
          throw new Error('No schools found');
        }
        
        // البحث عن المدرسة بالـ slug
        const foundSchool = response.data.find((s: School) => s.slug === slug);
        
        if (!foundSchool) {
          throw new Error(`School with slug "${slug}" not found`);
        }
        
        setSchool(foundSchool);
        setError(null);
      } catch (err) {
        console.error('Error fetching school:', err);
        setError(err instanceof Error ? err.message : 'Failed to load school');
      } finally {
        setLoading(false);
      }
    }

    fetchSchool();
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
      showLoginButton={true}
      loginButton={{
        text: "Sign In",
        href: "/auth",
        className: "login-btn"
      }}
       schoolData={school} 
    >
      {/* Hero Section */}
      <section id="hero">
        <HeroSection
          images={[school.slider.image]}
          title={school.slider.title}
          subtitle={school.des}
          highlightText={school.name}
          primaryButton={{
            text: "Explore Courses",
            link: "#categories",
            variant: "primary",
          }}
          secondaryButton={{
            text: "Contact Us",
            link: `tel:${school.phone}`,
            variant: "outline"
          }}
          textAlign="center"
          fullHeight={true}
          autoSlide={false}
          overlayColor="from-blue-900/70 to-purple-900/50"
        />
      </section>
      
      {/* Why Choose Us Section */}
      <section id="why-choose">
        <WhyChooseArea3 
          title={school.why_choose.title}
          description={school.why_choose.details}
        />
      </section>
      
      {/* Categories Section */}
      <section id="categories">
        <Category2 />
      </section>
      <section id="Activities" >
      <Course3
        title="Popular Courses"
        subtitle="Explore our most popular courses"
        limit={6}
      />
      </section>
      {/* Testimonials Section */}
      <section id="testimonials">
  <ActivitiesGallery 
    activities={school.activities_gallery}
    title="Our School Activities"
    subtitle="Discover the vibrant activities and events at our school"
    autoPlay={true}
  />      </section>
      
      {/* Blog Section */}
      <section id="blog">
        {/* <Blog1 posts={school.blog_content} /> */}
      </section>
    </EdunaLayout>
  );
}