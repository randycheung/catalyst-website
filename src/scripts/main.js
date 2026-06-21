import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initSmoothScroll() {
  if (prefersReducedMotion) return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function initNav() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: { targets: nav, className: "nav-solid" },
  });
}

function initHero() {
  const lines = document.querySelectorAll("[data-hero-line]");
  if (!lines.length) return;

  gsap.set(lines, { yPercent: 110 });
  gsap.to(lines, {
    yPercent: 0,
    duration: 1.1,
    ease: "power3.out",
    stagger: 0.1,
    delay: 0.2,
  });

  const cue = document.querySelector("[data-scroll-cue]");
  if (cue) {
    gsap.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    gsap.to(cue, {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });
  }
}

function initReveals() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
      },
    });
  });

  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    const items = group.querySelectorAll("[data-reveal-item]");
    if (!items.length) return;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 28 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
      },
    });
  });
}

function initCounters() {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const raw = el.dataset.counter;
    const target = parseFloat(raw);
    const decimals = (raw.split(".")[1] || "").length;

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      },
    });
  });
}

function initMarquee() {
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    if (prefersReducedMotion) return;

    const speed = parseFloat(track.dataset.marqueeSpeed) || 50;
    const distance = track.scrollWidth / 2;

    gsap.to(track, {
      x: -distance,
      duration: distance / speed,
      repeat: -1,
      ease: "none",
    });
  });
}

function initDrawPaths() {
  document.querySelectorAll("[data-draw-path]").forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      opacity: 1,
      strokeDasharray: length,
      strokeDashoffset: prefersReducedMotion ? 0 : length,
    });

    if (prefersReducedMotion) return;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
      },
    });
  });
}

function initHorizontalScroll() {
  const section = document.querySelector("[data-horizontal-section]");
  const track = section?.querySelector("[data-horizontal-track]");
  if (!section || !track || prefersReducedMotion) return;

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      const distance = track.scrollWidth - section.offsetWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
  });
}

function init() {
  initSmoothScroll();
  initNav();
  initHero();
  initReveals();
  initCounters();
  initMarquee();
  initDrawPaths();
  initHorizontalScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
