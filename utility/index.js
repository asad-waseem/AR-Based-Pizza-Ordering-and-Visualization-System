export const foodkingUtility = {
  scrollAnimation() {
    if (typeof window !== "undefined") {
      const WOW = require("wowjs");
      new WOW.WOW().init();
    }
  },
  stickyNav() {
    if (typeof window === "undefined") return;
    const header = document.getElementById("header-sticky");
    if (!header) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 250) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
  },
  preloader() {
    if (typeof document === "undefined") return;
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;
    preloader.classList.add("loaded");
    setTimeout(function () {
      preloader.style.transition = "opacity 0.6s";
      preloader.style.opacity = "0";
      preloader.addEventListener("transitionend", function () {
        preloader.style.display = "none";
      });
    }, 600);
  },
  sliderAnimation(slides) {
    if (!slides) return;
    slides.forEach((slide) => {
      const animatedElements = slide.querySelectorAll("[data-animation]");
      animatedElements.forEach((element) => {
        const anim = element.getAttribute("data-animation") || "fadeInUp";
        let delay = element.getAttribute("data-delay") || "0s";
        let duration = element.getAttribute("data-duration") || "1s";
        if (!duration.endsWith("s") && !duration.endsWith("ms")) {
          duration = duration + "s";
        }
        if (!delay.endsWith("s") && !delay.endsWith("ms")) {
          delay = delay + "s";
        }

        // Reset animation
        element.style.animation = "none";
        element.offsetHeight; // Trigger reflow
        element.style.animation = `${anim} ${duration} ${delay} both`;

        // Add animation class
        element.classList.add("animated");

        // Remove animation class after animation ends
        element.addEventListener(
          "animationend",
          () => {
            element.classList.remove("animated");
          },
          { once: true }
        );
      });
    });
  },
};
