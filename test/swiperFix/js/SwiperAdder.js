class Swips {
  // Swiper storage
  #swipers = new Map();

  /** Initialize all swipers */
  init() {
    // Iterate over all added swipers
    this.#swipers.forEach((swipersMap, breakpointStr) => {
      // If swiper category has a breakpoint...
      if (breakpointStr !== "") {
        // Create a breakpoint
        const match = window.matchMedia(`(${breakpointStr})`);
        // Add listener to breakpoint
        match.addListener(() => {
          this.#swiperListener(match, swipersMap);
        });
      }
      // If swiper category doesn't have breakpoint
      else {
        // Iterate over all swipers w/o breakpoint and build them
        swipersMap.forEach((obj) => {
          obj.swiper = this.#buildSwiper(obj.selector, obj.options);
        });
      }
    });
  }

  /** Function to handle swipers on different screen sizes */
  #swiperListener(match, breakpointMap) {
    // When category listener fires
    if (match.matches) {
      // iterate over all swipers from this category
      breakpointMap.forEach((obj) => {
        // if there is swiper there
        if (obj.swiper !== null) {
          // destroy it
          obj.swiper.destroy(true, true);
        }
        // aaa
        // else {
        //   return;
        // }
      });
    } else {
      breakpointMap.forEach((obj) => {
        obj.swiper = this.#buildSwiper(obj.selector, obj.options);
      });
    }
  }

  /** Setup swiper based on options */
  #buildSwiper(swiperSelector, swiperOptions) {
    // result variable
    let res = false;
    // try to create swiper with passed arguments
    try {
      res = new Swiper(swiperSelector, swiperOptions);
    } catch (err) {
      // log error if try failed
      console.log(`Swips::buildSwiper - Error, instance is not created!`);
    }
    // return swiper
    return res;
  }

  /** Add swiper with following parameters */
  addSwiper(swiperSelector, breakResolution, swiperOptions) {
    // Check if swiper selectable on this page
    if (document.querySelector(swiperSelector)) {
      // Check if breakpoint category exists
      if (this.#swipers.has(breakResolution)) {
        // breakpoint category
        const category = this.#swipers.get(breakResolution);
        // position of the new swiper
        const size = category.size;
        // add swiper slot (with options) to that breakpoint category
        category.set(size, {
          selector: swiperSelector,
          options: swiperOptions,
          swiper: null,
        });
      }
      // if it does not -> create a new one
      else {
        // Create category with this swiper
        this.#swipers.set(breakResolution, new Map());
        // initialize first swiper slot (with options)
        this.#swipers.get(breakResolution).set(0, {
          selector: swiperSelector,
          options: swiperOptions,
          swiper: null,
        });
      }
    }
    return this.#swipers;
  }
}

//
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
swips.init();
