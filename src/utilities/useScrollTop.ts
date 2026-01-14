export const useScrollTop = () => {
  // Document ready equivalent
  const progressPath = document.querySelector(
    ".progress-wrap path"
  ) as SVGPathElement;
  const pathLength = progressPath?.getTotalLength() ?? 0;

  // Set up the progress path
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = `${pathLength}`;
  progressPath.getBoundingClientRect(); // Force render
  progressPath.style.transition = progressPath.style.webkitTransition =
    "stroke-dashoffset 10ms linear";

  // Update progress on scroll
  const updateProgress = function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scrollTop * pathLength) / scrollHeight;
    progressPath.style.strokeDashoffset = `${progress}`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress);

  // Show/hide progress button
  window.addEventListener("scroll", function () {
    const progressWrap = document.querySelector(".progress-wrap");
    if (window.pageYOffset > 50) {
      progressWrap?.classList.add("active-progress");
    } else {
      progressWrap?.classList.remove("active-progress");
    }
  });

  // Scroll to top on click
  document
    .querySelector(".progress-wrap")
    ?.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
};
