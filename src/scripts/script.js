document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const navLinks = document.querySelector(".nav-links");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const yearSpan = document.getElementById("year");
  const revealEls = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".stat-number");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");
  const testimonials = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const contactForm = document.getElementById("contactForm");

  // Set year
  yearSpan.textContent = new Date().getFullYear();

  // Preloader
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => (preloader.style.display = "none"), 400);
  }, 1200);

  // Sticky header + scroll top button
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
      scrollTopBtn.classList.add("show");
    } else {
      header.classList.remove("scrolled");
      scrollTopBtn.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScroll);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = header.offsetHeight + 8;
        const rect = target.getBoundingClientRect();
        const offset = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top: offset, behavior: "smooth" });
        // close mobile nav
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("open");
      }
    });
  });

  // Mobile menu toggling
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Scroll-to-top
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll reveal & counters
  let countersStarted = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Start counters when about section stats visible
          if (!countersStarted && entry.target.classList.contains("about-stats")) {
            countersStarted = true;
            counters.forEach((counter) => animateCounter(counter));
          }
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
  // also observe about-stats explicitly for counters
  const aboutStats = document.querySelector(".about-stats");
  if (aboutStats) observer.observe(aboutStats);

  function animateCounter(el) {
    const target = +el.dataset.target;
    let current = 0;
    const duration = 1600;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current);
    }, stepTime);
  }

  // Service filters
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      serviceCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "flex";
        } else {
          const categories = card.dataset.category.split(" ");
          card.style.display = categories.includes(filter) ? "flex" : "none";
        }
      });
    });
  });

  // Testimonials carousel
  let currentTestimonial = 0;
  const showTestimonial = (index) => {
    testimonials.forEach((t, i) => t.classList.toggle("active", i === index));
  };

  prevBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  // Auto-rotate every 8 seconds
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 8000);

  // Simple contact form handling (front-end only)
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been received. We will get back to you shortly.");
    contactForm.reset();
  });
});