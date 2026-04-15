/* ═══════════════════════════════════════════════════════════════
   Edge & Elegance Beauty & Barber Studio
   script.js  —  Unified JavaScript for all pages
   Sections:
     1. Slideshow          (index.html)
     2. Reviews bar anim   (reviews.html)
     3. Review form        (reviews.html)
     4. FAQ form           (FAQ.html)
     5. Booking form       (Booking.html)
   ═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────
   1. SLIDESHOW
   Only activates on pages that contain <aside>
   with <figure> slides and a <progress> element.
───────────────────────────────────────────── */
(function initSlideshow() {
  const slides   = document.querySelectorAll('aside figure');
  const dots     = document.querySelectorAll('.slide-dots span');
  const progress = document.querySelector('aside progress');

  /* Exit early if no slideshow exists on this page */
  if (!slides.length || !progress) return;

  const DURATION = 5000;   /* ms between auto-advances */
  let current       = 0;
  let timer         = null;
  let progressTimer = null;
  let startTime     = null;

  /* Navigate to slide at index, wrapping around */
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
  }

  /* Animate the progress bar from 0 → 100 over DURATION ms */
  function resetProgress() {
    clearInterval(progressTimer);
    startTime = Date.now();
    progressTimer = setInterval(() => {
      const pct = Math.min(((Date.now() - startTime) / DURATION) * 100, 100);
      progress.value = pct;
      if (pct >= 100) clearInterval(progressTimer);
    }, 30);
  }

  /* Start (or restart) the auto-advance interval */
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DURATION);
  }

  /* ── Arrow button controls ── */
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });

  /* ── Dot indicator clicks ── */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  /* ── Pause on hover, resume on leave ── */
  const asideEl = document.querySelector('aside');
  if (asideEl) {
    asideEl.addEventListener('mouseenter', () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    });
    asideEl.addEventListener('mouseleave', () => {
      startAuto();
      resetProgress();
    });

    /* ── Touch / swipe support ── */
    let touchStartX = 0, touchStartY = 0;

    asideEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    asideEl.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;
      /* Only register as a horizontal swipe if it's dominant over vertical */
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dx < 0 ? goTo(current + 1) : goTo(current - 1);
        startAuto();
      }
    }, { passive: true });
  }

  /* ── Kick everything off ── */
  startAuto();
  resetProgress();
})();


/* ─────────────────────────────────────────────
   2. REVIEWS — RATING BAR ANIMATION
   Animates the horizontal star-count bars on
   the Reviews page by adding the .animate class.
───────────────────────────────────────────── */
(function initRatingBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;   /* not on reviews page — skip */

  /* Delay slightly so the transition is visible after paint */
  window.addEventListener('load', () => {
    setTimeout(() => {
      bars.forEach(bar => bar.classList.add('animate'));
    }, 400);
  });
})();


