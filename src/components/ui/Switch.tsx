"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const checked = language === "en";

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <SwitchPrimitives.Root
      checked={checked}
      onCheckedChange={toggleLanguage}
      className={`
        peer inline-flex h-6 w-12 cursor-pointer items-center rounded-full 
        border-2 border-transparent shadow-sm transition-colors 
        data-[state=checked]:bg-indigo-600 
        data-[state=unchecked]:bg-gray-300
      `}
    >
      <SwitchPrimitives.Thumb
        className={`
          block h-5 w-5 rounded-full bg-white shadow-md transition-transform
          ${language === "ar"
            ? "data-[state=unchecked]:translate-x-6 data-[state=checked]:translate-x-0" 
            : "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-6"
          }
        `}
      />
    </SwitchPrimitives.Root>
  );
};

export default LanguageSwitch;
