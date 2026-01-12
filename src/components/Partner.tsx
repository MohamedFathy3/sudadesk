"use client";
import { sliderProps } from "@/utilities/sliderProps";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const Partner1 = ({
  containerClass = "ed-partner section-gap",
}: {
  containerClass?: string;
}) => {
  const partners: { id: number; logo: string }[] = [
    { id: 1, logo: "1.svg" },
    { id: 2, logo: "2.svg" },
    { id: 3, logo: "3.svg" },
    { id: 4, logo: "4.svg" },
    { id: 5, logo: "5.svg" },
    { id: 6, logo: "6.svg" },
  ];
  return (
    <section className={containerClass}>
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-partner__section-head">
              <h3 className="ed-partner__section-head-title">
                Get in touch with the <span>250+</span> companies who
                Collaboration us
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="owl-carousel ed-partner__slider">
              <Swiper {...sliderProps.partner}>
                {partners.map((partner, index) => (
                  <SwiperSlide key={index}>
                    <a
                      href="#"
                      target="_blank"
                      className="ed-parnet__brand-logo"
                    >
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={`/assets/images/partner/partner-1/${partner.logo}`}
                        alt="brand-logo"
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Partner2 = ({
  containerClass = "ed-partner ed-partner--style2 section-gap pt-0",
}: {
  containerClass?: string;
}) => {
  const partners: { id: number; logo: string }[] = [
    { id: 1, logo: "1.svg" },
    { id: 2, logo: "2.svg" },
    { id: 3, logo: "3.svg" },
    { id: 4, logo: "4.svg" },
    { id: 5, logo: "5.svg" },
    { id: 6, logo: "6.svg" },
  ];
  return (
    <section className={containerClass}>
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-12">
            <div className="ed-section-head">
              <span className="ed-section-head__sm-title">OUR SPONSOR</span>
              <h3 className="ed-section-head__title m-0">
                Get in touch with the <br />
                <span> 250+ </span> companies who Collaboration us
              </h3>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="ed-partner__slider--style2">
              <Swiper
                {...sliderProps.partner__slider_2}
                className="swiper ed-partner__slider-2"
              >
                <div className="swiper-wrapper ease-linear">
                  {/* Single Slider  */}
                  {partners.map((partner, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <a
                        href="#"
                        target="_blank"
                        className="ed-parnet__brand-logo"
                      >
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          src={`/assets/images/partner/partner-1/${partner.logo}`}
                          alt="brand-logo"
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              <Swiper
                {...sliderProps.partner__slider_2_reverse}
                className="swiper ed-partner__slider-2-reverse"
              >
                <div className="swiper-wrapper ease-linear">
                  {/* Single Slider  */}
                  {partners.map((partner, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <a
                        href="#"
                        target="_blank"
                        className="ed-parnet__brand-logo"
                      >
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          src={`/assets/images/partner/partner-1/${partner.logo}`}
                          alt="brand-logo"
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
