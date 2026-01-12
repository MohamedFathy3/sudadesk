"use client";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => {};
  }, []);
  if (!loader) return null;
  return (
    <div id="preloader">
      <div id="ed-preloader" className="ed-preloader">
        <div className="animation-preloader">
          <div className="spinner" />
        </div>
      </div>
    </div>
  );
};
export default Preloader;
