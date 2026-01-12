import { apiFetch } from './api';

export interface School {
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

export interface SchoolsResponse {
  data: School[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  result: string;
  message: string;
  status: number;
}

// 1. الحصول على كل المدارس
export async function getAllSchools(): Promise<SchoolsResponse> {
  return await apiFetch('/schools');
}

// 2. الحصول على مدرسة بواسطة slug
export async function getSchoolBySlug(slug: string): Promise<School | null> {
  try {
    const response = await getAllSchools();
    
    // البحث في الـ array عن المدرسة اللي عندها نفس الـ slug
    const school = response.data.find(s => s.slug === slug);
    
    return school || null;
  } catch (error) {
    console.error(`Error fetching school with slug "${slug}":`, error);
    return null;
  }
}

// 3. الحصول على slugs للمدارس
export async function getSchoolSlugs(): Promise<string[]> {
  const response = await getAllSchools();
  return response.data.map(school => school.slug);
}