import { useState, useEffect, useRef } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("qoc-theme") || "light";
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const heroRef = useRef(null);
  const heroContentRef = useRef(null);

  // Sync theme attribute and local storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("qoc-theme", theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Scroll listener for parallax hero and navigation bar scrolled class
  useEffect(() => {
    const handleScroll = () => {
      const scrolledValue = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${-(scrolledValue * 0.15)}px`;
      }
      requestAnimationFrame(() => {
        if (heroContentRef.current) {
          heroContentRef.current.style.transform = `translate3d(0, ${scrolledValue * 0.12}px, 0)`;
        }
      });
      if (scrolledValue > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for elements with the .reveal class
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for impact counters and stat numbers
  useEffect(() => {
    const impactCounters = document.querySelectorAll(".impact-number");
    const impactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            const duration = 800; // 800ms duration
            let startTime = null;

            const updateCounter = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = progress * target;

              if (progress < 1) {
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

            requestAnimationFrame(updateCounter);
            impactObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    impactCounters.forEach((counter) => {
      impactObserver.observe(counter);
    });

    const counters = document.querySelectorAll(".stat-num");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            const duration = 800; // 800ms duration
            let startTime = null;

            const updateCounter = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = progress * target;

              if (progress < 1) {
                if (target >= 1000) {
                  counter.innerText =
                    Math.floor(current).toLocaleString() + "+";
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

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });

    return () => {
      impactObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={isScrolled ? "scrolled" : ""}>
        <div className="nav-logo">Queens Of Change</div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#impact">Impact</a>
            <a href="#stats">Stats</a>
            <a href="#pillars">Programs</a>
            <a href="#journey">Journey</a>
            <a href="#volunteer">Volunteer</a>
          </div>
          {/* THEME TOGGLE */}
          <button
            className="theme-toggle"
            id="themeToggle"
            aria-label="Toggle dark/light mode"
            onClick={toggleTheme}
          >
            <div className="knob">
              {/* Moon icon (shown in dark mode) */}
              <svg
                className="icon-moon"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "#1a0e14" }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
              {/* Sun icon (shown in light mode) */}
              <svg
                className="icon-sun"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#fff" }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg"></div>
        <div className="hero-ornament"></div>
        <div className="hero-content" ref={heroContentRef}>
          <span className="hero-eyebrow">
            {/* Crown icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
              <path d="M2 19h20v2H2zM2 6l5 5 5-6 5 6 5-5v11H2V6z" />
            </svg>
            Empowering the Next Generation
          </span>
          <h1 className="hero-title">
            Queens
            <br />
            Of Change
            <br />
            Foundation
          </h1>
          <p className="hero-tagline">"Every girl deserves a stage — we build it."</p>
          <div className="hero-cta">
            <a href="#volunteer" className="btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Join the Movement
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-image-wrap reveal">
            <svg
              className="about-img"
              viewBox="0 0 600 380"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Women empowerment illustration"
            >
              <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2d1a26" />
                  <stop offset="100%" stopColor="#1a0e14" />
                </linearGradient>
                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity=".75" />
                  <stop offset="100%" stopColor="#b5485a" stopOpacity=".75" />
                </linearGradient>
                <radialGradient id="r1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity=".2" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="600" height="380" fill="url(#bg)" />
              <ellipse cx="300" cy="190" rx="180" ry="180" fill="url(#r1)" />
              <g opacity=".9">
                <circle cx="185" cy="140" r="30" fill="url(#glow)" opacity=".8" />
                <ellipse cx="185" cy="270" rx="44" ry="68" fill="url(#glow)" opacity=".7" />
                <circle cx="300" cy="120" r="36" fill="url(#glow)" />
                <ellipse cx="300" cy="260" rx="52" ry="82" fill="url(#glow)" />
                <circle cx="415" cy="140" r="30" fill="url(#glow)" opacity=".8" />
                <ellipse cx="415" cy="270" rx="44" ry="68" fill="url(#glow)" opacity=".7" />
              </g>
              <path d="M274 94 L283 78 L300 90 L317 78 L326 94 Z" fill="#c9a84c" />
              <circle cx="120" cy="70" r="2" fill="#c9a84c" opacity=".6" />
              <circle cx="490" cy="55" r="2.5" fill="#c9a84c" opacity=".5" />
              <circle cx="80" cy="310" r="1.5" fill="#b5485a" opacity=".5" />
              <circle cx="530" cy="300" r="2" fill="#b5485a" opacity=".4" />
              <text
                x="300"
                y="358"
                textAnchor="middle"
                fill="rgba(201,168,76,.35)"
                fontSize="10"
                fontFamily="serif"
                letterSpacing="5"
              >
                RISE · LEAD · CHANGE
              </text>
            </svg>
          </div>

          <div className="about-text reveal">
            <p className="section-label">Our Story</p>
            <h2 className="section-title">
              We Open Doors
              <br />
              Others Keep Closed
            </h2>
            <div className="divider"></div>
            <p>
              At <strong>Queens Of Change Foundation</strong>, we believe that every
              young woman carries within her the power to transform her community — she
              just needs the right environment to grow.
            </p>
            <p>
              We exist because too many <strong>students and beginners</strong> are
              denied the opportunities they deserve. We know that{" "}
              <strong>potential is not scarce, only opportunity is.</strong>
            </p>
            <p>
              From mentorship circles to skills workshops, from bootcamps to leadership
              retreats — we create spaces where queens are born, not made.
            </p>
            <a
              href="#volunteer"
              className="btn-primary"
              style={{ marginTop: ".4rem", width: "fit-content" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Our Programs
            </a>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="impact-section" id="impact">
        <div className="impact-header reveal">
          <p className="section-label">Our Impact</p>
          <h2 className="section-title">
            Measurable Change
            <br />
            in the Lives of Women and Girls
          </h2>
          <p className="impact-subtext">
            Creating dignity, confidence, and opportunities across communities.
          </p>
        </div>

        <div className="impact-grid">
          {/* CARD 1 */}
          <div className="impact-card reveal">
            <div className="impact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="impact-number" data-target="200000">
              0+
            </div>
            <h3>Sanitary Pads Distributed</h3>
            <p>
              Ensuring menstrual dignity and hygiene for thousands of girls and women.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="impact-card reveal">
            <div className="impact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="impact-number" data-target="500">
              0+
            </div>
            <h3>Communities Reached</h3>
            <p>Creating lasting change across India's most underserved communities.</p>
          </div>

          {/* CARD 3 */}
          <div className="impact-card reveal">
            <div className="impact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="impact-number" data-target="50000">
              0+
            </div>
            <h3>Lives Directly Impacted</h3>
            <p>
              Girls continuing school, women gaining confidence and economic independence.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="impact-card reveal">
            <div className="impact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div className="impact-number" data-target="100">
              0%
            </div>
            <h3>Women-Led Organization</h3>
            <p>Founded and operated by passionate women from these communities.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip" id="stats">
        <div className="stats-inner">
          <div className="reveal" style={{ transitionDelay: "0s" }}>
            <div className="stat-num" data-target="2400">
              0
            </div>
            <div className="stat-label">Lives Touched</div>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.08s" }}>
            <div className="stat-num" data-target="18">
              0
            </div>
            <div className="stat-label">Programs Running</div>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.16s" }}>
            <div className="stat-num" data-target="94">
              0
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.24s" }}>
            <div className="stat-num" data-target="6">
              0
            </div>
            <div className="stat-label">Cities Reached</div>
          </div>
        </div>
      </div>

      {/* PILLARS */}
      <section className="pillars" id="pillars">
        <div className="pillars-inner">
          <div className="pillars-header reveal">
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Three Pillars of Change</h2>
          </div>
          <div className="pillars-grid">
            <div className="pillar-card reveal" style={{ transitionDelay: "0s" }}>
              <div className="pillar-icon-wrap">
                {/* Seedling / Grow icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22V12" />
                  <path d="M12 12C12 7 7 3 2 4c0 5 4 9 10 8z" />
                  <path d="M12 12c0-5 5-9 10-8c0 5-4 9-10 8z" />
                </svg>
              </div>
              <h3>Grow</h3>
              <p>
                Beginner-friendly skill workshops in technology, communication, and
                entrepreneurship — designed for those starting from zero and dreaming of
                the stars.
              </p>
            </div>
            <div className="pillar-card reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="pillar-icon-wrap">
                {/* People / Connect icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Connect</h3>
              <p>
                Our mentorship network pairs young women with experienced leaders who
                guide, inspire, and advocate for their growth across industries and borders.
              </p>
            </div>
            <div className="pillar-card reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="pillar-icon-wrap">
                {/* Star / Lead icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>Lead</h3>
              <p>
                Through leadership challenges, community projects, and real-world
                opportunities, we help our queens step into positions of power and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" id="journey">
        <div className="pillars-header reveal">
          <p className="section-label">Our Journey</p>
          <h2 className="section-title">Building Change Year by Year</h2>
        </div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2022</h3>
              <p>Queens Of Change Foundation was founded.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023</h3>
              <p>Reached and supported 1000+ young women.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2024</h3>
              <p>Introduced mentorship and leadership programs.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2025</h3>
              <p>Expanded initiatives across multiple cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section className="volunteer-cta" id="volunteer">
        <p className="section-label reveal">Get Involved</p>
        <h2 className="section-title reveal">
          Ready to Make
          <br />
          a Difference?
        </h2>
        <p className="reveal">
          Whether you want to volunteer your time, donate to our cause, or join one of our
          programs — there's a place for you in this movement.
        </p>
        <div className="cta-buttons reveal">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdrCJnrJfnxzmGXOmvuvwGHFw8QOWnlW3kPCUQ47T0IUEgQ8w/viewform"
            className="btn-primary"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Volunteer with Us
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdrCJnrJfnxzmGXOmvuvwGHFw8QOWnlW3kPCUQ47T0IUEgQ8w/viewform"
            className="btn-outline"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Donate Now
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h2>Queens Of Change Foundation</h2>
              <p>
                Building bridges between potential and opportunity — one queen at a time.
                Every effort counts. Every learner matters.
              </p>
            </div>
            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li>
                  <a href="#about">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#pillars">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Our Programs
                  </a>
                </li>
                <li>
                  <a href="#volunteer">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Volunteer
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="#">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Mail
                  </a>
                </li>
                <li>
                  <a href="#">
                    {/* Instagram icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    {/* LinkedIn icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Queens Of Change Foundation. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
