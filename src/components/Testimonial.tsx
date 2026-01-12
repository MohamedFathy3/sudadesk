"use client";
import { sliderProps } from "@/utilities/sliderProps";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Counter from "./Counter";
export const Testimonial1 = () => {
  return (
    <section className="ed-testimonial section-bg-color-1 section-gap">
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            {/* Testimonial Content  */}
            <div className="ed-testimonial__content">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">
                  OUR TESTIMONIAL
                </span>
                <h3 className="ed-section-head__title ed-split-text left">
                  What Student Say About Our Online Education Course
                </h3>
              </div>
              <div className="owl-carousel ed-testimonial__slider">
                <Swiper {...sliderProps.testimonial}>
                  {/* Single Testimonial  */}
                  <SwiperSlide>
                    <div className="ed-testimonial__slider-item">
                      <ul className="ed-testimonial__rattings">
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                      </ul>
                      <p className="ed-testimonial__text">
                        “ Attending EduVibe School of Business was one of the
                        best decisions I've ever made. The curriculum was
                        practical and industry-focused, and I was able to apply
                        what I learned in the classroom.”
                      </p>
                      <div className="ed-testimonial__author">
                        <div className="ed-testimonial__author-img">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src="/assets/images/testimonial/testimonial-1/author-1.png"
                            alt="author-img"
                          />
                        </div>
                        <div className="ed-testimonial__author-info">
                          <h5>John Smith</h5>
                          <p>Science Student</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* Single Testimonial  */}
                    <div className="ed-testimonial__slider-item">
                      <ul className="ed-testimonial__rattings">
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                      </ul>
                      <p className="ed-testimonial__text">
                        “ Attending EduVibe School of Business was one of the
                        best decisions I've ever made. The curriculum was
                        practical and industry-focused, and I was able to apply
                        what I learned in the classroom.”
                      </p>
                      <div className="ed-testimonial__author">
                        <div className="ed-testimonial__author-img">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src="/assets/images/testimonial/testimonial-1/author-1.png"
                            alt="author-img"
                          />
                        </div>
                        <div className="ed-testimonial__author-info">
                          <h5>John Smith</h5>
                          <p>Science Student</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="owl-nav">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev"
                    >
                      <i className="fi fi-rs-arrow-left" />
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      className="owl-next"
                    >
                      <i className="fi fi-rs-arrow-right" />
                    </button>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            {/* Testimonial Images */}
            <div className="ed-testimonial__images position-relative">
              <div className="ed-testimonial__main-img">
                <Image
                  width={437}
                  height={520}
                  src="/assets/images/testimonial/testimonial-1/testimonial-img.png"
                  alt="testimonial-img"
                />
              </div>
              {/* Counter Card */}
              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">
                      <Counter end={667} />
                    </span>
                    K+
                  </h4>
                  <p>Satisfied Students</p>
                </div>
              </div>
              {/* Testimonial Shapes */}
              <div className="ed-testimonial__shapes">
                <Image
                  width={177}
                  height={176}
                  className="ed-testimonial__shape-1"
                  src="/assets/images/testimonial/testimonial-1/shape-1.svg"
                  alt="shape-1"
                />
                <Image
                  width={79}
                  height={49}
                  className="ed-testimonial__shape-2"
                  src="/assets/images/testimonial/testimonial-1/shape-2.svg"
                  alt="shape-2"
                />
                <Image
                  width={112}
                  height={107}
                  className="ed-testimonial__shape-3 rotate-ani"
                  src="/assets/images/testimonial/testimonial-1/shape-3.svg"
                  alt="shape-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Testimonial2 = () => {
  return (
    <section className="ed-testimonial ed-testimonial--style2 section-gap pt-0">
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-12">
            {/* Testimonial Content  */}
            <div className="ed-testimonial__content ed-testimonial__content--style2">
              <div className="ed-testimonial__slider">
                <Swiper {...sliderProps.testimonial}>
                  <SwiperSlide>
                    {/* Single Testimonial  */}
                    <div className="ed-testimonial__slider-item">
                      <ul className="ed-testimonial__rattings">
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                      </ul>
                      <p className="ed-testimonial__text">
                        “ Attending EduVibe School of Business was one of the
                        best decisions I've ever made. The curriculum was
                        practical and industry-focused, and I was able to apply
                        what I learned in the classroom.”
                      </p>
                      <div className="ed-testimonial__author">
                        <div className="ed-testimonial__author-img">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src="/assets/images/testimonial/testimonial-1/author-1.png"
                            alt="author-img"
                          />
                        </div>
                        <div className="ed-testimonial__author-info">
                          <h5>John Smith</h5>
                          <p>Science Student</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* Single Testimonial  */}
                    <div className="ed-testimonial__slider-item">
                      <ul className="ed-testimonial__rattings">
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                      </ul>
                      <p className="ed-testimonial__text">
                        “ Attending EduVibe School of Business was one of the
                        best decisions I've ever made. The curriculum was
                        practical and industry-focused, and I was able to apply
                        what I learned in the classroom.”
                      </p>
                      <div className="ed-testimonial__author">
                        <div className="ed-testimonial__author-img">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            src="/assets/images/testimonial/testimonial-1/author-1.png"
                            alt="author-img"
                          />
                        </div>
                        <div className="ed-testimonial__author-info">
                          <h5>John Smith</h5>
                          <p>Science Student</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="owl-nav">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev"
                    >
                      <i className="fi fi-rs-arrow-left" />
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      className="owl-next"
                    >
                      <i className="fi fi-rs-arrow-right" />
                    </button>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Testimonial3 = () => {
  return (
    <section className="ed-testimonial ed-testimonial--style3 section-gap pt-0 overflow-hidden">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">OUR TESTIMONIAL</span>
              <h3 className="ed-section-head__title ed-split-text left">
                Student Thinking About Us
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Swiper
            {...sliderProps.testimonial_2}
            className="swiper ed-testimonial__slider-2"
          >
            <div className="swiper-wrapper">
              {/* Single Testimonial  */}
              <SwiperSlide className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-color-1">
                  <ul className="ed-testimonial__rattings">
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                  </ul>
                  <p className="ed-testimonial__text">
                    “ Attending EduVibe School of Business was one of the best
                    decisions I've ever made. The curriculum was practical and
                    industry-focused, and I was able to apply what I learned in
                    the classroom.”
                  </p>
                  <div className="ed-testimonial__author">
                    <div className="ed-testimonial__author-img">
                      <img
                        src="assets/images/testimonial/testimonial-1/author-1.png"
                        alt="author-img"
                      />
                    </div>
                    <div className="ed-testimonial__author-info">
                      <h5>John Smith</h5>
                      <p>Science Student</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* Single Testimonial  */}
              <SwiperSlide className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-color-2">
                  <ul className="ed-testimonial__rattings">
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                  </ul>
                  <p className="ed-testimonial__text">
                    “ Attending EduVibe School of Business was one of the best
                    decisions I've ever made. The curriculum was practical and
                    industry-focused, and I was able to apply what I learned in
                    the classroom.”
                  </p>
                  <div className="ed-testimonial__author">
                    <div className="ed-testimonial__author-img">
                      <img
                        src="assets/images/testimonial/testimonial-1/author-2.png"
                        alt="author-img"
                      />
                    </div>
                    <div className="ed-testimonial__author-info">
                      <h5>Franklin Chen</h5>
                      <p>Art Student</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* Single Testimonial  */}
              <SwiperSlide className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-color-3">
                  <ul className="ed-testimonial__rattings">
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                  </ul>
                  <p className="ed-testimonial__text">
                    “ Attending EduVibe School of Business was one of the best
                    decisions I've ever made. The curriculum was practical and
                    industry-focused, and I was able to apply what I learned in
                    the classroom.”
                  </p>
                  <div className="ed-testimonial__author">
                    <div className="ed-testimonial__author-img">
                      <img
                        src="assets/images/testimonial/testimonial-1/author-3.png"
                        alt="author-img"
                      />
                    </div>
                    <div className="ed-testimonial__author-info">
                      <h5>James Parker</h5>
                      <p>Math Student</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* Single Testimonial  */}
              <SwiperSlide className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-color-4">
                  <ul className="ed-testimonial__rattings">
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                  </ul>
                  <p className="ed-testimonial__text">
                    “ Attending EduVibe School of Business was one of the best
                    decisions I've ever made. The curriculum was practical and
                    industry-focused, and I was able to apply what I learned in
                    the classroom.”
                  </p>
                  <div className="ed-testimonial__author">
                    <div className="ed-testimonial__author-img">
                      <img
                        src="assets/images/testimonial/testimonial-1/author-4.png"
                        alt="author-img"
                      />
                    </div>
                    <div className="ed-testimonial__author-info">
                      <h5>Charles Morgan</h5>
                      <p>Globe Student</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* Single Testimonial  */}
              <SwiperSlide className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-color-2">
                  <ul className="ed-testimonial__rattings">
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                    <li>
                      <i className="icofont-star" />
                    </li>
                  </ul>
                  <p className="ed-testimonial__text">
                    “ Attending EduVibe School of Business was one of the best
                    decisions I've ever made. The curriculum was practical and
                    industry-focused, and I was able to apply what I learned in
                    the classroom.”
                  </p>
                  <div className="ed-testimonial__author">
                    <div className="ed-testimonial__author-img">
                      <img
                        src="assets/images/testimonial/testimonial-1/author-2.png"
                        alt="author-img"
                      />
                    </div>
                    <div className="ed-testimonial__author-info">
                      <h5>Franklin Chen</h5>
                      <p>Art Student</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
            <div className="swiper-pagination" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};
