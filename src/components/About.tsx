import Image from "next/image";
import Link from "next/link";
import Counter from "./Counter";

export const About1 = () => {
  const features: string[] = [
    "Our Expert Trainers",
    "Online Remote Learning",
    "Easy to follow curriculum",
    "Lifetime Access",
  ];
  return (
    <section className="ed-about section-gap position-relative">
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            {/* About Images  */}
            <div className="ed-about__images">
              <div className="ed-about__main-img">
                <Image
                  width={482}
                  height={486}
                  sizes="100vw"
                  style={{ width: "482px", height: "486px" }}
                  src="/assets/images/about/about-1/about-img.png"
                  alt="about-img"
                />
              </div>
              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">
                      <Counter end={9394} />
                    </span>
                    +
                  </h4>
                  <p>Enrolled Learners</p>
                </div>
              </div>
              <div className="ed-about__shapes">
                <Image
                  width={79}
                  height={49}
                  sizes="100vw"
                  style={{ width: "79px", height: "49px" }}
                  className="ed-about__shape-1"
                  src="/assets/images/about/about-1/shape-1.svg"
                  alt="shape-1"
                />
                <Image
                  width={135}
                  height={134}
                  sizes="100vw"
                  style={{ width: "135px", height: "134px" }}
                  className="ed-about__shape-2"
                  src="/assets/images/about/about-1/shape-2.svg"
                  alt="shape-2"
                />
                <Image
                  width={83}
                  height={74}
                  sizes="100vw"
                  style={{ width: "83px", height: "74px" }}
                  className="ed-about__shape-3 rotate-ani"
                  src="/assets/images/about/about-1/shape-3.svg"
                  alt="shape-3"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 order-class">
            {/* About Content  */}
            <div className="ed-about__content">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">
                  WELCOME TO EDUNA
                </span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Digital Online Academy: Your <br />
                  Path to Creative Excellence
                </h3>
                <p className="ed-section-head__text">
                  Excedteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit.
                </p>
              </div>
              <div className="ed-about__feature">
                <ul className="ed-about__features-list">
                  {features.map((feature, index) => (
                    <li key={index}>
                      <Image
                        width={18}
                        height={18}
                        sizes="100vw"
                        style={{ width: "18px", height: "18px" }}
                        src="/assets/images/icons/icon-check-blue.svg"
                        alt="icon-check-blue"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        width={133}
        height={154}
        sizes="100vw"
        style={{ width: "100", height: "auto" }}
        className="ed-about__shape-4"
        src="/assets/images/abstracts/abstract-element-regular.svg"
        alt="shape-4"
      />
    </section>
  );
};

export const About2 = () => {
  const features = [
    "Our Expert Trainers",
    "Online Remote Learning",
    "Easy to follow curriculum",
    "Lifetime Access",
  ];
  return (
    <section className="ed-about ed-about--style2 section-gap pt-0 position-relative">
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            {/* About Content  */}
            <div className="ed-about__content">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">
                  ABOUT OUR COURSES
                </span>
                <h3 className="ed-section-head__title ed-split-text right">
                  Digital Online Academy: Your <br />
                  Path to Creative Excellence
                </h3>
                <p className="ed-section-head__text">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit.
                </p>
              </div>
              <div className="ed-about__feature">
                <ul className="ed-about__features-list">
                  {features.map((feature, index) => (
                    <li key={index}>
                      <Image
                        width={18}
                        height={18}
                        sizes="100vw"
                        style={{ width: "18px", height: "18px" }}
                        src="/assets/images/icons/icon-check-blue.svg"
                        alt="icon-check-blue"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ed-about__btn">
                <Link href="/course-1" className="ed-btn">
                  Start Learning
                  <i className="fi fi-rr-arrow-small-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            {/* About Images  */}
            <div className="ed-about__images ed-about__images--style2">
              <div className="ed-about__main-img-style2">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="ed-about__main-img-1"
                  src="/assets/images/about/about-2/about-img-1.png"
                  alt="about-img-1"
                />
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="ed-about__main-img-2"
                  src="/assets/images/about/about-2/about-img-2.png"
                  alt="about-img-1"
                />
              </div>
              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">
                      <Counter end={9394} />
                    </span>
                    +
                  </h4>
                  <p>Enrolled Learners</p>
                </div>
              </div>
              <div className="ed-about__shapes">
                <Image
                  width={79}
                  height={49}
                  sizes="100vw"
                  style={{ width: "79px", height: "49px" }}
                  className="ed-about__shape-1"
                  src="/assets/images/about/about-2/shape-1.svg"
                  alt="shape-1"
                />
                <Image
                  width={135}
                  height={134}
                  sizes="100vw"
                  style={{ width: "135px", height: "134px" }}
                  className="ed-about__shape-2"
                  src="/assets/images/about/about-2/shape-2.svg"
                  alt="shape-2"
                />
                <Image
                  width={83}
                  height={74}
                  sizes="100vw"
                  style={{ width: "83px", height: "74px" }}
                  className="ed-about__shape-3 rotate-ani"
                  src="/assets/images/about/about-2/shape-3.svg"
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
