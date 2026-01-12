import { CallToAction1 } from "@/components/CallToAction";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const Footer = ({ footer }: { footer: number }) => {
  switch (footer) {
    case 1:
      return <Footer1 />;
    case 2:
      return <Footer2 />;

    default:
      return <Footer1 />;
  }
};
export default Footer;

const Footer1 = () => {
  return (
    <footer className="ed-footer section-bg-color-1 position-relative">
      <FooterContent />
    </footer>
  );
};

const Footer2 = () => {
  return (
    <div className="footer-bg position-relative">
      <div className="footer-bg__img">
        <Image
          width={1905}
          height={1032}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="/assets/images/footer/footer-2/footer-bg.png"
          alt="footer-bg-img"
        />
      </div>
      {/* Start Call Action Area */}
      <CallToAction1 />
      {/* End Call Action Area */}
      {/* Start Footer Area */}
      <footer className="ed-footer position-relative">
        <FooterContent />
      </footer>
      {/* End Footer Area  */}
    </div>
  );
};

const FooterContent = () => {
  const contact = [
    {
      icon: "assets/images/icons/icon-phone-blue.svg",
      title: "24/7 Support",
      phone: "+532 321 33 33",
      link: "tel:+532 321 33 33",
    },
    {
      icon: "assets/images/icons/icon-envelope-blue.svg",
      title: "Send Message",
      email: "eduna@gmail.com",
      link: "mailto:eduna@gmail.com",
    },
    {
      icon: "assets/images/icons/icon-location-blue.svg",
      title: "Our Locati0n",
      address: "32/Jenin, London",
      link: "#",
    },
  ];
  return (
    <Fragment>
      {/* Footer Top */}
      <div className="ed-footer__top position-relative">
        <div className="ed-footer__shapes">
          <Image
            width={95}
            height={154}
            className="ed-footer__shape-1"
            src="/assets/images/footer/footer-1/shape-1.svg"
            alt="shape-1"
          />
          <Image
            width={101}
            height={92}
            className="ed-footer__shape-2 rotate-ani"
            src="/assets/images/footer/footer-1/shape-2.svg"
            alt="shape-2"
          />
          <Image
            width={119}
            height={121}
            className="ed-footer__shape-3"
            src="/assets/images/footer/footer-1/shape-3.svg"
            alt="shape-3"
          />
        </div>
        <div className="container ed-container">
          <div className="row g-0">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="ed-footer__widget ed-footer__about">
                <Link href="/" className="ed-footer__logo">
                  <Image
                    width={140}
                    height={34}
                    src="/assets/images/logo.svg"
                    alt="footer-logo"
                  />
                </Link>
                <p className="ed-footer__about-text">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa
                  qui officia deserunt mollit.
                </p>
                <ul className="ed-footer__about-social">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/assets/images/icons/icon-dark-facebook.svg"
                        alt="icon-dark-facebook"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/" target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/assets/images/icons/icon-dark-twitter.svg"
                        alt="icon-dark-twitter"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dribbble.com/" target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/assets/images/icons/icon-dark-dribbble.svg"
                        alt="icon-dark-dribbble"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      <Image
                        width={25}
                        height={25}
                        src="/assets/images/icons/icon-dark-instagram.svg"
                        alt="icon-dark-instagram"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <div className="ed-footer__widget">
                <h4 className="ed-footer__widget-title">Links</h4>
                <ul className="ed-footer__widget-links">
                  <li>
                    <Link href="/about-1">About Us</Link>
                  </li>
                  <li>
                    <Link href="/course-1">Our Courses</Link>
                  </li>
                  <li>
                    <a href="#">Pricing Plan</a>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/blog">Our News</Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ’s</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="ed-footer__widget contact-widget">
                <h4 className="ed-footer__widget-title">Contact</h4>
                {/* Single Info  */}
                {contact.map((item, index) => (
                  <div className="ed-footer__contact" key={index}>
                    <div className="ed-footer__contact-icon">
                      <Image
                        width={25}
                        height={25}
                        src={item.icon}
                        alt={item.title}
                      />
                    </div>
                    <div className="ed-footer__contact-info">
                      <span>{item.title}</span>
                      <a href={item.link}>
                        {item.phone || item.email || item.address}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="ed-footer__widget newsletter-widget">
                <h4 className="ed-footer__widget-title">Subscribe</h4>
                <div className="ed-footer__newsletter">
                  <p className="ed-footer__about-text">
                    Enter your email address to register to our newsletter
                    subscription
                  </p>
                  <form
                    action="#"
                    method="post"
                    className="ed-footer__newsletter-form"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      required
                    />
                    <button type="submit" className="ed-btn">
                      Subscribe Now
                      <i className="fi fi-rr-arrow-small-right" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="ed-footer__bottom">
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <p className="ed-footer__copyright-text">
                Copyright {new Date().getFullYear()} Eduna | Developed By{" "}
                <a
                  href="https://themeforest.net/user/bizantheme"
                  target="_blank"
                >
                  BizanTheme
                </a>
                . All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
