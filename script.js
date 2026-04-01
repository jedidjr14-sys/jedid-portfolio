// ===========================
// MATRIX CANVAS BACKGROUND
// ===========================
console.log("JS LOADED ✅");
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cols = Math.floor(canvas.width / 20);
const drops = Array(cols).fill(1);

const chars = '01アイウエオカキクケコ<>{}[]ABCDEFGHIJKLMNOP';

function drawMatrix() {
  ctx.fillStyle = 'rgba(2, 11, 24, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00d4ff';
  ctx.font = '14px Share Tech Mono';

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 20, y * 20);
    if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===========================
// TYPEWRITER EFFECT
// ===========================
const phrases = [
  'Full-Stack Web Developer',
  'BCA Student @ 2025',
  'CI/CD Enthusiast',
  'Building Secure Web Apps',
  'Node.js + PostgreSQL',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 50 : 90);
}
type();

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const revealElements = document.querySelectorAll(
  '.about-grid, .info-card, .skill-category, .project-card, .wf-step, .contact-grid'
);
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===========================
// SKILL BAR ANIMATIONS
// ===========================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-w');
        bar.style.width = w + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// ===========================
// CONTACT FORM SUBMISSION
// ===========================

// ⚠️ IMPORTANT: Replace this URL with your actual Render.com backend URL
// after deploying the Node.js backend. Example:
// const BACKEND_URL = 'https://your-app-name.onrender.com/api/contact';
// ===========================
// CONTACT FORM SUBMISSION
// ===========================

// ===========================
// CONTACT FORM FIXED
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  console.log("JS LOADED ✅");

  const form = document.getElementById('contactForm');

  if (!form) {
    console.error("Form not found ❌");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("Form submit intercepted ✅");

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const formStatus = document.getElementById('formStatus');
    const btnText = document.getElementById('btnText');
    const submitBtn = document.getElementById('submitBtn');

    if (!name || !email || !message) {
      formStatus.textContent = "Fill all fields";
      return;
    }

    submitBtn.disabled = true;
    btnText.textContent = "Sending...";

    try {
      const res = await fetch('https://jedid-portfolio.onrender.com/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        formStatus.textContent = "✅ Message sent!";
        form.reset();
      } else {
        formStatus.textContent = "❌ Error sending message";
      }

    } catch (err) {
      formStatus.textContent = "❌ Server error";
    }

    submitBtn.disabled = false;
    btnText.textContent = "Send Message →";
  });

});
function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}

// ===========================
// SMOOTH ACTIVE NAV LINKS
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--blue-bright)'
      : '';
  });
});

console.log('%c[JET] Portfolio loaded. Welcome! 🔒', 'color: #00d4ff; font-family: monospace; font-size: 14px;');
