// Language translations
const translations = {
  ar: {
    nav: {
      features: "المميزات",
      howItWorks: "كيف يعمل",
      calculator: "حاسبة التوصيل",
      contact: "تواصل معنا",
      whatsapp: "واتساب",
    },
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      calculator: "Delivery Calculator",
      contact: "Contact Us",
      whatsapp: "WhatsApp",
    },
  },
}

// Current language
let currentLang = localStorage.getItem("language") || "ar"

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial language
  setLanguage(currentLang)

  // Language switcher
  const langSwitcher = document.getElementById("lang-switcher")
  langSwitcher.addEventListener("click", toggleLanguage)

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileNav = document.getElementById("mobile-nav")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")
    if (mobileNav.classList.contains("active")) {
      menuIcon.style.display = "none"
      closeIcon.style.display = "block"
    } else {
      menuIcon.style.display = "block"
      closeIcon.style.display = "none"
    }
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileNav.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      menuIcon.style.display = "block"
      closeIcon.style.display = "none"
    })
  })

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.getElementById("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Calculator
  const distanceInput = document.getElementById("distance-input")
  const costResult = document.getElementById("cost-result")

  distanceInput.addEventListener("input", function () {
    const distance = Number.parseFloat(this.value) || 0
    const cost = (distance * 0.15).toFixed(2)
    costResult.textContent = cost
  })

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".section-animate").forEach((section) => {
    observer.observe(section)
  })
})

// Toggle language
function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar"
  setLanguage(currentLang)
  localStorage.setItem("language", currentLang)
}

// Set language
function setLanguage(lang) {
  const html = document.documentElement
  const langText = document.getElementById("lang-text")

  // Set HTML attributes
  html.setAttribute("lang", lang)
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr")

  // Update language button text
  langText.textContent = lang === "ar" ? "EN" : "ع"

  // Update all translatable elements
  document.querySelectorAll("[data-ar]").forEach((element) => {
    const arText = element.getAttribute("data-ar")
    const enText = element.getAttribute("data-en")
    element.textContent = lang === "ar" ? arText : enText
  })

  // Update placeholder
  const distanceInput = document.getElementById("distance-input")
  if (distanceInput) {
    distanceInput.placeholder = lang === "ar" ? "أدخل المسافة" : "Enter distance"
  }
}
