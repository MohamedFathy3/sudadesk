import Image from "next/image";
import Link from "next/link";



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



const CourseItem = ({
  course,
  containerClass = "col-lg-6 col-xl-4 col-md-6 col-12",
}: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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



