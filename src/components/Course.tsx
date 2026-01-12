import Image from "next/image";
import Link from "next/link";

const Course1 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 23,
      teacher: "Harrison Stone",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-1/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 4,
      teacher: "Alexander Wells",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-1/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 87,
      teacher: "John Smith",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-1/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "Exploring Learning Landscapes in Academic Business",
      lessons: 4,
      teacher: "Gabriel Cross",
      price: 356,
      students: 352,
      reviews: 65,
      image: "/assets/images/course/course-1/4.png",
    },
    {
      id: 5,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 643,
      students: 553,
      reviews: 23,
      image: "/assets/images/course/course-1/5.png",
    },
    {
      id: 6,
      name: "Cyber Security",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 4,
      teacher: "Dominic Chase",
      price: 275,
      students: 254,
      reviews: 34,
      image: "/assets/images/course/course-1/6.png",
    },
  ];
  return (
    <section className="ed-course section-gap section-bg-1 position-relative">
      <div className="ed-course__shapes">
        <Image
          width={37}
          height={41}
          sizes="100vw"
          style={{ width: "37px", height: "41px" }}
          className="ed-course__shape-1 rotate-ani"
          src="/assets/images/course/course-1/shape-1.svg"
          alt="shape-1"
        />
        <Image
          width={133}
          height={154}
          sizes="133x154"
          style={{ width: "133px", height: "154px" }}
          className="ed-course__shape-2 updown-ani"
          src="/assets/images/abstracts/abstract-element-regular.svg"
          alt="shape-2"
        />
        <Image
          width={101}
          height={92}
          sizes="101x92"
          style={{ width: "101px", height: "92px" }}
          className="ed-course__shape-3 updown-ani"
          src="/assets/images/course/course-1/shape-3.svg"
          alt="shape-3"
        />
      </div>
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">ONLINE COURSES</span>
              <h3 className="ed-section-head__title ed-split-text left">
                Get Your Course With Us
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Single Course Card */}
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Course1;

