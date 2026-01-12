"use client";

import { eduna_config } from "@/utilities";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

// Define section types
interface Section {
  id: string;
  label: string;
}

interface HeaderProps {
  header: number;
  sections?: Section[];
  logo?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    href?: string;
  };
  showLoginButton?: boolean;
  loginButton?: {
    text?: string;
    href?: string;
    className?: string;
  };
}

const Header = ({ 
  header, 
  sections = [], 
  logo,
  showLoginButton = true,
  loginButton = {
    text: "Log In",
    href: "/auth",
    className: "login-btn"
  }
}: HeaderProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  
  useEffect(() => {
    eduna_config.sticky_header();
    
    // Track active section on scroll
    const handleScroll = () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const HeaderComponent =
      header === 4
      ? Header4
      : Header4;
      

  return (
    <Fragment>
      <HeaderComponent
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={() => setShowMobileMenu(true)}
        sections={sections}
        activeSection={activeSection}
        logo={logo}
        showLoginButton={showLoginButton}
        loginButton={loginButton}
      />
      <MobileMenu
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        sections={sections}
        logo={logo}
        loginButton={loginButton}
      />
    </Fragment>
  );
};
export default Header;

// Scroll to section function
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 80; // Adjust based on your header height
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

const Header4 = ({
  showMobileMenu,
  setShowMobileMenu,
  sections,
  activeSection,
  logo,
  showLoginButton,
  loginButton
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  sections: Section[];
  activeSection: string;
  logo?: HeaderProps['logo'];
  showLoginButton: boolean;
  loginButton: HeaderProps['loginButton'];
}) => {
  // Default logo if not provided
  const defaultLogo = {
    src: "assets/images/logo.svg",
    alt: "logo",
    width: 140,
    height: 34,
    href: "/"
  };

  const logoConfig = logo || defaultLogo;

  return (
    <header className="ed-header ed-header--style2 ed-header--style4">
      <div className="container ed-container-expand">
        <div className="ed-header__inner">
          {/* Header Left */}
          <div className="ed-header__left--style2">
            <div className="ed-header__left-widget--style2">
              {/* Logo with props */}
              <div className="ed-topbar__logo">
                <Link href={logoConfig.href || "/"}>
                  <img 
                    src={logoConfig.src} 
                    alt={logoConfig.alt || "logo"} 
                    width={logoConfig.width}
                    height={logoConfig.height}
                  />
                </Link>
              </div>
            </div>
            {/* Navigation Menu */}
            <Nav sections={sections} activeSection={activeSection} />
          </div>
          {/* Header Right */}
          <div className="ed-header__right">
            <div className="ed-header__search">
              <form action="#" method="post">
                <input type="search" name="search" placeholder="Search" />
                <button type="submit">
                  <i className="fi-rr-search" />
                </button>
              </form>
            </div>
            <div className="ed-header__action">
              <div className="ed-topbar__info-buttons">
                {/* Conditional Login Button */}
                {showLoginButton && (
                  <Link 
                    href={loginButton.href || "/auth"}
                    className={loginButton.className || "login-btn"}
                  >
                    {loginButton.text || "Log In"}
                  </Link>
                )}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-offcanvas-toggler"
              onClick={() => setShowMobileMenu(true)}
            >
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Nav = ({ sections, activeSection }: { sections: Section[], activeSection: string }) => {
  return (
    <nav className="ed-header__navigation">
      <ul className="ed-header__menu">
        {/* Home */}
        <li>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`${activeSection === '' ? 'active' : ''}`}
          >
            Home
          </button>
        </li>
        
        {/* Dynamic Sections */}
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`${activeSection === section.id ? 'active' : ''}`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Mobile Menu with sections
const MobileMenu = ({
  show,
  onHide,
  sections,
  logo,
  loginButton
}: {
  show: boolean;
  onHide: () => void;
  sections: Section[];
  logo?: HeaderProps['logo'];
  loginButton?: HeaderProps['loginButton'];
}) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  
  const activeMenuSet = (value: string) =>
    setActiveMenu(activeMenu === value ? "" : value);
  
  const activeLi = (value: string) =>
    value === activeMenu ? { display: "block" } : { display: "none" };

  // Default logo if not provided
  const defaultLogo = {
    src: "/assets/images/logo.svg",
    alt: "logo",
    width: 140,
    height: 34,
    href: "/"
  };

  const logoConfig = logo || defaultLogo;

  // Default login button if not provided
  const defaultLoginButton = {
    text: "Log In",
    href: "/auth",
    className: "login-btn"
  };

  const loginButtonConfig = loginButton || defaultLoginButton;

  return (
    <Modal
      className="modal mobile-menu-modal offcanvas-modal fade"
      show={show}
      onHide={onHide}
    >
      <div className="modal-header offcanvas-header">
        <div className="offcanvas-logo">
          <Link href={logoConfig.href || "/"}>
            <Image
              width={logoConfig.width || 140}
              height={logoConfig.height || 34}
              src={logoConfig.src}
              alt={logoConfig.alt || "logo"}
            />
          </Link>
        </div>
        <button type="button" className="btn-close" onClick={onHide}>
          <i className="fi fi-ss-cross" />
        </button>
      </div>
      <div className="mobile-menu-modal-main-body">
        <nav className="offcanvas__menu">
          <ul className="offcanvas__menu_ul">
            {/* Home */}
            <li className="offcanvas__menu_li">
              <button 
                className="offcanvas__menu_item" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onHide();
                }}
              >
                Home
              </button>
            </li>
            
            {/* Dynamic Sections */}
            <li className="offcanvas__menu_li">
              <button 
                className="offcanvas__menu_item" 
                onClick={() => activeMenuSet("sections")}
              >
                Sections
                <button 
                  className="offcanvas__sub_menu_toggle"
                  onClick={() => activeMenuSet("sections")}
                />
              </button>
              <ul className="offcanvas__sub_menu" style={activeLi("sections")}>
                {sections.map((section) => (
                  <li className="offcanvas__sub_menu_li" key={section.id}>
                    <button
                      className="offcanvas__sub_menu_item"
                      onClick={() => {
                        scrollToSection(section.id);
                        onHide();
                      }}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Login Button in Mobile Menu */}
            <li className="offcanvas__menu_li">
              <Link 
                href={loginButton.href || "/auth"}
                className="offcanvas__menu_item"
                onClick={onHide}
              >
                {loginButton.text || "Log In"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Modal>
  );
};