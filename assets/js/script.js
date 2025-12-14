/* ===================================
   CV BISIK - ENHANCED JAVASCRIPT
   =================================== */

// ============ INITIALIZE AOS ANIMATION ============
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Initialize all functions
  initScrollTop();
  initNavbarScroll();
  initGalleryFilter();
  initContactForm();
  initCounters();
  initPreloader();
  initDarkMode();
});

// ============ NAVBAR SCROLL EFFECT ============
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg");
      navbar.style.padding = "0.5rem 0";
    } else {
      navbar.classList.remove("shadow-lg");
      navbar.style.padding = "1rem 0";
    }
  });
}

// ============ SCROLL TO TOP BUTTON ============
function initScrollTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTop";
  scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  // Show/hide scroll button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============ GALLERY FILTER ============
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get filter category
        const filterValue = this.getAttribute("data-filter");

        // Filter gallery items with animation
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "all" || itemCategory === filterValue) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }
}

// ============ CONTACT FORM VALIDATION ============
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone")?.value.trim() || "";
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Reset previous validation states
      const inputs = contactForm.querySelectorAll(
        ".form-control, .form-control"
      );
      inputs.forEach((input) => {
        input.classList.remove("is-invalid", "is-valid");
      });

      // Validation flag
      let isValid = true;

      // Validate name
      if (name === "") {
        showError("name", "Nama harus diisi");
        isValid = false;
      } else if (name.length < 3) {
        showError("name", "Nama minimal 3 karakter");
        isValid = false;
      } else {
        showSuccess("name");
      }

      // Validate email
      if (email === "") {
        showError("email", "Email harus diisi");
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError("email", "Format email tidak valid");
        isValid = false;
      } else {
        showSuccess("email");
      }

      // Validate subject
      if (subject === "") {
        showError("subject", "Subjek harus diisi");
        isValid = false;
      } else {
        showSuccess("subject");
      }

      // Validate message
      if (message === "") {
        showError("message", "Pesan harus diisi");
        isValid = false;
      } else if (message.length < 10) {
        showError("message", "Pesan minimal 10 karakter");
        isValid = false;
      } else {
        showSuccess("message");
      }

      // If all valid, submit form
      if (isValid) {
        submitForm(name, email, phone, subject, message);
      }
    });
  }
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const feedback = document.createElement("div");
  feedback.className = "invalid-feedback";
  feedback.textContent = message;

  field.classList.add("is-invalid");
  field.classList.remove("is-valid");

  // Remove existing feedback
  const existingFeedback =
    field.parentElement.querySelector(".invalid-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  field.parentElement.appendChild(feedback);
}

// Show success state
function showSuccess(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.add("is-valid");
  field.classList.remove("is-invalid");

  // Remove error feedback
  const feedback = field.parentElement.querySelector(".invalid-feedback");
  if (feedback) {
    feedback.remove();
  }
}

// Submit form (simulation)
function submitForm(name, email, phone, subject, message) {
  const submitBtn = document.querySelector(
    '#contactForm button[type="submit"]'
  );
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

  // Simulate sending (3 seconds)
  setTimeout(() => {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    // Show success alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>Berhasil!</strong> Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    const form = document.getElementById("contactForm");
    form.insertBefore(alertDiv, form.firstChild);

    // Reset form
    form.reset();

    // Remove validation classes
    const inputs = form.querySelectorAll(".form-control, .form-select");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
    });

    // Auto dismiss alert after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);

    // Log form data (for development)
    console.log("Form Data:");
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Telepon:", phone);
    console.log("Subjek:", subject);
    console.log("Pesan:", message);
  }, 3000);

  /* 
    CATATAN UNTUK SISWA PKL:
    Fungsi submitForm di atas hanya simulasi untuk demo.
    
    Untuk implementasi sesungguhnya, gunakan kode seperti ini:
    
    fetch('api/contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success message
        } else {
            // Show error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

// ============ COUNTER ANIMATION ============
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // Animation speed

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / speed;

        let current = 0;
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current) + "+";
            setTimeout(updateCounter, 10);
          } else {
            counter.textContent = target + "+";
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ============ PRELOADER ============
function initPreloader() {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 500);
    });
  }
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    }
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ============ LAZY LOADING IMAGES ============
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ============ TOOLTIPS & POPOVERS ============
function initBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

// ============ BACK TO TOP VISIBILITY ============
window.addEventListener("scroll", function () {
  const scrollTop = document.getElementById("scrollTop");
  if (scrollTop) {
    if (window.pageYOffset > 300) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  }
});

// ============ FORM PREVENT DOUBLE SUBMIT ============
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function () {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.disabled = false;
      }, 3000);
    }
  });
});

// ============ CONSOLE MESSAGE ============
console.log(
  "%c CV BISIK Company Profile",
  "color: #0d6efd; font-size: 24px; font-weight: bold;"
);
console.log(
  "%c Built with Bootstrap 5 & AOS Animation",
  "color: #6c757d; font-size: 14px;"
);
console.log(
  "%c Tugas PKL SMK - Website Professional",
  "color: #6c757d; font-size: 12px;"
);

// ============ DARK MODE ============
function initDarkMode() {
  const darkModeBtn = document.getElementById("darkModeToggle");
  if (!darkModeBtn) return;

  // Check saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateDarkModeIcon(savedTheme);

  // Toggle dark mode
  darkModeBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateDarkModeIcon(newTheme);
  });
}

function updateDarkModeIcon(theme) {
  const darkModeBtn = document.getElementById("darkModeToggle");
  if (darkModeBtn) {
    darkModeBtn.innerHTML =
      theme === "dark"
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
  }
}

// ============ PERFORMANCE MONITORING ============
window.addEventListener("load", function () {
  const loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;
  console.log(
    `%c Page loaded in ${loadTime}ms`,
    "color: #198754; font-weight: bold;"
  );
});
