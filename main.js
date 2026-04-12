// ─── Navbar scroll effect ─────────────────────────────────────────────────────
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10)
}, { passive: true })

// ─── Mobile menu ──────────────────────────────────────────────────────────────
const burger = document.getElementById('burger')
const mobileMenu = document.getElementById('mobile-menu')

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
})

// Cerrar al hacer click en un link del menu mobile
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'))
})

// ─── Smooth scroll para anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      const offset = 72
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
})

// ─── Animate on scroll (simple intersection observer) ────────────────────────
const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, observerOpts)

document.querySelectorAll('.feature-card, .step-item, .plan-card').forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(20px)'
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
  observer.observe(el)
})

document.addEventListener('DOMContentLoaded', () => {
  // Tiny polyfill for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.feature-card, .step-item, .plan-card').forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
  }
})

// CSS class for visible elements
const style = document.createElement('style')
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }'
document.head.appendChild(style)
