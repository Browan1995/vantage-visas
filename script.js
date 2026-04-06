/* ============================================================
   VANTAGE VISAS — script.js
   ============================================================

   HOW TO UPDATE YOUR WHATSAPP NUMBER:
   ------------------------------------------------------------
   1. Find the constant WA_NUMBER below.
   2. Replace "27821234567" with your number in E.164 format:
      → Remove the leading 0 from your SA number.
      → Prefix with 27.
      → Example: 082 123 4567  →  27821234567
   3. Save the file. Done.

   HOW TO UPDATE TRUSTPILOT LINK:
   ------------------------------------------------------------
   Find TRUSTPILOT_URL below and replace with your profile URL.
   ============================================================ */

// ============================================================
// CONFIGURATION — Edit these values
// ============================================================

/** WhatsApp number in E.164 format (no +, no spaces, no dashes) */
const WA_NUMBER = "27821234567";

/** Default WhatsApp pre-filled message for the floating button */
const WA_DEFAULT_MSG = "Hi! I'd like to find out more about Vantage Visas.";

/** WhatsApp message sent after the quiz is completed */
const WA_QUIZ_MSG = "Hi! I just completed the Vantage Visas eligibility quiz. I'd like to claim my free Success Assessment.";

/** Your Trustpilot profile URL — replace with your real one */
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/your-business-name";

