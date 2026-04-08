/* ============================================================
   VANTAGE VISAS — script.js  v2.0
   ============================================================

   HOW TO UPDATE YOUR WHATSAPP NUMBER:
   ─────────────────────────────────────
   Find WA_NUMBER below. Format: country code + number, no +.
   Example: +27 79 474 8331  →  27794748331

   HOW TO UPDATE FORMSPREE (email delivery):
   ─────────────────────────────────────────
   1. Go to https://formspree.io and create a free account.
   2. Create a new form and get your Form ID (e.g. xbjnkpzw).
   3. Replace "YOUR_FORMSPREE_ID" below with your real ID.
   ============================================================ */

// ============================================================
// CONFIGURATION — Edit these values
// ============================================================

const WA_NUMBER        = "27794748331";
const WA_DEFAULT_MSG   = "Hi! I'd like to find out more about Vantage Visas.";
const CONTACT_EMAIL    = "rowanvdmerwe@gmail.com";
const FORMSPREE_ID     = "YOUR_FORMSPREE_ID"; // Replace with your real Formspree form ID
const TRUSTPILOT_URL   = "https://www.trustpilot.com/review/your-business-name";

// ============================================================
// UTILITY
// ============================================================

function buildWaLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ============================================================
// DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // ──────────────────────────────────────────────────────────
  // 1. SPA PAGE ROUTING
  // ──────────────────────────────────────────────────────────

  const pages       = document.querySelectorAll(".page");
  const navTriggers = document.querySelectorAll("[data-page]");
  const mobileNav   = document.getElementById("mobile-nav");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById("page-" + pageId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    navTriggers.forEach(t => {
      t.classList.toggle("active", t.dataset.page === pageId);
    });
    // Re-trigger reveal animations for newly shown page
    setTimeout(checkReveal, 100);
  }

  navTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(trigger.dataset.page);
      mobileNav && mobileNav.classList.remove("open");
    });
  });

  showPage("home");

  // ──────────────────────────────────────────────────────────
  // 2. NAVIGATION — scroll shrink + mobile hamburger
  // ──────────────────────────────────────────────────────────

  const nav         = document.getElementById("main-nav");
  const hamburger   = document.getElementById("nav-hamburger");
  const mobileClose = document.getElementById("mobile-nav-close");

  window.addEventListener("scroll", () => {
    nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  hamburger   && hamburger.addEventListener("click",   () => mobileNav.classList.add("open"));
  mobileClose && mobileClose.addEventListener("click", () => mobileNav.classList.remove("open"));

  // ──────────────────────────────────────────────────────────
  // 3. HERO CAROUSEL
  // ──────────────────────────────────────────────────────────

  const slides    = document.querySelectorAll(".hero-slide");
  const dots      = document.querySelectorAll(".hero-dot");
  const prevBtn   = document.getElementById("hero-prev");
  const nextBtn   = document.getElementById("hero-next");
  let currentSlide = 0;
  let carouselTimer;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  function manualSlide(dir) {
    goToSlide(currentSlide + dir);
    startCarousel(); // reset timer on manual interaction
  }

  prevBtn && prevBtn.addEventListener("click", () => manualSlide(-1));
  nextBtn && nextBtn.addEventListener("click", () => manualSlide(1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      startCarousel();
    });
  });

  if (slides.length > 0) startCarousel();

  // ──────────────────────────────────────────────────────────
  // 4. WHATSAPP FLOATING BUTTON
  // ──────────────────────────────────────────────────────────

  const waBtn = document.getElementById("wa-float-btn");
  if (waBtn) waBtn.href = buildWaLink(WA_DEFAULT_MSG);

  // ──────────────────────────────────────────────────────────
  // 5. DESTINATION CARDS — expand panel on click
  // ──────────────────────────────────────────────────────────

  const destCards = document.querySelectorAll(".dest-card[data-dest]");

  destCards.forEach(card => {
    card.addEventListener("click", () => {
      const destId = card.dataset.dest;
      const detail = document.getElementById("dest-detail-" + destId);
      if (!detail) return;
      const isOpen = detail.classList.contains("open");

      document.querySelectorAll(".dest-detail").forEach(d => d.classList.remove("open"));
      destCards.forEach(c => c.style.borderColor = "");

      if (!isOpen) {
        detail.classList.add("open");
        card.style.borderColor = "var(--gold)";
        setTimeout(() => detail.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
      }
    });
  });

  // ──────────────────────────────────────────────────────────
  // 6. VISA READINESS ASSESSMENT — 10 steps
  // ──────────────────────────────────────────────────────────

  const TOTAL_STEPS   = 10;
  const assessmentAnswers = {};  // keyed by step number
  let currentAssessStep = 1;

  const assessSteps   = document.querySelectorAll(".assessment-step");
  const progressBar   = document.getElementById("assessment-progress-bar");
  const progressLabel = document.getElementById("assessment-progress-label");
  const resultPanel   = document.getElementById("assessment-result");

  /* Text input steps that need a manual "Next" click */
  const TEXT_INPUT_STEPS = [1, 2];

  function updateProgressUI(step) {
    const pct = Math.round(((step - 1) / TOTAL_STEPS) * 100);
    if (progressBar)   progressBar.style.setProperty("--progress", pct + "%");
    if (progressLabel) progressLabel.textContent =
      step <= TOTAL_STEPS ? `Step ${step} of ${TOTAL_STEPS}` : "Complete";
  }

  function gotoAssessStep(step) {
    // Hide all steps and result
    assessSteps.forEach(s => s.classList.remove("active"));
    if (resultPanel) resultPanel.classList.remove("active");

    if (step === 0) {
      // Show result
      if (resultPanel) resultPanel.classList.add("active");
      updateProgressUI(TOTAL_STEPS + 1);
      return;
    }

    const target = document.querySelector(`.assessment-step[data-step="${step}"]`);
    if (target) target.classList.add("active");
    updateProgressUI(step);
    currentAssessStep = step;
  }

  /* Collect text-input answers and advance */
  function advanceTextStep(step) {
    let inputId, inputEl;
    if (step === 1) { inputId = "a-name";  inputEl = document.getElementById("a-name"); }
    if (step === 2) { inputId = "a-phone"; inputEl = document.getElementById("a-phone"); }

    if (!inputEl) { gotoAssessStep(step + 1); return; }

    const val = inputEl.value.trim();
    if (!val) {
      inputEl.focus();
      inputEl.style.borderColor = "#e53e3e";
      setTimeout(() => { inputEl.style.borderColor = ""; }, 2000);
      return;
    }
    assessmentAnswers[step] = val;
    gotoAssessStep(step + 1);
  }

  /* Wire up "Next" buttons for text-input steps */
  document.getElementById("next-1") &&
    document.getElementById("next-1").addEventListener("click", () => advanceTextStep(1));
  document.getElementById("next-2") &&
    document.getElementById("next-2").addEventListener("click", () => advanceTextStep(2));

  /* Allow pressing Enter on text inputs to advance */
  ["a-name", "a-phone"].forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); advanceTextStep(idx + 1); }
    });
  });

  /* Option button clicks (steps 3-10 — auto-advance) */
  document.querySelectorAll(".assessment-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = parseInt(btn.closest(".assessment-step").dataset.step);
      assessmentAnswers[step] = btn.dataset.value;

      // Visual selected state
      btn.closest(".assessment-options")
         .querySelectorAll(".assessment-option")
         .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Auto-advance
      setTimeout(() => {
        if (step < TOTAL_STEPS) {
          gotoAssessStep(step + 1);
        } else {
          submitAssessment();
        }
      }, 380);
    });
  });

  /* Back buttons */
  document.querySelectorAll(".assessment-back").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentAssessStep > 1) gotoAssessStep(currentAssessStep - 1);
    });
  });

  /* Build readable label maps */
  const labelMaps = {
    3: { tourist: "Tourist / Leisure", crew_join: "Yacht Crew (Joining Vessel)", crew_walk: "Yacht Crew (Dockwalking)", h2a: "H-2A Agricultural Work", business_nomad: "Business / Digital Nomad" },
    4: { usa: "USA", uk: "United Kingdom", schengen: "Schengen / Europe", australia: "Australia", other: "Other" },
    5: { valid_sa: "Valid SA Passport", needs_renewal: "Needs Renewal", foreign: "Foreign Passport" },
    6: { no_denials: "No Previous Denials", one_denial: "One Previous Denial", multiple_denials: "Multiple / Recent Denials" },
    7: { no_record: "No Criminal Record", minor_offense: "Minor / Traffic Offense", serious_case: "Serious / Pending Case" },
    8: { employed: "Employed", business_owner: "Business Owner", student: "Student", freelancer: "Unemployed / Freelancer" },
    9: { self_funded: "Sufficient Personal Funds", sponsored: "Financial Sponsor", saving: "Currently Saving" },
   10: { urgent: "Urgent <30 Days", medium: "1–3 Months", research: "Just Planning / Researching" },
  };

  function getLabel(step, val) {
    return labelMaps[step] ? (labelMaps[step][val] || val) : val;
  }

  /* Final submission */
  function submitAssessment() {
    const name       = assessmentAnswers[1] || "Unknown";
    const phone      = assessmentAnswers[2] || "Not provided";
    const goal       = getLabel(3, assessmentAnswers[3] || "");
    const dest       = getLabel(4, assessmentAnswers[4] || "");
    const passport   = getLabel(5, assessmentAnswers[5] || "");
    const visaHist   = getLabel(6, assessmentAnswers[6] || "");
    const criminal   = getLabel(7, assessmentAnswers[7] || "");
    const profStatus = getLabel(8, assessmentAnswers[8] || "");
    const finance    = getLabel(9, assessmentAnswers[9] || "");
    const timeline   = getLabel(10, assessmentAnswers[10] || "");

    // ── WhatsApp message (pre-filled with key fields) ──
    const waMsg = [
      `Hi! I just completed the Vantage Visas Readiness Assessment.`,
      ``,
      `Name: ${name}`,
      `WhatsApp: ${phone}`,
      `Destination: ${dest}`,
      `Travel Goal: ${goal}`,
      `Visa History: ${visaHist}`,
      `Timeline: ${timeline}`,
      ``,
      `I'd like to book my free consultation.`
    ].join("\n");

    // ── Formspree email submission ──
    if (FORMSPREE_ID && FORMSPREE_ID !== "YOUR_FORMSPREE_ID") {
      fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name":           name,
          "WhatsApp":            phone,
          "Travel Goal":         goal,
          "Destination":         dest,
          "Passport Status":     passport,
          "Visa History":        visaHist,
          "Criminal Background": criminal,
          "Professional Status": profStatus,
          "Financial Readiness": finance,
          "Travel Timeline":     timeline,
          _subject: `Visa Assessment — ${name} → ${dest}`,
          _replyto: CONTACT_EMAIL,
        })
      }).catch(() => {}); // Silent fail — WhatsApp is the primary conversion
    }

    // ── Set WhatsApp CTA link ──
    const ctaBtn = document.getElementById("assessment-result-cta");
    if (ctaBtn) ctaBtn.href = buildWaLink(waMsg);

    // ── Show result screen ──
    gotoAssessStep(0);

    // ── Open WhatsApp after short delay (allows result screen to render) ──
    setTimeout(() => {
      window.open(buildWaLink(waMsg), "_blank");
    }, 800);
  }

  // Initialise assessment at step 1
  gotoAssessStep(1);

  // ──────────────────────────────────────────────────────────
  // 7. LEAD MAGNET FORM
  // ──────────────────────────────────────────────────────────

  const leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name  = leadForm.querySelector('[name="name"]').value.trim();
      const email = leadForm.querySelector('[name="email"]').value.trim();
      const dest  = leadForm.querySelector('[name="destination"]').value;

      if (!name || !email) {
        alert("Please fill in your name and email to receive the checklist.");
        return;
      }

      const msg = `Hi! My name is ${name}. I'd like to receive the free document checklist for ${dest || "my destination"}. My email is ${email}.`;
      window.open(buildWaLink(msg), "_blank");

      leadForm.innerHTML = `
        <div style="text-align:center;padding:32px 0;">
          <div style="font-size:3rem;margin-bottom:16px;">✅</div>
          <h3 style="color:var(--white);margin-bottom:8px;">You're all set, ${name}!</h3>
          <p style="color:rgba(255,255,255,0.65);">Your document checklist is on its way. Check WhatsApp for your personalised list.</p>
        </div>
      `;
    });
  }

  // ──────────────────────────────────────────────────────────
  // 8. TRUSTPILOT BADGE LINKS
  // ──────────────────────────────────────────────────────────

  document.querySelectorAll(".trustpilot-link").forEach(el => {
    el.href = TRUSTPILOT_URL;
  });

  // ──────────────────────────────────────────────────────────
  // 9. SCROLL REVEAL (IntersectionObserver)
  // ──────────────────────────────────────────────────────────

  function checkReveal() {
    const revealEls = document.querySelectorAll(".reveal:not(.visible)");
    revealEls.forEach(el => revealObserver.observe(el));
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  checkReveal();

  // ──────────────────────────────────────────────────────────
  // 10. COUNTER ANIMATION for Stats
  // ──────────────────────────────────────────────────────────

  function animateCounter(el, target, duration = 1600) {
    const startTime = performance.now();
    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + (el.dataset.suffix || "");
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) animateCounter(el, target);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-number[data-target]").forEach(el => {
    statsObserver.observe(el);
  });

});
