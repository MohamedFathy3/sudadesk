import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const eduna_config = {
  sticky_header() {
    window.addEventListener("scroll", function (event) {
      var scroll = window.pageYOffset;
      if (scroll < 100) {
        document.querySelector(".ed-header")?.classList.remove("sticky");
      } else {
        document.querySelector(".ed-header")?.classList.add("sticky");
      }
    });
  },
  animation() {
    const st = document.querySelectorAll<HTMLElement>(".ed-split-text");
    if (st.length === 0) return;
    gsap.registerPlugin(SplitType);
    st.forEach((el, index) => {
      // @ts-ignore
      el.split = new SplitType(el, {
        types: ["lines", "words", "chars"],
        lineClass: "tp-split-line",
      });
      gsap.set(el, { perspective: 400 });

      if (el.classList.contains("right")) {
        // @ts-ignore
        gsap.set(el.split.chars, {
          opacity: 0,
          x: "50",
          ease: "Back.easeOut",
        });
      }
      if (el.classList.contains("left")) {
        // @ts-ignore
        gsap.set(el.split.chars, {
          opacity: 0,
          x: "-50",
          ease: "circ.out",
        });
      }
      if (el.classList.contains("up")) {
        // @ts-ignore
        gsap.set(el.split.chars, {
          opacity: 0,
          y: "80",
          ease: "circ.out",
        });
      }
      if (el.classList.contains("down")) {
        // @ts-ignore
        gsap.set(el.split.chars, {
          opacity: 0,
          y: "-80",
          ease: "circ.out",
        });
      }
      // @ts-ignore
      el.anim = gsap.to(el.split.chars, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        x: "0",
        y: "0",
        rotateX: "0",
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
      });
    });
  },
  movie_animation() {
    const elementWrapper = document.querySelector(".element-wrapper");
    const elementMove = document.querySelectorAll(".element-move");
    const elementMoveX = document.querySelectorAll(".element-move-x");

    elementWrapper?.addEventListener("mousemove", (e) => {
      const { clientX: mouseX, clientY: mouseY } = e as MouseEvent;

      const centerX = elementWrapper.clientWidth / 2;
      const centerY = elementWrapper.clientHeight / 2;

      const offsetX = (mouseX - centerX) / 70;
      const offsetY = (mouseY - centerY) / 70;

      elementMove.forEach((image, index) => {
        const offset = index + 1;
        (image as HTMLElement).style.transform = `translate(${
          offsetX * offset
        }px, ${offsetY * offset}px)`;
      });
      elementMoveX.forEach((image, index) => {
        const offset = index + 2;
        (image as HTMLElement).style.transform = `translate(${
          offsetX * offset
        }px)`;
      });
    });
  },
  smooth_scroll() {
    ScrollSmoother.create({
      smooth: 0.5,
      effects: true,
      smoothTouch: 0.5,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
  },
  scroll_animation() {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.WOW = require("wowjs");
    }
    // @ts-ignore
    new WOW.WOW().init();
  },
};