// ============================================================
// UTILITY: Build a WhatsApp deep-link
// ============================================================
function buildWaLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ============================================================
// DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------------------------
  // 1. SPA PAGE ROUTING (Home / Tourist Hub / Yacht Crew / Quiz)
  // ----------------------------------------------------------

  const pages       = document.querySelectorAll(".page");
  const navTriggers = document.querySelectorAll("[data-page]");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById("page-" + pageId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Update active state on nav links
    navTriggers.forEach(t => {
      t.classList.toggle("active", t.dataset.page === pageId);
    });
  }

  navTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(trigger.dataset.page);
      // Close mobile nav if open
      mobileNav.classList.remove("open");
    });
  });

  // Default to home
  showPage("home");

  // ----------------------------------------------------------
  // 2. NAVIGATION: Scroll shrink + mobile hamburger
  // ----------------------------------------------------------

  const nav       = document.getElementById("main-nav");
  const hamburger = document.getElementById("nav-hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileClose = document.getElementById("mobile-nav-close");

  // Shrink nav on scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // Mobile hamburger open
  hamburger && hamburger.addEventListener("click", () => {
    mobileNav.classList.add("open");
  });

  // Mobile nav close
  mobileClose && mobileClose.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });

  // ----------------------------------------------------------
  // 3. WHATSAPP FLOATING BUTTON
  // ----------------------------------------------------------

  const waBtn = document.getElementById("wa-float-btn");
  if (waBtn) {
    waBtn.href = buildWaLink(WA_DEFAULT_MSG);
  }

  // ----------------------------------------------------------
  // 4. DESTINATION CARDS — click to expand detail panel
  // ----------------------------------------------------------

  const destCards = document.querySelectorAll(".dest-card[data-dest]");

  destCards.forEach(card => {
    card.addEventListener("click", () => {
      const destId = card.dataset.dest;
      const detail = document.getElementById("dest-detail-" + destId);
      if (!detail) return;

      const isOpen = detail.classList.contains("open");

      // Close all panels first
      document.querySelectorAll(".dest-detail").forEach(d => d.classList.remove("open"));
      // Deselect all cards
      destCards.forEach(c => c.style.borderColor = "");

      if (!isOpen) {
        detail.classList.add("open");
        card.style.borderColor = "var(--gold)";
        // Scroll panel into view smoothly
        setTimeout(() => detail.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
      }
    });
  });

  // ----------------------------------------------------------
  // 5. AM I ELIGIBLE? — 4-STEP QUIZ
  // ----------------------------------------------------------

  // Quiz state: stores selected option per step
  const quizAnswers = {};
  let currentStep   = 1;
  const TOTAL_STEPS = 4;

  const quizSteps    = document.querySelectorAll(".quiz-step");
  const quizProgress = document.querySelectorAll(".quiz-progress-dot");
  const quizResult   = document.getElementById("quiz-result");
  const quizBackBtn  = document.getElementById("quiz-back");

  /**
   * Show a specific quiz step (1-indexed).
   * Step 0 = show result screen.
   */
  function gotoStep(step) {
    // Hide all steps
    quizSteps.forEach(s => s.classList.remove("active"));
    if (quizResult) quizResult.classList.remove("active");

    if (step === 0) {
      // Show result
      if (quizResult) quizResult.classList.add("active");
      updateProgress(-1);
      if (quizBackBtn) quizBackBtn.style.display = "none";
    } else {
      const target = document.querySelector(`.quiz-step[data-step="${step}"]`);
      if (target) target.classList.add("active");
      updateProgress(step);
      if (quizBackBtn) quizBackBtn.style.display = step > 1 ? "block" : "none";
    }
    currentStep = step;
  }

  /** Update the progress dots */
  function updateProgress(activeStep) {
    quizProgress.forEach((dot, i) => {
      const stepNum = i + 1;
      dot.classList.remove("active", "done");
      if (stepNum < activeStep)       dot.classList.add("done");
      else if (stepNum === activeStep) dot.classList.add("active");
    });
  }

  /** Handle option selection within a step */
  document.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = parseInt(btn.closest(".quiz-step").dataset.step);
      quizAnswers[step] = btn.dataset.value;

      // Visual selected state
      btn.closest(".quiz-options")
         .querySelectorAll(".quiz-option")
         .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Auto-advance after short delay
      setTimeout(() => {
        if (step < TOTAL_STEPS) {
          gotoStep(step + 1);
        } else {
          showQuizResult();
        }
      }, 350);
    });
  });

  /** Back button */
  if (quizBackBtn) {
    quizBackBtn.addEventListener("click", () => {
      if (currentStep > 1) gotoStep(currentStep - 1);
    });
  }

  /** Build the result screen and set the WhatsApp link */
  function showQuizResult() {
    gotoStep(0);

    // Build a summary of answers to include in the WhatsApp message
    const purposeMap  = { tourist: "Tourist", crew_join: "Yacht Crew (Joining)", crew_walk: "Yacht Crew (Dockwalking)" };
    const financeMap  = { r90k: "R90k+ savings", sponsored: "Sponsored", saving: "Still saving" };
    const historyMap  = { clean: "Clean record", denied: "Previous visa denial", seaman: "Valid Seaman's Book" };
    const timelineMap = { urgent: "Urgent (<30 days)", planning: "Planning ahead" };

    const summary = [
      `Purpose: ${purposeMap[quizAnswers[1]] || quizAnswers[1]}`,
      `Finances: ${financeMap[quizAnswers[2]] || quizAnswers[2]}`,
      `History: ${historyMap[quizAnswers[3]] || quizAnswers[3]}`,
      `Timeline: ${timelineMap[quizAnswers[4]] || quizAnswers[4]}`,
    ].join(" | ");

    const quizWaMsg = `Hi! I just completed the Vantage Visas eligibility quiz. ${summary}. I'd like to claim my free Success Assessment.`;

    // Set result CTA link
    const resultCta = document.getElementById("quiz-result-cta");
    if (resultCta) resultCta.href = buildWaLink(quizWaMsg);
  }

  // Initialise quiz at step 1
  gotoStep(1);

  // ----------------------------------------------------------
  // 6. LEAD MAGNET FORM
  // ----------------------------------------------------------

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

      // In production: POST to your CRM / email tool (Mailchimp, ActiveCampaign, etc.)
      // For now: open WhatsApp with the lead details
      const msg = `Hi! My name is ${name}. I'd like to receive the free document checklist for ${dest || "my destination"}. My email is ${email}.`;
      window.open(buildWaLink(msg), "_blank");

      // Show success state
      leadForm.innerHTML = `
        <div style="text-align:center;padding:32px 0;">
          <div style="font-size:3rem;margin-bottom:16px;">✅</div>
          <h3 style="color:var(--white);margin-bottom:8px;">You're all set, ${name}!</h3>
          <p style="color:rgba(255,255,255,0.65);">Your document checklist is on its way. Check WhatsApp for your personalised list.</p>
        </div>
      `;
    });
  }

  // ----------------------------------------------------------
  // 7. TRUSTPILOT BADGE LINK
  // ----------------------------------------------------------

  document.querySelectorAll(".trustpilot-link").forEach(el => {
    el.href = TRUSTPILOT_URL;
  });

  // ----------------------------------------------------------
  // 8. SCROLL REVEAL (IntersectionObserver)
  // ----------------------------------------------------------

  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only reveal once
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ----------------------------------------------------------
  // 9. COUNTER ANIMATION for Stats section
  // ----------------------------------------------------------

  function animateCounter(el, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (Math.round(eased * target)).toLocaleString() + (el.dataset.suffix || "");
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
