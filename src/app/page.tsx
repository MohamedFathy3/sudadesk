"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import CounterSection from '@/components/home/CounterSection';
import VideoSection from '@/components/home/VideoSection';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import ConfidenceSection from '@/components/home/ConfidenceSection';
import Textanmation from '@/components/home/textanmation';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/home/footer';

export default function Home() {


  return (
  
    <main className="min-h-screen bg-white">
            <Header />
      <HeroSection />
      <CounterSection />
      <VideoSection />
      <AdvantagesSection />
      <ConfidenceSection />
      <Textanmation />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      </main>
    
  );
}
