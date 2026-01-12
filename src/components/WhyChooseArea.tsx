import Image from "next/image";
import Counter from "./Counter";

export const WhyChooseArea1 = () => {
  const whyChoose: {
    id: number;
    name: string;
    icon: string;
    bg: string;
    description: string;
  }[] = [
    {
      id: 1,
      name: "Face-to-face Teaching",
      icon: "/assets/images/why-choose/why-choose-1/icon-1.svg",
      bg: "bg-1",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.",
    },
    {
      id: 2,
      name: "24/7 Support Available",
      icon: "/assets/images/why-choose/why-choose-1/icon-2.svg",
      bg: "bg-2",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.",
    },
  ];
  return (
    <section className="ed-why-choose section-gap background-image position-relative section-bg-2">
      <Image
        width={49}
        height={80}
        className="ed-w-choose__pattern-1"
        src="/assets/images/why-choose/why-choose-1/pattern-1.svg"
        alt="pattern-1"
      />
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__content">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">WHY CHOOSE US</span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Transform Your Best Practice <br />
                  with Our Online Course
                </h3>
                <p className="ed-section-head__text">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit. Excepteur sint occaecat.
                </p>
              </div>
              <div className="ed-w-choose__info">
                {/* Single Info  */}
                {whyChoose.map((why, index) => (
                  <div className="ed-w-choose__info-single" key={index}>
                    <div className="ed-w-choose__info-head">
                      <div className={`ed-w-choose__info-icon ${why.bg}`}>
                        <Image
                          width={25}
                          height={25}
                          src={why.icon}
                          alt="icon"
                        />
                      </div>
                      <h5>{why.name}</h5>
                    </div>
                    <div className="ed-w-choose__info-bottom">
                      <p>{why.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__images position-relative">
              {/* Why Choose Image  */}
              <div className="ed-w-choose__main-img">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src="/assets/images/why-choose/why-choose-1/why-choose-img.png"
                  alt="why-choose-img"
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
                      <Counter end={69} />
                    </span>
                    K+
                  </h4>
                  <p>Satisfied Students</p>
                </div>
              </div>
              {/* Shapes Elements */}
              <div className="ed-w-choose__shapes">
                <Image
                  width={70}
                  height={55}
                  className="ed-w-choose__shape-1 rotate-ani"
                  src="/assets/images/why-choose/why-choose-1/shape-1.svg"
                  alt="shape-1"
                />
                <Image
                  width={70}
                  height={50}
                  className="ed-w-choose__shape-2"
                  src="/assets/images/why-choose/why-choose-1/pattern-2.svg"
                  alt="pattern-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const WhyChooseArea2 = () => {
  const whyChoose: {
    id: number;
    name: string;
    icon: string;
    bg: string;
    description: string;
  }[] = [
    {
      id: 1,
      name: "Online Teaching",
      icon: "/assets/images/why-choose/why-choose-1/icon-1.svg",
      bg: "bg-1",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.",
    },
    {
      id: 2,
      name: "24/7 Support",
      icon: "/assets/images/why-choose/why-choose-1/icon-2.svg",
      bg: "bg-2",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.",
    },
    {
      id: 3,
      name: "Award Wining",
      icon: "/assets/images/why-choose/why-choose-1/icon-3.svg",
      bg: "bg-3",
      description:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia for this is a for that an deserunt mollit.",
    },
  ];
  return (
    <section className="ed-why-choose ed-why-choose--style2 section-gap position-relative">
      <div className="container ed-container position-relative">
        <div className="ed-w-choose__content">
          <div className="row g-0">
            <div className="col-lg-6 col-12">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">WHY CHOOSE US</span>
                <h3 className="ed-section-head__title ed-split-text right">
                  Transform Your Best Practice <br />
                  with Our Online Course
                </h3>
                <p className="ed-section-head__text">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit. Excepteur sint occaecat.
                </p>
              </div>
            </div>
          </div>
          <div className="ed-w-choose__info">
            {/* Single Info  */}
            {whyChoose.map((why, index) => (
              <div
                className="ed-w-choose__info-single ed-w-choose__info-single--style2 wow fadeInUp"
                data-wow-duration="1s"
                key={index}
              >
                <div className="ed-w-choose__info-head">
                  <div className={`ed-w-choose__info-icon ${why.bg}`}>
                    <Image width={25} height={25} src={why.icon} alt="icon" />
                  </div>
                  <h5>{why.name}</h5>
                </div>
                <div className="ed-w-choose__info-bottom">
                  <p>{why.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ed-w-choose__images ed-w-choose__images--style2">
          {/* Why Choose Image  */}
          <div className="ed-w-choose__main-img">
            <Image
              width={484}
              height={520}
              src="/assets/images/why-choose/why-choose-2/why-choose-img.png"
              alt="why-choose-img"
            />
          </div>
          {/* Shapes Elements */}
          <div className="ed-w-choose__shapes">
            <Image
              width={49}
              height={94}
              className="ed-w-choose__shape-1 updown-ani"
              src="/assets/images/why-choose/why-choose-2/shape-1.svg"
              alt="shape-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export const WhyChooseArea3 = () => {
  return (
    <section className="ed-why-choose ed-why-choose--style3 section-gap position-relative">
      <img
        className="ed-w-choose__shape-3"
        src="assets/images/why-choose/why-choose-3/shape-3.svg"
        alt="pattern-3"
      />
      <div className="container ed-container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__content">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">WHO WE ARE</span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Transform Your Best Practice <br />
                  with Our Online Course
                </h3>
                <p className="ed-section-head__text">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit. Excepteur sint occaecat.
                </p>
              </div>
              <div className="ed-w-choose__info">
                {/* Single Info  */}
                <div className="ed-w-choose__info-single">
                  <div className="ed-w-choose__info-head">
                    <div className="ed-w-choose__info-icon bg-1">
                      <img
                        src="assets/images/why-choose/why-choose-1/icon-1.svg"
                        alt="icon"
                      />
                    </div>
                    <h5>Face-to-face Teaching</h5>
                  </div>
                  <div className="ed-w-choose__info-bottom">
                    <p>
                      Excepteur sint occaecat cupidatat non proident sunt in
                      culpa qui officia for this is a for that an deserunt
                      mollit.
                    </p>
                  </div>
                </div>
                {/* Single Info  */}
                <div className="ed-w-choose__info-single">
                  <div className="ed-w-choose__info-head">
                    <div className="ed-w-choose__info-icon bg-2">
                      <img
                        src="assets/images/why-choose/why-choose-1/icon-2.svg"
                        alt="icon"
                      />
                    </div>
                    <h5>24/7 Support Available</h5>
                  </div>
                  <div className="ed-w-choose__info-bottom">
                    <p>
                      Excepteur sint occaecat cupidatat non proident sunt in
                      culpa qui officia for this is a for that an deserunt
                      mollit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__images ed-w-choose__images--style3 position-relative">
              {/* Why Choose Image  */}
              <div className="ed-w-choose__main-img--style2 position-relative">
                <img
                  className="why-choose-img-1"
                  src="assets/images/why-choose/why-choose-3/img-1.png"
                  alt="why-choose-img-1"
                />
                <img
                  className="why-choose-img-2"
                  src="assets/images/why-choose/why-choose-3/img-2.png"
                  alt="why-choose-img-2"
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
                      <Counter end={9394} />
                    </span>
                    +
                  </h4>
                  <p>Enrolled Learners</p>
                </div>
              </div>
              {/* Shapes Elements */}
              <div className="ed-w-choose__shapes">
                <img
                  className="ed-w-choose__shape-1 rotate-ani"
                  src="assets/images/why-choose/why-choose-3/shape-1.svg"
                  alt="shape-1"
                />
                <img
                  className="ed-w-choose__shape-2"
                  src="assets/images/why-choose/why-choose-3/shape-2.svg"
                  alt="pattern-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const WhyChooseArea5 = () => {
  return (
    <section className="ed-about section-gap position-relative">
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            {/* About Content  */}
            <div className="ed-about__content p-0">
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">
                  WHY CHOOSE EDUNA
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
                  <li>
                    <img
                      src="assets/images/icons/icon-check-blue.svg"
                      alt="icon-check-blue"
                    />
                    Our Expert Trainers
                  </li>
                  <li>
                    <img
                      src="assets/images/icons/icon-check-blue.svg"
                      alt="icon-check-blue"
                    />
                    Online Remote Learning
                  </li>
                  <li>
                    <img
                      src="assets/images/icons/icon-check-blue.svg"
                      alt="icon-check-blue"
                    />
                    Easy to follow curriculum
                  </li>
                  <li>
                    <img
                      src="assets/images/icons/icon-check-blue.svg"
                      alt="icon-check-blue"
                    />
                    Lifetime Access
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            {/* About Images  */}
            <div className="ed-about__images">
              <div className="ed-about__main-img">
                <img
                  src="assets/images/about/about-3/about-img.png"
                  alt="about-img"
                />
              </div>
              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">3458</span>+
                  </h4>
                  <p>Satisfied Students</p>
                </div>
              </div>
              <div className="ed-about__shapes">
                <img
                  className="ed-about__shape-1"
                  src="assets/images/about/about-1/shape-1.svg"
                  alt="shape-1"
                />
                <img
                  className="ed-about__shape-2"
                  src="assets/images/about/about-1/shape-2.svg"
                  alt="shape-2"
                />
                <img
                  className="ed-about__shape-3 rotate-ani"
                  src="assets/images/about/about-1/shape-3.svg"
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
