import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GATE_PASSWORD = "Catalyst2026!";
const GATE_STORAGE_KEY = "catalyst-gate-unlocked";

function initPasswordGate(onUnlock) {
  const gate = document.querySelector("[data-gate]");
  const form = document.querySelector("[data-gate-form]");
  const input = document.querySelector("[data-gate-input]");
  const error = document.querySelector("[data-gate-error]");
  const content = document.getElementById("site-content");
  if (!gate || !form || !input) return;

  input.focus();

  const unlock = () => {
    try {
      localStorage.setItem(GATE_STORAGE_KEY, "true");
    } catch (e) {}

    if (prefersReducedMotion) {
      document.documentElement.classList.add("gate-unlocked");
      onUnlock?.();
      return;
    }

    gsap.to(gate, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        document.documentElement.classList.add("gate-unlocked");
        onUnlock?.();
        if (content) {
          gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
        }
      },
    });
  };

  const reject = () => {
    error?.classList.remove("hidden");
    input.value = "";
    input.focus();

    if (prefersReducedMotion) return;

    input.classList.remove("animate-shake");
    void input.offsetWidth;
    input.classList.add("animate-shake");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === GATE_PASSWORD) {
      unlock();
    } else {
      reject();
    }
  });
}

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
  const pre = document.querySelectorAll("[data-hero-pre]");
  const letters = document.querySelectorAll("[data-letter]");
  const lines = document.querySelectorAll("[data-hero-line]");
  const cue = document.querySelector("[data-scroll-cue]");

  if (prefersReducedMotion) {
    gsap.set([...pre, ...letters, ...lines], { opacity: 1, yPercent: 0, y: 0 });
    if (cue) gsap.set(cue, { opacity: 1 });
    return;
  }

  const tl = gsap.timeline({ delay: 0.3 });

  if (pre.length) {
    tl.to(pre, { yPercent: 0, duration: 0.7, ease: "power3.out" });
  }
  if (letters.length) {
    tl.to(
      letters,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.025,
      },
      "-=0.3"
    );
  }
  if (lines.length) {
    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      },
      "-=0.2"
    );
  }
  if (cue) {
    tl.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3");
    gsap.to(cue, {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });
  }
}

function initHeroParallax() {
  const bg = document.querySelector("[data-hero-bg]");
  const hero = bg?.closest("section");
  if (!bg || !hero || prefersReducedMotion) return;

  gsap.to(bg, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
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

function initFlipCards() {
  document.querySelectorAll("[data-flip-group]").forEach((group) => {
    const cards = group.querySelectorAll("[data-flip-card]");
    if (!cards.length) return;

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, rotationY: 0, x: 0 });
      return;
    }

    gsap.set(cards, { transformPerspective: 1200, rotationY: -70, x: 40 });
    gsap.to(cards, {
      opacity: 1,
      rotationY: 0,
      x: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: group,
        start: "top 80%",
      },
    });
  });
}

function initPhilosophy() {
  const section = document.querySelector("[data-philosophy-section]");
  const items = section?.querySelectorAll("[data-philosophy-item]");
  const dots = section?.querySelectorAll("[data-philosophy-dot]");
  if (!section || !items?.length) return;

  if (prefersReducedMotion) {
    gsap.set(items, { opacity: 1 });
    return;
  }

  gsap.set(items, { opacity: 0, scale: 0.96 });
  gsap.set(items[0], { opacity: 1, scale: 1 });
  if (dots?.length) dots[0].style.backgroundColor = "var(--color-gold)";

  const segments = items.length;
  let activeIndex = 0;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${window.innerHeight * Math.max(1, segments - 1)}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const idx = Math.min(segments - 1, Math.floor(self.progress * segments));
      if (idx === activeIndex) return;
      activeIndex = idx;

      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: i === idx ? 1 : 0,
          scale: i === idx ? 1 : 0.96,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      });

      dots?.forEach((dot, i) => {
        dot.style.backgroundColor = i === idx ? "var(--color-gold)" : "";
      });
    },
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

function initSiteAnimations() {
  initSmoothScroll();
  initNav();
  initHero();
  initHeroParallax();
  initReveals();
  initFlipCards();
  initPhilosophy();
  initCounters();
  initMarquee();
  initDrawPaths();
  initHorizontalScroll();
  ScrollTrigger.refresh();
}

function init() {
  if (document.documentElement.classList.contains("gate-unlocked")) {
    initSiteAnimations();
    return;
  }

  initPasswordGate(initSiteAnimations);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
