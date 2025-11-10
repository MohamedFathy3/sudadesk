
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

interface AuthContextType {
  user: AuthUser | null;
  role: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string; remember?: boolean }) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
  hasRole: (requiredRole: string | string[]) => boolean;
}