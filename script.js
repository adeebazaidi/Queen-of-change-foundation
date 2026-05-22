const html = document.documentElement;
const btn = document.getElementById("themeToggle");
const nav = document.querySelector("nav");

const saved = localStorage.getItem("qoc-theme") || "light";
html.setAttribute("data-theme", saved);

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  hero.style.backgroundPositionY = `${-(scrolled * 0.15)}px`;

  requestAnimationFrame(() => {
    heroContent.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
  });

  if (scrolled > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

btn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("qoc-theme", next);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Stagger pillar cards
document.querySelectorAll(".pillar-card").forEach((c, i) => {
  c.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll(".stats-inner > div").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

/* ── IMPACT COUNTER ── */

const impactCounters = document.querySelectorAll(".impact-number");

const impactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;

        const target = +counter.getAttribute("data-target");

        let current = 0;

        const increment = target / 100;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            if (target === 100) {
              counter.innerText = Math.floor(current) + "%";
            } else {
              counter.innerText =
                Math.floor(current).toLocaleString("en-IN") + "+";
            }

            requestAnimationFrame(updateCounter);
          } else {
            if (target === 100) {
              counter.innerText = "100%";
            } else {
              counter.innerText = target.toLocaleString("en-IN") + "+";
            }
          }
        };

        updateCounter();

        impactObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 },
);

impactCounters.forEach((counter) => {
  impactObserver.observe(counter);
});
//animate
const counters = document.querySelectorAll(".stat-num");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");

        let current = 0;

        const increment = target / 120;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            if (target >= 1000) {
              counter.innerText = Math.floor(current).toLocaleString() + "+";
            } else if (target === 94) {
              counter.innerText = Math.floor(current) + "%";
            } else {
              counter.innerText = Math.floor(current);
            }

            requestAnimationFrame(updateCounter);
          } else {
            if (target >= 1000) {
              counter.innerText = target.toLocaleString() + "+";
            } else if (target === 94) {
              counter.innerText = target + "%";
            } else {
              counter.innerText = target;
            }
          }
        };

        updateCounter();

        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});
