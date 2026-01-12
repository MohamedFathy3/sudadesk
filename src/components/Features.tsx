import Image from "next/image";

export const Features1 = () => {
  const features: {
    id: number;
    name: string;
    bg: string;
    icon: string;
    description: string;
  }[] = [
    {
      id: 1,
      name: "Educator Support",
      bg: "bg-1",
      icon: "/assets/images/features/features-1/1.svg",
      description:
        "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    },
    {
      id: 2,
      name: "Top Instructor",
      bg: "bg-2",
      icon: "/assets/images/features/features-1/2.svg",
      description:
        "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    },
    {
      id: 3,
      name: "Award Wining",
      bg: "bg-3",
      icon: "/assets/images/features/features-1/3.svg",
      description:
        "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    },
  ];
  return (
    <section className="ed-features position-relative">
      <div className="ed-category__shapes">
        <Image
          width={49}
          height={80}
          sizes="49px"
          style={{ width: "49px", height: "80px" }}
          className="ed-category__shape-1 updown-ani"
          src="/assets/images/features/features-1/shape-1.svg"
          alt="shape-1"
        />
        <Image
          width={45}
          height={37}
          sizes="45px"
          style={{ width: "45px", height: "37px" }}
          className="ed-category__shape-2 rotate-ani"
          src="/assets/images/features/features-1/shape-2.svg"
          alt="shape-2"
        />
      </div>
      <div className="container ed-container">
        <div className="row">
          {/* Single Features Card  */}
          {features.map((feature) => (
            <div className="col-lg-4 col-md-6 col-12" key={feature.id}>
              <div
                className="ed-features__card wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className={`ed-features__icon icon-bg ${feature.bg}`}>
                  <Image
                    width={30}
                    height={30}
                    sizes="30px"
                    style={{ width: "30px", height: "30px" }}
                    src={feature.icon}
                    alt="icon"
                  />
                </div>
                <div className="ed-features__info">
                  <h4>{feature.name}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