export const Course2 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 23,
      teacher: "Harrison Stone",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-2/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 4,
      teacher: "Alexander Wells",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-1/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 87,
      teacher: "John Smith",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-1/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 4,
      teacher: "Gabriel Cross",
      price: 356,
      students: 352,
      reviews: 65,
      image: "/assets/images/course/course-1/4.png",
    },
  ];
  return (
    <section className="ed-course ed-course--style2 section-gap position-relative overflow-hidden">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">ONLINE COURSES</span>
              <h3 className="ed-section-head__title ed-split-text left">
                Get Your Course With Us
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Single Course Card */}
          {courses.map((course) => (
            <CourseItem2 key={course.id} course={course} />
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ed-section-bottom-btn">
              <Link href="/course-1" className="ed-btn">
                View All Courses
                <i className="fi fi-rr-arrow-small-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Course3 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 23,
      teacher: "Harrison Stone",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-1/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 4,
      teacher: "Alexander Wells",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-1/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 87,
      teacher: "John Smith",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-1/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "Exploring Learning Landscapes in Academic Business",
      lessons: 4,
      teacher: "Gabriel Cross",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/4.png",
    },
    {
      id: 5,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/5.png",
    },
    {
      id: 6,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/6.png",
    },
    {
      id: 7,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/7.png",
    },
    {
      id: 8,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/8.png",
    },
    {
      id: 9,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/9.png",
    },
  ];
  return (
    <section className="ed-course section-gap position-relative">
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-course__filter">
              <p className="ed-course__filter-text">
                Showing&nbsp;1-6&nbsp;Of&nbsp;15&nbsp;Results
              </p>
              <div className="ed-course__filter-search">
                <form action="#" method="post" className="ed-hero__search-form">
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
          </div>
        </div>
        <div className="row">
          {/* Single Course Card */}
          {courses.map((course) => (
            <CourseItem
              course={course}
              containerClass="col-lg-6 col-xl-4 col-md-6 col-12"
              key={course.id}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ed-pagination">
              <ul className="ed-pagination__list">
                <li className="active">
                  <a href="#">01</a>
                </li>
                <li>
                  <a href="#">02</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi-rr-arrow-small-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Course4 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 23,
      teacher: "Harrison Stone",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-2/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 4,
      teacher: "Alexander Wells",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-2/2.png",
    },
  ];
  return (
    <section className="ed-course ed-course--style2 section-gap position-relative background-image section-bg-7">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">BEST SELLER</span>
              <h3 className="ed-section-head__title">
                Our Best Selling Courses
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Single Course Card */}
          {courses.map((course) => (
            <CourseItem2
              course={course}
              containerClass="col-lg-6 col-xl-6 col-md-6 col-12"
              key={course.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseItem = ({
  course,
  containerClass = "col-lg-6 col-xl-4 col-md-6 col-12",
}: {
  course: any;
  containerClass?: string;
}) => {
  return (
    <div className={containerClass}>
      <div className="ed-course__card wow fadeInUp" data-wow-duration="1s">
        <Link href="/course-details" className="ed-course__img">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src={course.image}
            alt="course-img"
          />
        </Link>
        <Link href="/course-1" className="ed-course__tag">
          {course.name}
        </Link>
        <div className="ed-course__body">
          <div className="ed-course__lesson">
            <div className="ed-course__part">
              <i className="fi-rr-book" />
              <p>{course.lessons} Lessons</p>
            </div>
            <div className="ed-course__teacher">
              <i className="fi-rr-user" />
              <p>{course.teacher}</p>
            </div>
          </div>
          <Link href="/course-details" className="ed-course__title">
            <h5>{course.title}</h5>
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
                <span>
                  ({course.reviews > 9 ? course.reviews : "0" + course.reviews}{" "}
                  Reviews)
                </span>
              </li>
            </ul>
          </div>
          <div className="ed-course__bottom">
            <span className="ed-course__price">${course.price}</span>
            <div className="ed-course__students">
              <i className="fi fi-rr-graduation-cap" />
              <p>{course.students} Students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseItem2 = ({
  course,
  containerClass = "col-lg-6 col-xl-6 col-md-6 col-12",
}: {
  course: any;
  containerClass?: string;
}) => {
  return (
    <div className={`${containerClass}`}>
      <div
        className="ed-course__card ed-course__card--style2 wow fadeInUp"
        data-wow-duration="1s"
      >
        <div className="ed-course__head position-relative">
          <Link href="/course-details" className="ed-course__img">
            <Image
              width={250}
              height={222}
              src={course.image}
              alt="course-img"
            />
          </Link>
          <Link href="/course-1" className="ed-course__tag">
            {course.name}
          </Link>
          <a href="#" className="ed-course__bookmarked">
            <i className="fi fi-rr-bookmark" />
          </a>
        </div>
        <div className="ed-course__body">
          <div className="ed-course__lesson">
            <div className="ed-course__part">
              <i className="fi-rr-book" />
              <p>{course.lessons} Lessons</p>
            </div>
            <div className="ed-course__teacher">
              <i className="fi-rr-user" />
              <p>{course.teacher}</p>
            </div>
          </div>
          <Link href="/course-details" className="ed-course__title">
            <h5>{course.title}</h5>
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
                <span>
                  ({course.reviews > 9 ? course.reviews : "0" + course.reviews}{" "}
                  Reviews)
                </span>
              </li>
            </ul>
          </div>
          <div className="ed-course__bottom">
            <span className="ed-course__price">$383.00</span>
            <div className="ed-course__students">
              <i className="fi fi-rr-graduation-cap" />
              <p>{course.students} Students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Course5 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    teacherImage: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 23,
      teacher: "Harrison Stone",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-1.jpg",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-4/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 4,
      teacher: "Alexander Wells",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-2.jpg",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-4/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 87,
      teacher: "John Smith",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-3.jpg",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-4/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "Exploring Learning Landscapes in Academic Business",
      lessons: 4,
      teacher: "Gabriel Cross",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-4.jpg",
      price: 356,
      students: 352,
      reviews: 65,
      image: "/assets/images/course/course-4/4.png",
    },
    {
      id: 5,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-5.jpg",
      price: 643,
      students: 553,
      reviews: 23,
      image: "/assets/images/course/course-4/5.png",
    },
    {
      id: 6,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-6.jpg",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-4/6.png",
    },
  ];
  return (
    <section
      className="ed-course section-gap position-relative background-image"
      style={{ backgroundImage: 'url("./assets/images/section-bg-9.png")' }}
    >
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-section-head d-flex-between">
              <div className="ed-section-head__info">
                <span className="ed-section-head__sm-title">
                  ONLINE COURSES
                </span>
                <h3 className="ed-section-head__title m-0 ed-split-text left">
                  Get Your Course With Us
                </h3>
              </div>
              <div className="ed-section-head__btn">
                <Link href="/course-1" className="ed-btn">
                  View All Courses
                  <i className="fi fi-rr-arrow-small-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-6 col-xl-4 col-md-6 col-12" key={course.id}>
              <div className="ed-course__card ed-course__card--style3 ed-course__card--style4 wow fadeInUp">
                <div className="ed-course__cover">
                  <Link href="/course-details" className="ed-course__img">
                    <Image
                      width={250}
                      height={222}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      src={course.image}
                      alt="course-img"
                    />
                  </Link>
                </div>
                <div className="ed-course__body">
                  <div className="ed-course__rattings mg-btm-10">
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
                        <span>
                          (
                          {course.reviews > 9
                            ? course.reviews
                            : "0" + course.reviews}{" "}
                          Reviews)
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/course-details" className="ed-course__title">
                    <h5>{course.title}</h5>
                  </Link>
                  <div className="ed-course__lesson m-0">
                    <div className="ed-course__part">
                      <i className="fi-rr-book" />
                      <p>{course.lessons} Lessons</p>
                    </div>
                    <div className="ed-course__students">
                      <i className="fi fi-rr-graduation-cap" />
                      <p>{course.students} Students</p>
                    </div>
                  </div>
                  <div className="ed-course__bottom">
                    <div className="ed-course__teacher">
                      <Image
                        width={28}
                        height={28}
                        src={course.teacherImage}
                        alt="course-instructor-thumb"
                      />
                      <Link href="/course-1">{course.teacher}</Link>
                    </div>
                    <span className="ed-course__price">${course.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Course6 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    teacherImage: string;
    description: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 23,
      teacher: "Harrison Stone",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-1.jpg",
      description: "Data Competitive Strategy law and Organization Course",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-1/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 4,
      teacher: "Alexander Wells",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-2.jpg",
      description: "Grow Personal Financial Security Thinking & Principles",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-1/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 87,
      teacher: "John Smith",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-3.jpg",
      description: "The Complete Guide to Build RESTful API Application",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-1/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "Exploring Learning Landscapes in Academic Business",
      lessons: 4,
      teacher: "Gabriel Cross",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-4.jpg",
      description: "Exploring Learning Landscapes in Academic Business",
      price: 356,
      students: 352,
      reviews: 65,
      image: "/assets/images/course/course-1/4.png",
    },
    {
      id: 5,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-5.jpg",
      description: "Voices from the Learning Manage Education Hub",
      price: 643,
      students: 553,
      reviews: 23,
      image: "/assets/images/course/course-1/5.png",
    },
    {
      id: 6,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      teacherImage:
        "/assets/images/course/course-3/course-instructor-thumb-6.jpg",
      description: "Voices from the Learning Manage Education Hub",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/6.png",
    },
  ];
  return (
    <section className="ed-course section-gap position-relative home-4">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">ONLINE COURSES</span>
              <h3 className="ed-section-head__title ed-split-text left">
                Get Your Course With Us
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-6 col-xl-4 col-md-6 col-12" key={course.id}>
              <div
                className="ed-course__card ed-course__card--style3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <Link href="/course-details" className="ed-course__img">
                  <img src={course.image} alt="course-img" />
                </Link>
                <Link href="/course-1" className="ed-course__tag">
                  {course.name}
                </Link>
                <div className="ed-course__body">
                  <div className="ed-course__lesson">
                    <div className="ed-course__part">
                      <i className="fi-rr-book" />
                      <p>{course.lessons} Lessons</p>
                    </div>
                    <div className="ed-course__rattings">
                      <ul>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <span>
                            {course.reviews} ({course.reviews})
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/course-details" className="ed-course__title">
                    <h5>{course.title}</h5>
                  </Link>
                  <p>{course.description}</p>
                  <div className="ed-course__bottom">
                    <div className="ed-course__teacher">
                      <img
                        src={course.teacherImage}
                        alt="course-instructor-thumb"
                      />
                      <Link href="/course-1">{course.teacher}</Link>
                    </div>
                    <span className="ed-course__price">${course.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ed-section-bottom-btn">
              <Link href="/course-1" className="ed-btn">
                View All Courses
                <i className="fi fi-rr-arrow-small-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Course7 = () => {
  const courses: {
    id: number;
    name: string;
    title: string;
    lessons: number;
    teacher: string;
    price: number;
    students: number;
    reviews: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "Data Science",
      title: "Grow Personal Financial Security Thinking & Principles",
      lessons: 23,
      teacher: "Harrison Stone",
      price: 674,
      students: 673,
      reviews: 9,
      image: "/assets/images/course/course-1/1.png",
    },
    {
      id: 2,
      name: "Business",
      title: "Data Competitive Strategy law and Organization Course",
      lessons: 4,
      teacher: "Alexander Wells",
      price: 633,
      students: 964,
      reviews: 67,
      image: "/assets/images/course/course-1/2.png",
    },
    {
      id: 3,
      name: "Design",
      title: "The Complete Guide to Build RESTful API Application",
      lessons: 87,
      teacher: "John Smith",
      price: 383,
      students: 316,
      reviews: 87,
      image: "/assets/images/course/course-1/3.png",
    },
    {
      id: 4,
      name: "Development",
      title: "Exploring Learning Landscapes in Academic Business",
      lessons: 4,
      teacher: "Gabriel Cross",
      price: 356,
      students: 352,
      reviews: 65,
      image: "/assets/images/course/course-1/4.png",
    },
    {
      id: 5,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 643,
      students: 553,
      reviews: 23,
      image: "/assets/images/course/course-1/5.png",
    },
    {
      id: 6,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/6.png",
    },
    {
      id: 7,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/7.png",
    },
    {
      id: 8,
      name: "Marketing",
      title: "Voices from the Learning Manage Education Hub",
      lessons: 4,
      teacher: "Maxwell Ford",
      price: 356,
      students: 352,
      reviews: 94,
      image: "/assets/images/course/course-1/8.png",
    },
  ];
  return (
    <section className="ed-course section-gap position-relative">
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-course__filter">
              <p className="ed-course__filter-text">
                Showing 1-6 Of 15 Results
              </p>
              <div className="ed-course__filter-search">
                <form action="#" method="post" className="ed-hero__search-form">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search your courses..."
                    required={true}
                  />
                  <button type="submit">
                    Search
                    <i className="fi-rr-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-6 col-xl-6 col-md-6 col-12" key={course.id}>
              <div
                className="ed-course__card ed-course__card--style2 wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="ed-course__head position-relative">
                  <Link href="/course-details" className="ed-course__img">
                    <img src={course.image} alt="course-img" />
                  </Link>
                  <Link href="/course-1" className="ed-course__tag">
                    {course.name}
                  </Link>
                  <a href="#" className="ed-course__bookmarked">
                    <i className="fi fi-rr-bookmark" />
                  </a>
                </div>
                <div className="ed-course__body">
                  <div className="ed-course__lesson">
                    <div className="ed-course__part">
                      <i className="fi-rr-book" />
                      <p>{course.lessons} Lessons</p>
                    </div>
                    <div className="ed-course__teacher">
                      <i className="fi-rr-user" />
                      <p>{course.teacher}</p>
                    </div>
                  </div>
                  <Link href="/course-details" className="ed-course__title">
                    <h5>{course.title}</h5>
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
                        <span>({course.reviews} Reviews)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="ed-course__bottom">
                    <span className="ed-course__price">${course.price}</span>
                    <div className="ed-course__students">
                      <i className="fi fi-rr-graduation-cap" />
                      <p>{course.students} Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ed-pagination">
              <ul className="ed-pagination__list">
                <li className="active">
                  <a href="#">01</a>
                </li>
                <li>
                  <a href="#">02</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi-rr-arrow-small-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
