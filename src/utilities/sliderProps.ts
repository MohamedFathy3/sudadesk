import SwiperCore from "swiper";
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Grid,
  Navigation,
  Pagination,
  Parallax,
  Thumbs,
} from "swiper/modules";
SwiperCore.use([
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
  Grid,
  Parallax,
  FreeMode,
  Thumbs,
]);
export const sliderProps = {
  testimonial: {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: ".owl-next",
      prevEl: ".owl-prev",
    },
  },
  testimonial_2: {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  },
  partner: {
    slidesPerView: 6,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    speed: 500,
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  },
  category__slider: {
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
      1600: {
        slidesPerView: 7,
      },
      1800: {
        slidesPerView: 8,
      },
    },
  },
  partner__slider_2: {
    slidesPerView: 1,
    loop: true,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  },
  partner__slider_2_reverse: {
    slidesPerView: 1,
    loop: true,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  },
};
