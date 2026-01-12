"use client";
import { eduna_config } from "@/utilities";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

const Header = ({ header }: { header: number }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  useEffect(() => {
    eduna_config.sticky_header();
  }, []);

  const HeaderComponent =
    header === 1
      ? Header1
      : header === 2
      ? Header2
      : header === 3
      ? Header3
      : header === 4
      ? Header4
      : Header1;

  return (
    <Fragment>
      <HeaderComponent
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={() => setShowMobileMenu(true)}
      />
      <MobileMenu
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
      />
    </Fragment>
  );
};
export default Header;

const Header1 = ({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  return (
    <Fragment>
      <div className="ed-topbar">
        <div className="container ed-container-expand">
          <div className="ed-topbar__inner">
            {/* Logo  */}
            <div className="ed-topbar__logo">
              <Link href="/">
                <Image
                  width={140}
                  height={34}
                  src="/assets/images/logo.svg"
                  alt="logo"
                />
              </Link>
            </div>
            {/* Category Dropdown */}
            <div className="ed-topbar__search-widget">
              <div className="ed-topbar__category">
                <select className="nice-select">
                  <option data-display="All Categories">All Categories</option>
                  <option value={1}>Business</option>
                  <option value={2}>Marketing</option>
                  <option value={3}>Design</option>
                  <option value={4}>Finance</option>
                  <option value={5}>Lifestyle</option>
                  <option value={6}>Development</option>
                  <option value={7}>Photography</option>
                </select>
              </div>
              <div className="ed-topbar__search">
                <form action="#" method="post">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search your courses..."
                    required
                  />
                  <button type="submit">
                    Search
                    <i className="fi-rr-search" />
                  </button>
                </form>
              </div>
            </div>
            {/* Topbar Info */}
            <div className="ed-topbar__info">
              {/* Topbar Social */}
              <ul className="ed-topbar__info-social">
                <Social />
              </ul>
              {/* Topbar Button */}
              <div className="ed-topbar__info-buttons">
                <LoginRegisterButton />
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
              {/* End Mobile Menu Button */}
            </div>
          </div>
        </div>
      </div>
      <header className="ed-header">
        <div className="container ed-container-expand">
          <div className="ed-header__inner">
            <div className="row align-items-center">
              <div className="col-lg-7 col-12">
                {/* Navigation Menu */}
                <Nav />
              </div>
              <div className="col-lg-5 col-12">
                {/* Header Right */}
                <div className="ed-header__right">
                  <ul className="ed-header__contact">
                    <li>
                      <a href="tel:+532 321 33 33">+532 321 33 33</a>
                    </li>
                    <li>
                      <a href="mailto:helloeduna@gmail.com">
                        helloeduna@gmail.com
                      </a>
                    </li>
                  </ul>
                  <div className="ed-header__action">
                    <div className="ed-header__cart">
                      <button
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#edSidebarCart"
                        aria-controls="offcanvasRight"
                        className="ed-topbar__action-icon"
                      >
                        <Image
                          width={25}
                          height={25}
                          src="/assets/images/icons/icon-grey-bag.svg"
                          alt="icon-grey-bag"
                        />
                        <span>3</span>
                      </button>
                    </div>
                    <div className="ed-header__menu">
                      <button
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#edSidebar"
                        aria-controls="offcanvasRight"
                        onClick={() => setToggleSidebar(true)}
                      >
                        <Image
                          width={25}
                          height={25}
                          src="/assets/images/icons/icon-grey-menu-3-line.svg"
                          alt="icon-grey-menu-3-line"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar close={() => setToggleSidebar(false)} open={toggleSidebar} />
    </Fragment>
  );
};

const Header2 = ({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}) => {
  return (
    <header className="ed-header ed-header--style2">
      <div className="container ed-container-expand">
        <div className="ed-header__inner">
          <div className="row align-items-center">
            <div className="col-lg-9 col-6">
              <div className="ed-header__left--style2">
                <div className="ed-header__left-widget--style2">
                  {/* Logo  */}
                  <div className="ed-topbar__logo">
                    <Link href="/">
                      <Image
                        width={140}
                        height={34}
                        src="/assets/images/logo.svg"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  {/* Category Dropdown */}
                  <div className="ed-topbar__search-widget">
                    <div className="ed-topbar__category">
                      <select className="nice-select">
                        <option data-display="All Categories">
                          All Categories
                        </option>
                        <option value={1}>Business</option>
                        <option value={2}>Marketing</option>
                        <option value={3}>Design</option>
                        <option value={4}>Finance</option>
                        <option value={5}>Lifestyle</option>
                        <option value={6}>Development</option>
                        <option value={7}>Photography</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Navigation Menu */}
                <Nav />
              </div>
            </div>
            <div className="col-lg-3 col-6">
              {/* Header Right */}
              <div className="ed-header__right">
                <div className="ed-header__action">
                  <div className="ed-header__cart">
                    <button
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#edSidebarCart"
                      aria-controls="offcanvasRight"
                      className="ed-topbar__action-icon"
                    >
                      <Image
                        width={25}
                        height={25}
                        src="/assets/images/icons/icon-grey-bag.svg"
                        alt="icon-grey-bag"
                      />
                      <span>3</span>
                    </button>
                  </div>
                  <div className="ed-topbar__info-buttons">
                    <LoginRegisterButton />
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
                {/* End Mobile Menu Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Header3 = ({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}) => {
  return (
    <header className="ed-header ed-header--style2 ed-header--style3">
      <div className="container ed-container-expand">
        <div className="ed-header__inner">
          <div className="row align-items-center">
            <div className="col-lg-8 col-6">
              <div className="ed-header__left--style2">
                <div className="ed-header__left-widget--style2">
                  {/* Logo  */}
                  <div className="ed-topbar__logo">
                    <Link href="/">
                      <img
                        src="assets/images/white-logo.svg"
                        alt="white-logo"
                      />
                    </Link>
                  </div>
                </div>
                {/* Navigation Menu */}
                <Nav />
              </div>
            </div>
            <div className="col-lg-4 col-6">
              {/* Header Right */}
              <div className="ed-header__right">
                <ul className="ed-topbar__info-social">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <img
                        src="assets/images/icons/icon-white-facebook.svg"
                        alt="icon-white-facebook"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/" target="_blank">
                      <img
                        src="assets/images/icons/icon-white-twitter.svg"
                        alt="icon-white-twitter"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dribbble.com/" target="_blank">
                      <img
                        src="assets/images/icons/icon-white-dribbble.svg"
                        alt="icon-white-dribbble"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      <img
                        src="assets/images/icons/icon-white-instagram.svg"
                        alt="icon-white-instagram"
                      />
                    </a>
                  </li>
                </ul>
                <div className="ed-header__action">
                  <div className="ed-header__cart">
                    <button
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#edSidebarCart"
                      aria-controls="offcanvasRight"
                      className="ed-topbar__action-icon"
                    >
                      <img
                        src="assets/images/icons/icon-white-bag.svg"
                        alt="icon-white-bag"
                      />
                      <span>3</span>
                    </button>
                  </div>
                  <div className="ed-topbar__info-buttons">
                    <LoginRegisterButton />
                  </div>
                </div>
                {/* Mobile Menu Button */}
                <button
                  type="button"
                  className="mobile-menu-offcanvas-toggler"
                  data-bs-toggle="modal"
                  data-bs-target="#offcanvas-modal"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </button>
                {/* End Mobile Menu Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Header4 = ({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}) => {
  return (
    <header className="ed-header ed-header--style2 ed-header--style4">
      <div className="container ed-container-expand">
        <div className="ed-header__inner">
          {/* Header Left */}
          <div className="ed-header__left--style2">
            <div className="ed-header__left-widget--style2">
              {/* Logo  */}
              <div className="ed-topbar__logo">
                <Link href="/">
                  <img src="assets/images/logo.svg" alt="logo" />
                </Link>
              </div>
              {/* Category Dropdown */}
              <div className="ed-topbar__search-widget">
                <div className="ed-topbar__category">
                  <select>
                    <option data-display="All Categories">
                      All Categories
                    </option>
                    <option value={1}>Business</option>
                    <option value={2}>Marketing</option>
                    <option value={3}>Design</option>
                    <option value={4}>Finance</option>
                    <option value={5}>Lifestyle</option>
                    <option value={6}>Development</option>
                    <option value={7}>Photography</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Navigation Menu */}
            <Nav />
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
              <div className="ed-header__cart">
                <button
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#edSidebarCart"
                  aria-controls="offcanvasRight"
                  className="ed-topbar__action-icon"
                >
                  <img
                    src="assets/images/icons/icon-grey-bag.svg"
                    alt="icon-grey-bag"
                  />
                  <span>3</span>
                </button>
              </div>
              <div className="ed-topbar__info-buttons">
                <LoginRegisterButton />
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-offcanvas-toggler"
              data-bs-toggle="modal"
              data-bs-target="#offcanvas-modal"
              onClick={() => setShowMobileMenu(true)}
            >
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </button>
            {/* End Mobile Menu Button */}
          </div>
        </div>
      </div>
    </header>
  );
};

