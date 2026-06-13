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
// ACTIVE NAV + STICKY HEADER
// =========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // sticky header
    header.classList.toggle("sticky", scrollY > 80);

    // active link
    sections.forEach(sec => {
        const top = scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });

    // close menu on scroll
    menuIcon?.classList.remove("fa-xmark");
    menuIcon?.classList.add("fa-bars");
    navbar?.classList.remove("active");
});


// =========================
// DARK / LIGHT MODE (FIXED)
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
ScrollReveal({
    distance: "70px",
    duration: 1800,
    delay: 150,
    reset: false
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .about-img", { origin: "left" });
ScrollReveal().reveal(".about-content", { origin: "right" });
ScrollReveal().reveal(".service-box, .portfolio-box", {
    origin: "bottom",
    interval: 120
});


// =========================
// TYPED JS
// =========================
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


// =========================
// EMAIL SEND FUNCTION
// =========================
function sendMessage(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

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

        document.querySelector("form").reset();
    })
    .catch((err) => {
        console.log(err);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!"
        });
    });
}

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";
});

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

const particleContainer = document.getElementById("particles");

function createParticle() {
    const span = document.createElement("span");

    span.style.position = "absolute";
    span.style.width = Math.random() * 5 + "px";
    span.style.height = span.style.width;
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

// SERVICES STAGGER ANIMATION

const serviceBoxes = document.querySelectorAll(".service-box");

window.addEventListener("scroll", () => {
    serviceBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;
        const trigger = window.innerHeight / 1.2;

        if(boxTop < trigger){
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "translateY(0)";
            }, index * 150);
        }
    });
});