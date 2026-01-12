"use client";
import Image from "next/image";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export const Faq1 = () => {
  const faq: {
    id: number;
    question: string;
    answer: string;
  }[] = [
    {
      id: 1,
      question: "How can I start with your online class?",
      answer:
        "Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.",
    },
    {
      id: 2,
      question: "How can I register to your website to learn?",
      answer:
        "Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.",
    },
    {
      id: 3,
      question: "Can i get lifetime access for your any courses?",
      answer:
        "Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.",
    },
    {
      id: 4,
      question: "How can I contact a school directly?",
      answer:
        "Excepteur sint occaecat cupidatat non proident sunta in culpa qui officia for this is a for that tempor.",
    },
  ];
  const [activeKey, setActiveKey] = useState<string>("1");
  return (
    <section className="ed-faq section-gap position-relative">
      <div className="container ed-container">
        <div className="ed-faq__inner position-relative">
          <div className="row align-items-center">
            <div className="col-lg-12 col-xl-6 col-12">
              {/* Faq Images  */}
              <div className="ed-faq__images position-relative">
                <div className="ed-faq__images-group">
                  <div className="ed-faq__image-group-1">
                    <Image
                      width={258}
                      height={440}
                      sizes="100vw"
                      style={{ width: "258px", height: "440px" }}
                      className="faq-img-1"
                      src="/assets/images/faq/faq-1/faq-img-1.png"
                      alt="faq-img-1"
                    />
                  </div>
                  <div className="ed-faq__image-group-2">
                    <Image
                      width={258}
                      height={172}
                      sizes="258px"
                      style={{ width: "258px", height: "172px" }}
                      className="faq-img-2"
                      src="/assets/images/faq/faq-1/faq-img-2.png"
                      alt="faq-img-2"
                    />
                    <Image
                      width={258}
                      height={370}
                      sizes="258px"
                      style={{ width: "258px", height: "370px" }}
                      className="faq-img-3"
                      src="/assets/images/faq/faq-1/faq-img-3.png"
                      alt="faq-img-2"
                    />
                  </div>
                </div>
                {/* Shape Elemets  */}
                <div className="ed-faq__shapes">
                  <Image
                    width={159}
                    height={137}
                    sizes="159px"
                    style={{ width: "159px", height: "137px" }}
                    className="ed-faq__shape-1"
                    src="/assets/images/faq/faq-1/shape-1.svg"
                    alt="shape-1"
                  />
                  <Image
                    width={75}
                    height={98}
                    sizes="75px"
                    style={{ width: "75px", height: "98px" }}
                    className="ed-faq__shape-2"
                    src="/assets/images/faq/faq-1/shape-2.svg"
                    alt="shape-2"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xl-6 col-12">
              {/* Faq Content  */}
              <div className="ed-faq__content">
                <div className="ed-section-head m-0">
                  <span className="ed-section-head__sm-title">
                    FREQUENTLY ASKED QUESTIONS
                  </span>
                  <h3 className="ed-section-head__title ed-split-text right">
                    Most Popular Questions About Our Online Courses
                  </h3>
                </div>
                <Accordion
                  className="ed-faq__accordion faq-inner accordion"
                  activeKey={activeKey.toString()}
                >
                  {/* Single Faq */}
                  {faq.map((item) => (
                    <div className="ed-faq__accordion-item" key={item.id}>
                      <h2 className="accordion-header" id="headingOne">
                        <Accordion.Item
                          as={"button"}
                          className={`accordion-button ${
                            activeKey === item.id.toString() ? "" : "collapsed"
                          }`}
                          eventKey={item.id.toString()}
                          onClick={() =>
                            setActiveKey(
                              activeKey === item.id.toString()
                                ? ""
                                : item.id.toString()
                            )
                          }
                        >
                          {item.question}
                        </Accordion.Item>
                      </h2>
                      <Accordion.Collapse
                        className="accordion-collapse"
                        eventKey={item.id.toString()}
                      >
                        <div className="ed-faq__accordion-body">
                          <p className="ed-faq__accordion-text">
                            {item.answer}
                          </p>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Faq2 = () => {
  const faq: {
    id: number;
    question: string;
    answer: string;
  }[] = [
    {
      id: 1,
      question: "What industries does ITGet IT Solutions serve?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 2,
      question: "How experienced is ITGet IT Solutions in the industry?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 3,
      question: "What services does ITGet IT Solutions provide?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 4,
      question: "Can ITGet IT Solutions handle projects of all sizes?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 5,
      question: "What is the company's mission and vision?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 6,
      question: "What is the company's mission and vision?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
    {
      id: 7,
      question: "What is the company's mission and vision?",
      answer:
        "ITGet IT Solutions offers a comprehensive range of services including but not limited to: software development, web development, mobile app development, IT consulting, cybersecurity solutions, cloud services, and IT infrastructure management.",
    },
  ];
  const [activeKey, setActiveKey] = useState<string>("1");
  return (
    <section className="ed-faq ed-faq--style2 section-gap position-relative">
      <div className="container ed-container">
        <div className="ed-faq__inner position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <div className="ed-section-head text-center">
                <span className="ed-section-head__sm-title">FAQ’S</span>
                <h3 className="ed-section-head__title ed-split-text left">
                  Frequently Asked Questions
                </h3>
              </div>
            </div>
            <div className="col-12">
              {/* Faq Content  */}
              <div className="ed-faq__content">
                <Accordion
                  className="ed-faq__accordion faq-inner accordion"
                  activeKey={activeKey.toString()}
                >
                  {/* Single Faq */}
                  {faq.map((item) => (
                    <div className="ed-faq__accordion-item" key={item.id}>
                      <h2 className="accordion-header" id="headingOne">
                        <Accordion.Item
                          as={"button"}
                          className={`accordion-button ${
                            activeKey === item.id.toString() ? "" : "collapsed"
                          }`}
                          eventKey={item.id.toString()}
                          onClick={() =>
                            setActiveKey(
                              activeKey === item.id.toString()
                                ? ""
                                : item.id.toString()
                            )
                          }
                        >
                          {item.question}
                        </Accordion.Item>
                      </h2>
                      <Accordion.Collapse
                        className="accordion-collapse"
                        eventKey={item.id.toString()}
                      >
                        <div className="ed-faq__accordion-body">
                          <p className="ed-faq__accordion-text">
                            {item.answer}
                          </p>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
