class Swips {
  #swipers = new Map();

  bp() {
    const breakpoints = this.#swipers.keys();
    for (const breakpoint of breakpoints) {
      if (breakpoint !== "") {
        window.matchMedia(`(${breakpoint})`);
      }
    }
  }

  check() {}

  /** Setup swiper based on options */
  #setupSwiper(swiperSelector, swiperOptions) {
    let res = false;
    try {
      res = new Swiper(swiperSelector, swiperOptions);
    } catch (err) {
      console.log(`Swips::setupSwiper - Error, instance is not created!`);
    }
    return res;
  }

  /** Add swiper with following parameters */
  addSwiper(swiperSelector, breakResolution, swiperOptions) {
    // Check if swiper selectable on this page
    if (document.querySelector(swiperSelector)) {
      console.log(`Element - ${swiperSelector} - is available!`);
      // setup swiper
      //   const swiper = this.#setupSwiper(swiperSelector, swiperOptions);

      // Check if category exists
      if (this.#swipers.has(breakResolution)) {
        // category
        const category = this.#swipers.get(breakResolution);
        // position of the new swiper
        const size = category.size;
        // add swiper to that category
        // category.set(size, swiper);                                  //KEK
        category.set(size, [swiperSelector, swiperOptions]);
      }
      // if it does not -> create a new one
      else {
        // Create category with this swiper
        this.#swipers.set(breakResolution, new Map());
        // this.#swipers.get(breakResolution).set(0, swiper);           //KEK
        this.#swipers
          .get(breakResolution)
          .set(0, [swiperSelector, swiperOptions]);
      }
    }
    return this.#swipers;
  }
}

const swips = new Swips();
swips.addSwiper(".swiper", "", {
  autoplay: {
    delay: 5000,
  },
  speed: 2000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
swips.addSwiper(".faq-tabs__buttons-block", "", {
  slidesPerView: 3.5,

  navigation: {
    nextEl: "#faqArrow",
  },
  scrollbar: {
    el: ".faq-scrollbar",
    draggable: true,
  },
  watchOverflow: "true",
});
swips.addSwiper(".swiper-products", "min-width:768px", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,

  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: ".swiper-products-pagination",
    clickable: true,
  },
});
swips.addSwiper(".swiper-result", "min-width:768px", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,

  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: ".swiper-result-pagination",
    clickable: true,
  },
});
swips.addSwiper(".swiper-library", "min-width:768px", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,

  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: ".swiper-library-pagination",
    clickable: true,
  },
});
swips.addSwiper(".articles-swiper", "min-width:992px", {
  loop: true,

  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,

  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: ".articles-swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    574: {
      slidesPerView: 1.8,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
  },
});
swips.addSwiper(".articles-swiper2", "min-width:992px", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,

  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: ".articles-swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    574: {
      slidesPerView: 1.8,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
  },
});

// elementSelector, breakableResolution, options(pagination->pagination class,...)

// if(document.querySelector(elementSelector)){
//     if(breakableResolution !== ""){
//         if(Map.has(breakableResolution)){
//             Map[breakableResolution].push new swiper;
//             breakpoint;
//             breakpoint.listener -> What to do?
//             What to do: if(resolution Matches->destroy, else ->add swiper + options;
//         }
//         else map
//     }
//     else{Add swiper raw}
// }

// function(breakON=true, breakResolution){
//     if
// }

// swiper name:

// autoplay: {
//     delay: 5000,
//   },

//   speed: 2000,                          // Only when autoplay!

// pagination: {
//     el: ".swiper-pagination",           // Only when pagination!
//     clickable: true,
//   },

// slidesPerView: 3.5,

// navigation: {
//     nextEl: ".swiper-button-next",       // Optional
//     prevEl: ".swiper-button-prev",       // Optional
//   },

//------------------------------------------------------------------------

// new Swiper(".swiper", {
//   autoplay: {
//     delay: 5000,
//   },
//   speed: 2000,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// new Swiper(".faq-tabs__buttons-block", {
//   slidesPerView: 3.5,

//   navigation: {
//     nextEl: "#faqArrow",
//   },
//   scrollbar: {
//     el: ".faq-scrollbar",
//     draggable: true,
//   },
//   watchOverflow: "true",
// });

// new Swiper(clName1, {
//   loop: true,
//   slidesPerView: 1,
//   spaceBetween: 30,
//   centeredSlides: true,

//   a11y: true,
//   keyboardControl: true,
//   grabCursor: true,

//   // pagination
//   pagination: {
//     el: clName2,
//     clickable: true,
//   },
// });

// new Swiper(".articles-swiper2", {
//   loop: true,
//   slidesPerView: 1,
//   spaceBetween: 30,
//   centeredSlides: true,

//   a11y: true,
//   keyboardControl: true,
//   grabCursor: true,

//   // pagination
//   pagination: {
//     el: ".articles-swiper-pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     574: {
//       slidesPerView: 1.8,
//       spaceBetween: 10,
//     },
//     768: {
//       slidesPerView: 2.5,
//       spaceBetween: 30,
//     },
//   },
// });

// new Swiper(".swiper-container", {
//   spaceBetween: 10,
//   slidesPerView: 1,
//   centeredSlides: true,
//   roundLengths: true,
//   loop: true,
//   loopAdditionalSlides: 30,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   breakpoints: {
//     574: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: -30,
//     },
//     1200: {
//       slidesPerView: 3,
//       spaceBetween: -30,
//     },
//   },
// });

// new Swiper(".swiper-about", {
//   spaceBetween: 30,
//   slidesPerView: 1,
//   centeredSlides: true,
//   roundLengths: true,
//   loop: true,

//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".about-swiper-pagination",
//     clickable: true,
//   },
// });
