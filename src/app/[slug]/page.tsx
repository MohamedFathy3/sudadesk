import { Blog1 } from "@/components/Blog";
import { CallToAction2 } from "@/components/CallToAction";
import { Category2 } from "@/components/Category";
import Contact from "@/components/Contact";
import { Course5 } from "@/components/Course";
import { Features1 } from "@/components/Features";
import { Funfact2 } from "@/components/Funfact";
import { Partner1 } from "@/components/Partner";
import { Testimonial3 } from "@/components/Testimonial";
import { WhyChooseArea3, WhyChooseArea5 } from "@/components/WhyChooseArea";
import EdunaLayout from "@/layout/EdunaLayout";
import Link from "next/link";
const page = () => {
  return (
    <EdunaLayout header={3} footer={2}>
      <section className="ed-hero ed-hero--style3">
        <div className="owl-carousel ed-hero__slider">
          {/* Single Slider  */}
          <div className="ed-hero__slider-item">
            <img
              src="assets/images/hero/home-3/hero-img-1.jpg"
              alt="hero-img-1"
            />
          </div>
         
        </div>
        <div className="container ed-container-expand">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12">
              {/* Hero Content */}
              <div className="ed-hero__content text-center">
                <h1 className="ed-hero__content-title text-white ed-split-text left">
                  Start Your Learning <br />
                  Journey Now
                </h1>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseArea3 />
      <Category2 />
      <Features1 />
      <WhyChooseArea5 />
      <Testimonial3 />
      <Blog1 />
    </EdunaLayout>
  );
};
export default page;
