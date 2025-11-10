'use client';

import { createContext, useContext, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Ticket, Device } from '@/types/ticket';

export interface ExamResult {
  exam_id: number;
  exam_name: string;
  teacher_name: string;
  exam_date: string;
  student_mark: number;
  total_mark: number;
}

export interface ParentInfo {
  name: string;
  phone: string;
  job: string;
}

export interface AttendanceTotals {
  present: number;
  absent: number;
  leave: number;
  attendance_rate: string;
}

export interface AttendanceDays {
  [date: string]: 'present' | 'absent' | 'leave';
}

export interface AttendanceReport {
  days: AttendanceDays;
  totals: AttendanceTotals;
}

export interface SchoolInfo {
  name: string;
}

export interface ReceptionInfo {
  name: string;
  email: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  school_id: number | null;
  active: boolean;
  logo?: string | null;
  school?: SchoolInfo | null;
  created_at: string;
  updated_at: string;
  
  age?: number;
  classroom?: string;
  education_stage?: string;
  term?: string;
  previous_school?: string;
  exam_results?: ExamResult[];
  attendance_report?: {
    [key: string]: AttendanceReport;
  };
  father?: ParentInfo;
  mother?: ParentInfo;
  reception?: ReceptionInfo;
}


interface LoginResponse {
  result: string;
  message: string;
  status: boolean;
  token: string;
  role: string; // ده الـ role الأساسي بره data
  data: AuthUser;
  _token: string;
  _school_id: number | null;
}

interface AuthContextType {
  user: AuthUser | null;
  role: string | null; // الـ role الأساسي من البره
  loading: boolean;
  login: (credentials: { email: string; password: string; remember?: boolean }) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
  hasRole: (requiredRole: string | string[]) => boolean; // دالة للتحقق من الصلاحيات
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
  hasRole: () => false,
});

async function fetchUser(): Promise<{ user: AuthUser | null; role: string | null }> {
  try {
    const res = await apiFetch('/user/check-auth'); 
    return {
      user: res.data,
      role: res.role // نجيب الـ role من البره
    };
  } catch (error) {
    return { user: null, role: null };
  }
}

// دالة لقراءة الكوكيز
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
  
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: authData, isLoading } = useQuery<{ user: AuthUser | null; role: string | null }, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const fetchedData = await fetchUser();
      return fetchedData;
    },
    staleTime: 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string; remember?: boolean }) => {
      const res = await apiFetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }) as LoginResponse;
      return res;
    },
    onSuccess: async (data: LoginResponse) => {
      // الكوكيز بتكون محفوظة تلقائياً من الـ proxy
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    try {
      await loginMutation.mutateAsync(credentials);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/schools/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) 
      });
    } catch (error) {
      // optional error handling
    }

    // تنظيف الكوكيز
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'school_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    queryClient.removeQueries({ queryKey: ['user'] });
    window.location.href = '/auth';
  };

  const updateUser = (newUser: AuthUser) => {
    queryClient.setQueryData(['user'], { user: newUser, role: authData?.role || null });
  };

  // دالة للتحقق من الصلاحيات
  const hasRole = (requiredRole: string | string[]): boolean => {
    if (!authData?.role) return false;
    
    const userRole = authData.role;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    
    return userRole === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user: authData?.user ?? null,
        role: authData?.role ?? null,
        loading: isLoading,
        login,
        logout,
        updateUser,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}