const Nav = () => {
  return (
    <nav className="ed-header__navigation">
      <ul className="ed-header__menu">
        <li>
          <a href="javascript:void(0)">
            Home
            <i className="fi fi-ss-angle-small-down" />
          </a>
          <ul className="sub-menu">
            <li>
              <Link href="/">Home One</Link>
            </li>
            <li>
              <Link href="/index-2">Home Two</Link>
            </li>
            <li>
              <Link href="/index-3">Home Three</Link>
            </li>
            <li>
              <Link href="/index-4">Home Four</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0)">
            Courses
            <i className="fi fi-ss-angle-small-down" />
          </a>
          <ul className="sub-menu">
            <li>
              <Link href="/course-1">Course One</Link>
            </li>
            <li>
              <Link href="/course-2">Course Two</Link>
            </li>
            <li>
              <Link href="/course-details">Course Details</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0)">
            Pages
            <i className="fi fi-ss-angle-small-down" />
          </a>
          <ul className="sub-menu">
            <li>
              <Link href="/instructor">Instructors</Link>
            </li>
            <li>
              <Link href="/instructor-details">Instructor Details</Link>
            </li>
            <li>
              <Link href="/faq">Faq</Link>
            </li>
            <li>
              <Link href="/404">404 Error</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0)">
            News
            <i className="fi fi-ss-angle-small-down" />
          </a>
          <ul className="sub-menu">
            <li>
              <Link href="/blog">Blog </Link>
            </li>
            <li>
              <Link href="/blog-details">Blog Details</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/about-1">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const MobileMenu = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [multiMenu, setMultiMenu] = useState<string>("");
  const activeMenuSet = (value: string) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value: string) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  const multiMenuSet = (value: string) =>
      setMultiMenu(multiMenu === value ? "" : value),
    multiMenuActiveLi = (value: string) =>
      value === multiMenu ? { display: "block" } : { display: "none" };
  return (
    <Modal
      className="modal mobile-menu-modal offcanvas-modal fade"
      show={show}
      onHide={onHide}
    >
      <div className="modal-header offcanvas-header">
        {/* Mobile Menu Logo */}
        <div className="offcanvas-logo">
          <Link href="/">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>
        <button type="button" className="btn-close" onClick={onHide}>
          <i className="fi fi-ss-cross" />
        </button>
      </div>
      <div className="mobile-menu-modal-main-body">
        {/* Mobile Menu Navigation */}
        <nav className="offcanvas__menu">
          <ul className="offcanvas__menu_ul">
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item active" href="/">
                Home
              </Link>
              <ul className="offcanvas__sub_menu" style={activeLi("home")}>
                <li className="offcanvas__sub_menu_li">
                  <Link href="/" className="offcanvas__sub_menu_item">
                    Home One
                  </Link>
                </li>
                <li className="offcanvas__sub_menu_li">
                  <Link
                    href="/index-2"
                    className="offcanvas__sub_menu_item active"
                  >
                    Home Two
                  </Link>
                </li>
              </ul>
              <button
                className="offcanvas__sub_menu_toggle"
                onClick={() => activeMenuSet("home")}
              />
            </li>
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/course-1">
                Courses
              </Link>
              <ul className="offcanvas__sub_menu" style={activeLi("course")}>
                <li className="offcanvas__sub_menu_li">
                  <Link href="/course-1" className="offcanvas__sub_menu_item">
                    Course
                  </Link>
                </li>
                <li className="offcanvas__sub_menu_li">
                  <Link
                    href="/course-details"
                    className="offcanvas__sub_menu_item"
                  >
                    Course Details
                  </Link>
                </li>
              </ul>
              <button
                className="offcanvas__sub_menu_toggle"
                onClick={() => activeMenuSet("course")}
              />
            </li>
            <li className="offcanvas__menu_li">
              <a className="offcanvas__menu_item" href="javascript:void(0)">
                Pages
              </a>
              <ul className="offcanvas__sub_menu" style={activeLi("pages")}>
                <li className="offcanvas__sub_menu_li">
                  <Link href="/instructor" className="offcanvas__sub_menu_item">
                    Instructors
                  </Link>
                  <ul
                    className="offcanvas__sub_menu"
                    style={multiMenuActiveLi("instructor")}
                  >
                    <li className="offcanvas__sub_menu_li">
                      <Link
                        href="/instructor"
                        className="offcanvas__sub_menu_item"
                      >
                        Instructor
                      </Link>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <Link
                        href="/instructor-details"
                        className="offcanvas__sub_menu_item"
                      >
                        Instructor Details
                      </Link>
                    </li>
                  </ul>
                  <button
                    className="offcanvas__sub_menu_toggle"
                    onClick={() => multiMenuSet("instructor")}
                  />
                </li>
                <li className="offcanvas__sub_menu_li">
                  <Link href="/faq" className="offcanvas__sub_menu_item">
                    Faq
                  </Link>
                </li>
                <li className="offcanvas__sub_menu_li">
                  <Link href="/404" className="offcanvas__sub_menu_item">
                    404 Error
                  </Link>
                </li>
              </ul>
              <button
                className="offcanvas__sub_menu_toggle"
                onClick={() => activeMenuSet("pages")}
              />
            </li>
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/blog">
                News
              </Link>
              <ul
                className="offcanvas__sub_menu"
                style={multiMenuActiveLi("news")}
              >
                <li className="offcanvas__sub_menu_li">
                  <Link href="/blog" className="offcanvas__sub_menu_item">
                    Blog
                  </Link>
                </li>
                <li className="offcanvas__sub_menu_li">
                  <Link
                    href="/blog-details"
                    className="offcanvas__sub_menu_item"
                  >
                    Blog Details
                  </Link>
                </li>
              </ul>
              <button
                className="offcanvas__sub_menu_toggle"
                onClick={() => multiMenuSet("news")}
              />
            </li>
            <li className="offcanvas__sub_menu_li">
              <Link href="/about-1" className="offcanvas__menu_item">
                About
              </Link>
            </li>
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Modal>
  );
};