/* ─────────────────────────────────────────────
   3. REVIEW FORM (reviews.html)
   Validates the leave-a-review form and
   injects a new review card into the grid.
───────────────────────────────────────────── */
(function initReviewForm() {
  const reviewForm = document.getElementById('reviewForm');
  const grid       = document.getElementById('reviews-grid');
  const toast      = document.getElementById('toast');

  /* Only run on the Reviews page */
  if (!reviewForm || !grid) return;

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    /* ── Grab field wrappers and values ── */
    const nameField    = document.getElementById('field-name');
    const serviceField = document.getElementById('field-service');
    const reviewField  = document.getElementById('field-review');
    const nameVal      = document.getElementById('rev-name').value.trim();
    const serviceVal   = document.getElementById('rev-service').value.trim();
    const reviewVal    = document.getElementById('rev-text').value.trim();
    const ratingInput  = document.querySelector('input[name="rating"]:checked');

    let valid = true;

    /* Validate: name required */
    nameField.classList.toggle('invalid', !nameVal);
    if (!nameVal) valid = false;

    /* Validate: service required */
    serviceField.classList.toggle('invalid', !serviceVal);
    if (!serviceVal) valid = false;

    /* Validate: review must be ≥20 chars */
    const reviewOk = reviewVal.length >= 20;
    reviewField.classList.toggle('invalid', !reviewOk);
    if (!reviewOk) valid = false;

    if (!valid) return;   /* stop here if any field is invalid */

    /* ── Build star HTML for the new card ── */
    const rating = ratingInput ? parseInt(ratingInput.value) : 5;
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span class="star${i > rating ? ' empty' : ''}"></span>`;
    }

    /* ── Build reviewer initials for the avatar ── */
    const initials = nameVal
      .split(' ')
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    /* ── Format today's date ── */
    const now     = new Date();
    const dateStr = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    /* ── Create and prepend the card element ── */
    const card = document.createElement('article');
    card.className = 'review-card';
    card.style.animation = 'revealUp 0.6s cubic-bezier(0.16,1,0.3,1) both';
    card.innerHTML = `
      <div class="stars">${starsHTML}</div>
      <p>"${reviewVal}"</p>
      <footer class="reviewer">
        <div class="avatar">${initials}</div>
        <div class="reviewer-info">
          <h3>${nameVal}</h3>
          <p>${serviceVal} &middot; ${dateStr}</p>
        </div>
      </footer>`;

    grid.prepend(card);

    /* ── Show success toast ── */
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    /* ── Reset the form ── */
    reviewForm.reset();
    if (ratingInput) ratingInput.checked = false;
  });
})();


/* ─────────────────────────────────────────────
   4. FAQ FORM (FAQ.html)
   Validates the submit-a-question form and
   appends a new <details> accordion item.
───────────────────────────────────────────── */
(function initFaqForm() {
  const faqForm = document.getElementById('faq-form');
  const faqList = document.getElementById('faq-list');

  /* Only run on the FAQ page */
  if (!faqForm || !faqList) return;

  faqForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const question = document.getElementById('question').value.trim();
    if (!question) return;   /* nothing to add */

    /* Placeholder answer shown while awaiting a real reply */
    const answer = 'Thank you for your question — our team will provide an answer shortly.';

    /* ── Build the new accordion item ── */
    const details = document.createElement('details');
    details.classList.add('faq-item', 'new-item');

    const summary = document.createElement('summary');
    summary.textContent = question;

    const p = document.createElement('p');
    p.textContent = answer;

    details.appendChild(summary);
    details.appendChild(p);
    faqList.appendChild(details);

    /* Open it briefly so the user sees it was added */
    details.open = true;

    /* Reset form and scroll new item into view */
    faqForm.reset();
    details.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();


/* ─────────────────────────────────────────────
   5. BOOKING FORM (Booking.html)
   Client-side validation for the appointment
   booking form; shows success overlay on pass.
───────────────────────────────────────────── */
(function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;   /* not on Booking page — skip */

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    /* ── Collect field values ── */
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date    = document.getElementById('date').value;
    const time    = document.getElementById('time').value;

    /* ── Grab error message elements ── */
    const nameError    = document.getElementById('nameError');
    const emailError   = document.getElementById('emailError');
    const phoneError   = document.getElementById('phoneError');
    const serviceError = document.getElementById('serviceError');
    const dateError    = document.getElementById('dateError');
    const timeError    = document.getElementById('timeError');

    /* ── Clear previous errors before re-validating ── */
    nameError.textContent    = '';
    emailError.textContent   = '';
    phoneError.textContent   = '';
    serviceError.textContent = '';
    dateError.textContent    = '';
    timeError.textContent    = '';

    /* ── Validate: name must not be empty ── */
    if (name === '') {
      nameError.textContent = 'Name is required';
      isValid = false;
    }

    /* ── Validate: standard email format ── */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = 'Enter a valid email';
      isValid = false;
    }

    /* ── Validate: digits only, at least 10 ── */
    const phonePattern = /^[0-9]{10,}$/;
    if (!phonePattern.test(phone)) {
      phoneError.textContent = 'Enter valid phone number';
      isValid = false;
    }

    /* ── Validate: a service must be selected ── */
    if (service === '') {
      serviceError.textContent = 'Select a service';
      isValid = false;
    }

    /* ── Validate: a date must be selected ── */
    if (date === '') {
      dateError.textContent = 'Select a date';
      isValid = false;
    }

    /* ── Validate: a time must be selected ── */
    if (time === '') {
      timeError.textContent = 'Select a time';
      isValid = false;
    }

    /* ── If all valid, show the success overlay and reset ── */
    if (isValid) {
      document.getElementById('successOverlay').classList.add('show');
      bookingForm.reset();
    }
  });
})();

/* Close the booking success overlay — called by the overlay button */
function closeOverlay() {
  document.getElementById('successOverlay').classList.remove('show');
}
