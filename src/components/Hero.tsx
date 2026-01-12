import Image from "next/image";
import Link from "next/link";

export const Hero1 = () => {
  return (
    <div
      className="section-bg hero-bg background-image"
      style={{
        backgroundImage: 'url("/assets/images/hero/home-1/hero-bg.png")',
      }}
    >
      {/* Start Hero Area */}
      <section className="ed-hero">
        <div className="container ed-container-expand">
          {/* Hero Element Shape */}
          <div className="ed-hero__elements">
            <Image
              width={46}
              height={32}
              sizes="46px"
              style={{ width: "46px", height: "32px" }}
              className="element-move ed-hero__shape-1"
              src="/assets/images/hero/home-1/shape-1.svg"
              alt="shape-1"
            />
            <Image
              width={49}
              height={79}
              sizes="49px"
              style={{ width: "49px", height: "79px" }}
              className="element-move ed-hero__shape-2"
              src="/assets/images/hero/home-1/shape-2.svg"
              alt="shape-1"
            />
            <Image
              width={49}
              height={94}
              sizes="49px"
              style={{ width: "49px", height: "94px" }}
              className="element-move ed-hero__shape-3"
              src="/assets/images/hero/home-1/shape-3.svg"
              alt="shape-1"
            />
            <Image
              width={49}
              height={94}
              sizes="49px"
              style={{ width: "49px", height: "94px" }}
              className="element-move ed-hero__shape-4"
              src="/assets/images/hero/home-1/shape-4.svg"
              alt="shape-1"
            />
            <Image
              width={70}
              height={55}
              sizes="70px"
              style={{ width: "70px", height: "55px", objectFit: "cover" }}
              className="element-move ed-hero__shape-5"
              src="/assets/images/hero/home-1/shape-5.png"
              alt="shape-5"
            />
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-12">
              {/* Hero Content */}
              <div className="ed-hero__content">
                <h1 className="ed-hero__content-title ed-split-text left">
                  Best <span>Online</span> Platform to Learn Everything
                </h1>
                <p className="ed-hero__content-text">
                  Excedteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit.
                </p>
                <div className="ed-hero__btn">
                  <Link href="/course-1" className="ed-btn">
                    Find Courses
                    <i className="fi fi-rr-arrow-small-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              {/* Hero Image */}
              <div className="ed-hero__image">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  src="/assets/images/hero/home-1/hero-img.png"
                  alt="hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero Area */}
    </div>
  );
};

export const Hero2 = () => {
  return (
    <div
      className="section-bg hero-bg-2 background-image"
      style={{ backgroundImage: 'url("/assets/images/section-bg-4.png")' }}
    >
      <section className="ed-hero ed-hero--style2">
        <div className="container ed-container-expand position-relative">
          <div className="ed-hero__bg--style2">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              src="/assets/images/hero/home-2/hero-bg.jpg"
              alt="hero-bg-img"
            />
          </div>
          <div className="row">
            <div className="col-lg-7 col-12">
              {/* Hero Content */}
              <div className="ed-hero__content">
                <span className="ed-hero__content-sm-title">
                  WELCOME TO EDUNA
                </span>
                <h1 className="ed-hero__content-title text-white ed-split-text left">
                  Learn Everything <br />
                  What You Want with Eduna Courses
                </h1>
                <div className="ed-hero__search">
                  <form
                    action="#"
                    method="post"
                    className="ed-hero__search-form"
                  >
                    <input
                      type="search"
                      name="search"
                      placeholder="Search your courses"
                      required
                    />
                    <button type="submit">
                      Search
                      <i className="fi-rr-search" />
                    </button>
                  </form>
                  <ul className="ed-hero__tags">
                    <li>
                      <Link href="/course-1">Business</Link>
                    </li>
                    <li>
                      <Link href="/course-1">Marketing</Link>
                    </li>
                    <li>
                      <Link href="/course-1">Design</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div className="ed-hero__images--style2">
                <div
                  className="ed-course__card wow fadeInUp"
                  data-wow-duration="1s"
                >
                  <Link href="/course-details" className="ed-course__img">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                      src="/assets/images/course/course-1/1.png"
                      alt="course-img"
                    />
                  </Link>
                  <Link
                    href="/course-1"
                    className="ed-course__tag bg-primary-color text-white"
                  >
                    Best Seller
                  </Link>
                  <div className="ed-course__body">
                    <div className="ed-course__lesson">
                      <div className="ed-course__part">
                        <i className="fi-rr-book" />
                        <p>04 Lessons</p>
                      </div>
                      <div className="ed-course__teacher">
                        <i className="fi-rr-user" />
                        <p>John Smith</p>
                      </div>
                    </div>
                    <Link href="/course-details" className="ed-course__title">
                      <h5>
                        Data Competitive Strategy law and Organization Course
                      </h5>
                    </Link>
                    <div className="ed-course__rattings">
                      <ul>
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
                        <li>
                          <span>(09 Reviews)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="ed-course__bottom">
                      <span className="ed-course__price">$383.00</span>
                      <div className="ed-course__students">
                        <i className="fi fi-rr-graduation-cap" />
                        <p>553 Students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