const Social = () => {
  const social = [
    {
      id: 1,
      icon: "/assets/images/icons/icon-dark-facebook.svg",
      link: "https://www.facebook.com/",
    },
    {
      id: 2,
      icon: "/assets/images/icons/icon-dark-twitter.svg",
      link: "https://www.twitter.com/",
    },
    {
      id: 3,
      icon: "/assets/images/icons/icon-dark-dribbble.svg",
      link: "https://www.dribbble.com/",
    },
    {
      id: 4,
      icon: "/assets/images/icons/icon-dark-instagram.svg",
      link: "https://www.instagram.com/",
    },
  ];
  return (
    <Fragment>
      {social.map((item) => (
        <li key={item.id}>
          <a href={item.link} target="_blank">
            <Image width={25} height={25} src={item.icon} alt={item.icon} />
          </a>
        </li>
      ))}
    </Fragment>
  );
};

const Sidebar = ({ close, open }: { close: () => void; open: boolean }) => {
  const content: {
    id: number;
    title: string;
    content: string;
    link: string;
    icon: string;
  }[] = [
    {
      id: 1,
      title: "24/7 Support",
      content: "24/7 Support",
      link: "tel:+532 321 33 33",
      icon: "/assets/images/icons/icon-phone-blue.svg",
    },
    {
      id: 2,
      title: "Send Message",
      content: "Send Message",
      link: "mailto:eduna@gmail.com",
      icon: "/assets/images/icons/icon-envelope-blue.svg",
    },
    {
      id: 3,
      title: "Our Locati0n",
      content: "Our Locati0n",
      link: "https://www.google.com/maps/place/32/Jenin,+London",
      icon: "/assets/images/icons/icon-location-blue.svg",
    },
  ];
  const [beforeClose, setBeforeClose] = useState<boolean>(false);
  const handleClose = () => {
    setBeforeClose(true);
    setTimeout(() => {
      setBeforeClose(false);
      close();
    }, 300);
  };
  return (
    <Fragment>
      <div
        className={`offcanvas offcanvas-end ed-sidebar ${
          beforeClose ? "hiding" : open ? "show" : ""
        }`}
      >
        <div className="ed-sidebar-header">
          <Link href="/" className="ed-sidebar-logo">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <button
            type="button"
            className="text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <div className="ed-sidebar-body m-0">
          {/* Single Widget  */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Contacts Us:</h3>
            {/* Sigle Info  */}
            {content.map((item) => (
              <div className="ed-contact__info-item" key={item.id}>
                <div className="ed-contact__info-icon">
                  <Image
                    width={25}
                    height={25}
                    src={item.icon}
                    alt="icon-phone-blue"
                  />
                </div>
                <div className="ed-contact__info-content">
                  <span>{item.title}</span>
                  <a href={item.link}>{item.content}</a>
                </div>
              </div>
            ))}
          </div>
          {/* Single Widget  */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Follow Us:</h3>
            <ul className="ed-sidebar-social">
              <Social />
            </ul>
          </div>
          {/* Single Widget  */}
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">Subscribe Now:</h3>
            <form action="#" method="post" className="ed-sidebar-subscribe">
              <input
                type="email"
                name="email-address"
                placeholder="Enter email"
                required
              />
              <button type="submit" className="ed-btn">
                Subscribe
                <i className="fi fi-rr-arrow-small-right" />
              </button>
            </form>
          </div>
        </div>
      </div>
      {open && (
        <div
          className={`offcanvas-backdrop fade ${beforeClose ? "show" : ""}`}
          onClick={handleClose}
        />
      )}
    </Fragment>
  );
};

const LoginRegisterButton = () => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  return (
    <Fragment>
      <button
        type="button"
        className="register-btn"
        onClick={() => setShowRegisterModal(true)}
      >
        Register
      </button>
      <button
        type="button"
        className="login-btn"
        onClick={() => setShowLoginModal(true)}
      >
        Log In
      </button>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </Fragment>
  );
};

const RegisterModal = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) => {
  return (
    <Modal className="modal fade ed-auth__modal" show={show} onHide={onHide}>
      <div className="ed-auth__modal-content ">
        <button type="button" className="ed-auth__modal-close" onClick={onHide}>
          <i className="fi-rr-cross" />
        </button>
        {/* Auth Head  */}
        <div className="ed-auth__modal-head">
          <Link href="/" className="ed-auth__modal-logo">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <h3 className="ed-auth__modal-title">Sign Up Now</h3>
          <p className="ed-auth__modal-text">
            already have an account?
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Sign In
            </button>
          </p>
        </div>
        {/* Auth Body  */}
        <div className="ed-auth__modal-body">
          <form action="#" method="post" className="ed-auth__modal-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="user name"
                placeholder="Enter user name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={true}
                  id="flexCheckDefault2"
                />
                I agree with your <strong>Privacy Policy</strong>
              </label>
            </div>
            <div className="ed-auth__form-btn">
              <button type="submit" className="ed-btn">
                Register Now
                <i className="fi fi-rr-arrow-small-right" />
              </button>
            </div>
          </form>
        </div>
        {/* Auth Footer  */}
        <div className="ed-auth__modal-footer">
          <div className="ed-auth__modal-third-party">
            <p>Or Sign Up with</p>
            <ul className="ed-auth__modal-third-party-list">
              <li>
                <a className="google-login" href="https://www.google.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-google.svg"
                    alt="icon-color-google"
                  />
                </a>
              </li>
              <li>
                <a className="facebook-login" href="https://facebook.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-facebook.svg"
                    alt="icon-color-facebook"
                  />
                </a>
              </li>
              <li>
                <a className="linkedin-login" href="https://www.linkedin.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-linkedin.svg"
                    alt="icon-color-linkedin"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const LoginModal = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) => {
  return (
    <Modal className="modal fade ed-auth__modal" show={show} onHide={onHide}>
      <div className="ed-auth__modal-content">
        <button type="button" className="ed-auth__modal-close" onClick={onHide}>
          <i className="fi-rr-cross" />
        </button>
        {/* Auth Head  */}
        <div className="ed-auth__modal-head">
          <Link href="/" className="ed-auth__modal-logo">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <h3 className="ed-auth__modal-title">Sign In Now</h3>
          <p className="ed-auth__modal-text">
            Didn’t Create an account?
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              Sign Up
            </button>
          </p>
        </div>
        {/* Auth Body  */}
        <div className="ed-auth__modal-body">
          <form action="#" method="post" className="ed-auth__modal-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter user name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={true}
                  id="flexCheckDefault"
                />
                Remember me
              </label>
            </div>
            <div className="ed-auth__form-btn">
              <button type="submit" className="ed-btn">
                Sign In
                <i className="fi fi-rr-arrow-small-right" />
              </button>
            </div>
          </form>
        </div>
        {/* Auth Footer  */}
        <div className="ed-auth__modal-footer">
          <div className="ed-auth__modal-third-party">
            <p>Or Sign In with</p>
            <ul className="ed-auth__modal-third-party-list">
              <li>
                <a className="google-login" href="https://www.google.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-google.svg"
                    alt="icon-color-google"
                  />
                </a>
              </li>
              <li>
                <a className="facebook-login" href="https://facebook.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-facebook.svg"
                    alt="icon-color-facebook"
                  />
                </a>
              </li>
              <li>
                <a className="linkedin-login" href="https://www.linkedin.com/">
                  <Image
                    width={25}
                    height={25}
                    src="/assets/images/icons/icon-color-linkedin.svg"
                    alt="icon-color-linkedin"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
