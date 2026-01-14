// @/layout/EdunaLayout.tsx
"use client";
import ImageView from "@/components/ImageView";
import VideoPopup from "@/components/VideoPopup";
import { Fragment, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

// تعريف واجهة بيانات المدرسة
interface School {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  logo: string;
  manager: {
    name: string | null;
    email: string;
  };
}

// تعريف واجهة الـ Sections
interface Section {
  id: string;
  label: string;
}

const EdunaLayout = ({
  children,
  header,
  footer,
  sections = [],
  logo,
  showLoginButton,
  loginButton,
  schoolData // إضافة خاصية جديدة للمدرسة
}: {
  children: React.ReactNode;
  header?: number | 1;
  footer?: number | 1;
  sections?: Section[];
  logo?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    href?: string;
  };
  showLoginButton?: boolean;
  loginButton?: {
    text?: string;
    href?: string;
    className?: string;
  };
  schoolData?: School; // بيانات المدرسة
}) => {
  useEffect(() => {
  }, []);

  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      <Header 
        header={header ?? 1} 
        sections={sections} 
        logo={logo}
        showLoginButton={showLoginButton}
        loginButton={loginButton}  
      />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <Footer footer={footer ?? 1} schoolData={schoolData} sections={sections} />
        </div>
      </div>
    </Fragment>
  );
};

export default EdunaLayout;