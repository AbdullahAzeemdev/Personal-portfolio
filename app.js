// =========================
// EMAILJS INIT
// =========================
emailjs.init("dljCtDiSlkwPGMfOE");

// =========================
// LOADER
// =========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }
});

// =========================
// MOBILE MENU TOGGLE
// =========================
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("fa-xmark");
        menuIcon.classList.toggle("fa-bars");
        navbar.classList.toggle("active");
    });
}

// =========================
// ACTIVE NAV + STICKY HEADER + PROGRESS BAR
// =========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const header = document.querySelector("header");
const progressBar = document.getElementById("progress-bar");
const serviceBoxes = document.querySelectorAll(".service-box");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Sticky header
    if (header) {
        header.classList.toggle("sticky", scrollY > 80);
    }

    // Active link on scroll
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.add("active");
        }
    });

    // Progress Bar Indicator
    if (progressBar) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollY / scrollHeight) * 100;
        progressBar.style.width = progress + "%";
    }

    // Services Stagger Animation Trigger
    serviceBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;
        const trigger = window.innerHeight / 1.2;

        if (boxTop < trigger) {
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "translateY(0)";
            }, index * 150);
        }
    });

    // Close mobile menu on scroll
    if (menuIcon && navbar) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        navbar.classList.remove("active");
    }
});

// =========================
// DARK / LIGHT MODE
// =========================
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        themeToggle.classList.toggle("fa-moon", !isLight);
        themeToggle.classList.toggle("fa-sun", isLight);
    });
}

// =========================
// SCROLL REVEAL ANIMATION
// =========================
if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
        distance: "70px",
        duration: 1800,
        delay: 150,
        reset: false
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(".home-img, .about-img", { origin: "left" });
    ScrollReveal().reveal(".about-content", { origin: "right" });
    ScrollReveal().reveal(".portfolio-box", { origin: "bottom", interval: 120 });
}

// =========================
// TYPED JS
// =========================
if (typeof Typed !== "undefined") {
    new Typed(".multiple-text", {
        strings: [
            "Frontend Developer",
            "Web Designer",
            "JavaScript Developer",
            "React Learner",
            "Full Stack Developer"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        loop: true
    });
}

// =========================
// CURSOR GLOW EFFECT
// =========================
const glow = document.getElementById("cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// =========================
// PARTICLES BACKGROUND GENERATOR
// =========================
const particleContainer = document.getElementById("particles");

if (particleContainer) {
    function createParticle() {
        const span = document.createElement("span");
        const size = Math.random() * 5 + "px";

        span.style.position = "absolute";
        span.style.width = size;
        span.style.height = size;
        span.style.background = "rgba(89,178,244,0.6)";
        span.style.borderRadius = "50%";
        span.style.left = Math.random() * window.innerWidth + "px";
        span.style.top = window.innerHeight + "px";
        span.style.animation = "floatUp 6s linear infinite";

        particleContainer.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 6000);
    }
    setInterval(createParticle, 200);
}

// =========================
// EMAIL SEND FUNCTION (SAFE)
// =========================
function sendMessage(e) {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const subjectEl = document.getElementById("subject");
    const messageEl = document.getElementById("message");

    if (!nameEl || !emailEl || !messageEl) return;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
        Swal.fire({
            icon: "warning",
            title: "Oops!",
            text: "Please fill required fields"
        });
        return;
    }

    emailjs.send("service_u7y6myk", "template_13vg80f", {
        from_name: name,
        from_email: email,
        phone: phone,
        subject: subject,
        message: message
    })
    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Sent!",
            text: "Message delivered successfully 🚀"
        });
        const form = document.querySelector("form");
        if (form) form.reset();
    })
    .catch((err) => {
        console.error("EmailJS Error:", err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!"
        });
    });
}