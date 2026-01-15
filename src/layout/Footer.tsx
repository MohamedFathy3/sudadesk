// @/layout/Footer.tsx (بديل بدون react-scroll)
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// تعريف واجهة بيانات المدرسة
interface School {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  logo: string;
  manager: {
    name: string | null;
    email: string;
  };
}

// تعريف واجهة الـ Sections
interface Section {
  id: string;
  label: string;
}

const Footer = ({ 
  footer, 
  schoolData,
  sections = []
}: { 
  footer: number;
  schoolData?: School;
  sections?: Section[];
}) => {
  switch (footer) {
    case 1:
      return <Footer1 schoolData={schoolData} sections={sections} />;
    default:
      return <Footer1 schoolData={schoolData} sections={sections} />;
  }
};
export default Footer;

const Footer1 = ({ schoolData, sections }: { schoolData?: School; sections?: Section[] }) => {
  return (
    <footer className="ed-footer section-bg-color-1 position-relative">
      <FooterContent schoolData={schoolData} sections={sections} />
    </footer>
  );
};

const FooterContent = ({ schoolData, sections }: { schoolData?: School; sections?: Section[] }) => {
  // استخدام بيانات المدرسة إذا وجدت، وإلا استخدام البيانات الافتراضية
  const contact = [
    {
      icon: "/assets/images/icons/icon-phone-blue.svg",
      title: "24/7 Support",
      phone: schoolData?.phone || "+532 321 33 33",
      link: schoolData?.phone ? `tel:${schoolData.phone}` : "tel:+532 321 33 33",
    },
    {
      icon: "/assets/images/icons/icon-envelope-blue.svg",
      title: "Send Message",
      email: schoolData?.email || "eduna@gmail.com",
      link: schoolData?.email ? `mailto:${schoolData.email}` : "mailto:eduna@gmail.com",
    },
    {
      icon: "/assets/images/icons/icon-location-blue.svg",
      title: "Our Location",
      address: schoolData?.address || "32/Jenin, London",
      link: "#",
    },
  ];

  // رابط اللوجو في الفوتر
  const footerLogo = schoolData?.logo || "/assets/images/logo.svg";

  // دالة للتمرير إلى السكشن
  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // ارتفاع الـ header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <Fragment>
      {/* Footer Top */}
      <div className=" position-relative">
        <div className="ed-footer__shapes">
          <Image
            width={150}
            height={354}
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
                <Link href="#" className="ed-footer__logo">
                  <Image
                    width={210}
                    height={320}
                    src={footerLogo}
                    alt="footer-logo"
                  />
                </Link>
                <p className="ed-footer__about-text">
                  {schoolData?.des || "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit."}
                </p>
              </div>
            </div>
            
            {/* عرض Sections */}
            {sections && sections.length > 0 && (
              <div className="col-lg-3 col-md-6 col-12">
                <div className="ed-footer__widget">
                  <h4 className="ed-footer__widget-title">Quick Links</h4>
                  <ul className="ed-footer__widget-links">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className="text-left w-full hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className={`col-lg-${sections && sections.length > 0 ? '3' : '4'} col-md-6 col-12`}>
              <div className="ed-footer__widget contact-widget">
                <h4 className="ed-footer__widget-title">Contact</h4>
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
            
            {/* Newsletter Section */}
            <div className={`col-lg-${sections && sections.length > 0 ? '2' : '4'} col-md-6 col-12`}>
              <div className="ed-footer__widget">
                <h4 className="ed-footer__widget-title">Subscribe</h4>
                <div className="ed-footer__newsletter">
                  <p className="ed-footer__about-text">
                    Stay updated with our latest news
                  </p>
                  <form className="ed-footer__newsletter-form mt-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      required
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button type="submit" className="ed-btn w-full">
                      Subscribe
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
                Copyright {new Date().getFullYear()} | Developed By{" "}
                <a
                  href="https://starplus.agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                starplus
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