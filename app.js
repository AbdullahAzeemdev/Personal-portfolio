emailjs.init("dljCtDiSlkwPGMfOE");

// Menu toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
   menuIcon.classList.toggle("fa-xmark");
   menuIcon.classList.toggle("fa-bars");
   navbar.classList.toggle("active");
};

// Active nav + sticky header
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
   sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
         navLinks.forEach(link => link.classList.remove("active"));

         let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
         if (activeLink) activeLink.classList.add("active");
      }
   });

   let header = document.querySelector("header");
   header.classList.toggle("sticky", window.scrollY > 100);

   menuIcon.classList.remove("fa-xmark");
   navbar.classList.remove("active");
};

// ScrollReveal
ScrollReveal({
   distance: "80px",
   duration: 2000,
   delay: 200,
   reset: true
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });

ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });

ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });

ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// Typed.js
const typed = new Typed(".multiple-text", {
   strings: [
      "Frontend Developer",
      "Web Designer",
      "Learning React",
      "Future Full Stack Developer"
   ],
   typeSpeed: 70,
   backSpeed: 70,
   backDelay: 1000,
   loop: true
});

// EmailJS
function sendMessage(e) {
   e.preventDefault();

   emailjs.send("service_u7y6myk", "template_13vg80f", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
   })
   .then(() => {
      alert("Message Sent Successfully ✅");
      document.querySelector("form").reset();
   })
   .catch((error) => {
      console.log(error);
      alert("Error sending message ❌");
   });
}