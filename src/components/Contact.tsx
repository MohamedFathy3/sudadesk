import Image from "next/image";

const Contact = () => {
  return (
    <section className="ed-contact section-gap position-relative pb-0">
      <div className="ed-contact__bg">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="/assets/images/contact/contact-bg.png"
          alt="contact-bg"
        />
      </div>
      <div className="ed-contact__shapes">
        <Image
          width={75}
          height={98}
          sizes="100vw"
          style={{ width: "75px", height: "98px" }}
          className="ed-contact__shape-1 rotate-ani"
          src="/assets/images/contact/shape-1.svg"
          alt="shape-1"
        />
        <Image
          width={61}
          height={52}
          sizes="100vw"
          style={{ width: "61px", height: "52px" }}
          className="ed-contact__shape-2"
          src="/assets/images/contact/shape-2.svg"
          alt="shape-1"
        />
        <Image
          width={79}
          height={49}
          sizes="100vw"
          style={{ width: "79px", height: "49px" }}
          className="ed-contact__shape-3"
          src="/assets/images/contact/shape-3.svg"
          alt="shape-1"
        />
      </div>
      <div className="container ed-container">
        <div className="row align-items-end">
          <div className="col-lg-3 col-12">
            <div className="ed-contact__info-wrapper">
              <h4 className="ed-contact__info-title">Contact</h4>
              {/* Sigle Info  */}
              <div className="ed-contact__info-item">
                <div className="ed-contact__info-icon">
                  <Image
                    width={30}
                    height={30}
                    sizes="100vw"
                    style={{ width: "30px", height: "30px" }}
                    src="/assets/images/icons/icon-phone-blue.svg"
                    alt="icon-phone-blue"
                  />
                </div>
                <div className="ed-contact__info-content">
                  <span>24/7 Support</span>
                  <a href="tel:+532 321 33 33">+532 321 33 33</a>
                </div>
              </div>
              {/* Sigle Info  */}
              <div className="ed-contact__info-item">
                <div className="ed-contact__info-icon">
                  <Image
                    width={30}
                    height={30}
                    sizes="100vw"
                    style={{ width: "30px", height: "30px" }}
                    src="/assets/images/icons/icon-envelope-blue.svg"
                    alt="icon-envelope-blue"
                  />
                </div>
                <div className="ed-contact__info-content">
                  <span>Send Message</span>
                  <a href="mailto:eduna@gmail.com">eduna@gmail.com3</a>
                </div>
              </div>
              {/* Sigle Info  */}
              <div className="ed-contact__info-item">
                <div className="ed-contact__info-icon">
                  <Image
                    width={30}
                    height={30}
                    sizes="100vw"
                    style={{ width: "30px", height: "30px" }}
                    src="/assets/images/icons/icon-location-blue.svg"
                    alt="icon-location-blue"
                  />
                </div>
                <div className="ed-contact__info-content">
                  <span>Our Locati0n</span>
                  <a href="#">32/Jenin, London</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-12 order-class">
            <div
              className="ed-contact__form wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className="ed-contact__form-head">
                <span className="ed-contact__form-sm-title">GET IN TOUCH</span>
                <h3 className="ed-contact__form-big-title">
                  Have Any Questions About Eduna? Contact With Us Today
                </h3>
              </div>
              <form action="#" method="post" className="ed-contact__form-main">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="form-group">
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        placeholder="Your phone"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        id="website"
                        name="website"
                        placeholder="Your website"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you? Feel free to get in touch!"
                        required
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        {" "}
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={true}
                          id="flexCheckDefault"
                        />
                        I agree to the&nbsp;Privacy Policy.{" "}
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="ed-contact__form-btn">
                      <button type="submit" className="ed-btn">
                        Send Your Message
                        <i className="fi fi-rr-arrow-small-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;

export const Contact2 = () => {
  return (
    <section className="ed-contact ed-contact--style2 section-gap pt-0 position-relative">
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-contact__inner">
              {/* Contact Image  */}
              <div className="ed-contact__img">
                <Image
                  width={620}
                  height={620}
                  sizes="100vw"
                  style={{ width: "620px", height: "620px" }}
                  src="/assets/images/contact/contact-img.png"
                  alt="contact-img"
                />
              </div>
              {/* Contact Form  */}
              <div className="ed-contact__form">
                <div className="ed-contact__form-head">
                  <span className="ed-contact__form-sm-title">CONTACT US</span>
                  <h3 className="ed-contact__form-big-title ed-split-text right">
                    Have questions? Contact <br />
                    with us today
                  </h3>
                </div>
                <form
                  action="#"
                  method="post"
                  className="ed-contact__form-main"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you? Feel free to get in touch!"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-check">
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {" "}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                      I agree to the&nbsp;Privacy Policy.{" "}
                    </label>
                  </div>
                  <div className="ed-contact__form-btn">
                    <button type="submit" className="ed-btn">
                      Send Message
                      <i className="fi fi-rr-arrow-small-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
