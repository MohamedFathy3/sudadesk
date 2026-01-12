import Link from "next/link";

const PageBanner = ({
  pageTitle,
  pageName = "Our Courses",
}: {
  pageTitle?: string;
  pageName?: string;
}) => {
  return (
    <div className="section-bg hero-bg">
      {/* Start Bredcrumbs Area */}
      <section className="ed-breadcrumbs background-image breadcrumbs-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="ed-breadcrumbs__content">
                <h3 className="ed-breadcrumbs__title">
                  {pageTitle || pageName}
                </h3>
                <ul className="ed-breadcrumbs__menu">
                  <li className="active">
                    <Link href="/">Home</Link>
                  </li>
                  <li>/</li>
                  <li>{pageName}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Bredcrumbs Area */}
    </div>
  );
};
export default PageBanner;
