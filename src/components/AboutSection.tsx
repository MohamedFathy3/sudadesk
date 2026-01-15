// components/AboutSection.tsx
import React from 'react';

interface AboutData {
  about_us: string;
  history_vision_values: string;
  stages_and_activities: string;
}
  
interface AboutSectionProps {
  aboutData: AboutData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData }) => {
  // دالة لتحويل النص مع الـ \r\n إلى فقرات
  const renderFormattedText = (text: string) => {
    return text.split('\r\n').map((line, index) => {
      // تحقق إذا كان السطر يحتوي على أيقونة
      if (line.includes('icon-check-blue')) {
        const parts = line.split('icon-check-blue');
        return (
          <div key={index} className="flex items-start mb-2">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-2 text-gray-700">{parts[1]}</span>
          </div>
        );
      }
      
      // تحقق إذا كان السطر يحتوي على icon
      if (line.includes('icon')) {
        const parts = line.split('icon');
        return (
          <div key={index} className="flex items-start mb-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <span className="text-gray-800">{parts[1]}</span>
            </div>
          </div>
        );
      }
      
      // تحقق إذا كان العنوان الرئيسي
      if (line.toUpperCase() === line && line.length > 10) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4">{line}</h2>;
      }
      
      // تحقق إذا كان العنوان الفرعي
      if (line.length > 20 && line.length < 100) {
        return <h3 key={index} className="text-xl font-semibold text-gray-800 mb-3">{line}</h3>;
      }
      
      // النص العادي
      if (line.trim()) {
        return <p key={index} className="text-gray-600 mb-3">{line}</p>;
      }
      
      return <br key={index} />;
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our School</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          {/* About Us Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              {renderFormattedText(aboutData.about_us)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* History, Vision & Values */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
              <div className="space-y-4">
                {renderFormattedText(aboutData.history_vision_values)}
              </div>
            </div>
            
            {/* Stages & Activities */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements & Activities</h2>
              <div className="space-y-4">
                {renderFormattedText(aboutData.stages_and_activities)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;