/* =========================================================
   THE ONLY CAFFEINATED SOLUTION — main.js
   All page-interactive behaviour. Every feature is guarded so
   this single file can be safely included on every page.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initAccordion();
  initSlider();
  initGallery();
  initPromoModal();
  initMenuPage();
  initOrderPage();
  initLoyaltyCalculator();
  initReservationPage();
  initContactForm();
  initFranchiseForm();
  initEventsForm();
  initReviewForm();
  initBlogComments();
});

/* ---------------------------------------------------------
   Scroll reveal (IntersectionObserver)
--------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

/* ---------------------------------------------------------
   Animated stat counters
--------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const isDecimal = el.dataset.target.includes('.');
      const target = parseFloat(el.dataset.target);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString()) + (el.dataset.suffix || '');
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => obs.observe(el));
}

/* ---------------------------------------------------------
   FAQ Accordion
--------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '0px';
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ---------------------------------------------------------
   Testimonial / content slider (click, drag, keyboard, autoplay)
--------------------------------------------------------- */
function initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = slider.querySelector('.slider-dots');
  const prevBtn = slider.querySelector('[data-dir="prev"]');
  const nextBtn = slider.querySelector('[data-dir="next"]');
  let index = 0;
  let autoplayTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });

  let startX = 0, dragging = false, deltaX = 0;
  const startDrag = (x) => { dragging = true; startX = x; track.style.transition = 'none'; };
  const moveDrag = (x) => { if (!dragging) return; deltaX = x - startX; };
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (deltaX > 60) prev();
    else if (deltaX < -60) next();
    deltaX = 0;
    resetAutoplay();
  };
  slider.addEventListener('mousedown', (e) => startDrag(e.clientX));
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);
  slider.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
  slider.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
  slider.addEventListener('touchend', endDrag);

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 6000);
  }
  slider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  slider.addEventListener('mouseleave', resetAutoplay);
  resetAutoplay();
}

/* ---------------------------------------------------------
   Gallery Lightbox
--------------------------------------------------------- */
function initGallery() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  const imgEl = lightbox.querySelector('img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let current = 0;

  function open(i) {
    current = i;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function render() {
    const item = items[current];
    imgEl.src = item.dataset.full || item.querySelector('img').src;
    captionEl.textContent = item.dataset.caption || '';
  }
  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function next() { current = (current + 1) % items.length; render(); }
  function prev() { current = (current - 1 + items.length) % items.length; render(); }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

/* ---------------------------------------------------------
   Promo modal (delay + exit-intent), shown once per session
--------------------------------------------------------- */
function initPromoModal() {
  const modal = document.getElementById('promoModal');
  if (!modal) return;
  const closeEls = modal.querySelectorAll('[data-close-modal]');
  let shown = sessionStorage.getItem('tocs_promo_shown') === '1';

  function open() {
    if (shown) return;
    modal.classList.add('open');
    shown = true;
    sessionStorage.setItem('tocs_promo_shown', '1');
  }
  function close() { modal.classList.remove('open'); }

  const delayTimer = setTimeout(open, 7000);
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) { open(); clearTimeout(delayTimer); }
  });
  closeEls.forEach(el => el.addEventListener('click', close));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  const copyBtn = modal.querySelector('#promoCopyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = modal.querySelector('#promoCode').textContent;
      navigator.clipboard?.writeText(code).catch(() => {});
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Code', 1600);
    });
  }
}

/* ---------------------------------------------------------
   Cart helpers (getCart lives in components.js)
--------------------------------------------------------- */
function setCart(cart) { localStorage.setItem('tocs_cart', JSON.stringify(cart)); }
function changeQty(id, delta) {
  const cart = getCart();
  const next = (cart[id] || 0) + delta;
  if (next <= 0) delete cart[id];
  else cart[id] = next;
  setCart(cart);
  updateCartBadge();
  return next <= 0 ? 0 : next;
}
function cartLines() {
  const cart = getCart();
  return Object.entries(cart)
    .map(([id, qty]) => ({ item: MENU_ITEMS.find(m => m.id === id), qty }))
    .filter(l => l.item);
}

/* ---------------------------------------------------------
   Menu page: category filter + live search + qty controls
--------------------------------------------------------- */
function initMenuPage() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const filterBar = document.getElementById('menuFilters');
  const searchInput = document.getElementById('menuSearch');
  const emptyState = document.getElementById('menuEmpty');
  let activeCat = 'all';

  function cardHTML(item) {
    const qty = getCart()[item.id] || 0;
    return `
    <div class="menu-item" data-id="${item.id}" data-name="${item.name.toLowerCase()}" data-desc="${item.desc.toLowerCase()}" data-cat="${item.cat}">
      <div class="card-media">
        ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
        <img src="${item.img}" alt="${item.name}" loading="lazy">
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;flex:1;">
        <div class="row"><h3>${item.name}</h3><span class="price">Rs ${item.price}</span></div>
        <p class="desc">${item.desc}</p>
        <p class="price-note">${item.cal} kcal</p>
        <div class="qty-row">
          <div class="qty-control" data-id="${item.id}">
            <button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-val">${qty}</span>
            <button type="button" data-action="inc" aria-label="Increase quantity">&plus;</button>
          </div>
          <span class="badge" style="${qty ? '' : 'visibility:hidden'}">In cart</span>
        </div>
      </div>
    </div>`;
  }

  function render() {
    const term = (searchInput?.value || '').trim().toLowerCase();
    const filtered = MENU_ITEMS.filter(item => {
      const matchesCat = activeCat === 'all' || item.cat === activeCat;
      const matchesTerm = !term || item.name.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term);
      return matchesCat && matchesTerm;
    });
    grid.innerHTML = filtered.map(cardHTML).join('');
    emptyState.classList.toggle('show', filtered.length === 0);
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      render();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', render);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') { searchInput.value = ''; render(); } });
  }
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-control button');
    if (!btn) return;
    const wrap = btn.closest('.qty-control');
    const id = wrap.dataset.id;
    const item = MENU_ITEMS.find(m => m.id === id);
    const newQty = changeQty(id, btn.dataset.action === 'inc' ? 1 : -1);
    wrap.querySelector('.qty-val').textContent = newQty;
    wrap.closest('.card-body').querySelector('.badge').style.visibility = newQty ? 'visible' : 'hidden';
    if (btn.dataset.action === 'inc') showToast(`${item.name} added — Rs ${newQty * item.price} in cart`, 'success');
  });

  render();
}

/* ---------------------------------------------------------
   Order page: builder grid + live summary + checkout form
--------------------------------------------------------- */
function initOrderPage() {
  const grid = document.getElementById('orderGrid');
  const summary = document.getElementById('orderSummary');
  if (!grid || !summary) return;

  const filterBar = document.getElementById('orderFilters');
  let activeCat = 'all';

  function cardHTML(item) {
    const qty = getCart()[item.id] || 0;
    return `
    <div class="menu-item" data-id="${item.id}" data-cat="${item.cat}">
      <div class="card-media">
        ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
        <img src="${item.img}" alt="${item.name}" loading="lazy">
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;flex:1;">
        <div class="row"><h3>${item.name}</h3><span class="price">Rs ${item.price}</span></div>
        <p class="desc">${item.desc}</p>
        <div class="qty-row">
          <div class="qty-control" data-id="${item.id}">
            <button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-val">${qty}</span>
            <button type="button" data-action="inc" aria-label="Increase quantity">&plus;</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderGrid() {
    const filtered = activeCat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.cat === activeCat);
    grid.innerHTML = filtered.map(cardHTML).join('');
  }

  function renderSummary() {
    const lines = cartLines();
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!lines.length) {
      summary.innerHTML = `<h3>Your Order</h3><p class="summary-empty">Your cart is empty. Add something delicious from the menu below.</p>`;
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }
    const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
    const delivery = subtotal >= 2000 ? 0 : 150;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;
    summary.innerHTML = `
      <h3>Your Order</h3>
      ${lines.map(l => `
        <div class="summary-line">
          <span>${l.item.name} &times; ${l.qty}<button type="button" class="summary-item-remove" data-remove="${l.item.id}">remove</button></span>
          <span>Rs ${l.item.price * l.qty}</span>
        </div>`).join('')}
      <div class="summary-line"><span>Subtotal</span><span>Rs ${subtotal}</span></div>
      <div class="summary-line"><span>Delivery</span><span>${delivery === 0 ? 'Free' : 'Rs ' + delivery}</span></div>
      <div class="summary-line"><span>Tax (5%)</span><span>Rs ${tax}</span></div>
      <div class="summary-line total"><span>Total</span><span>Rs ${total}</span></div>
      <button type="button" class="btn btn-outline btn-block" id="clearCartBtn" style="margin-top:14px;border-color:#e3bd82;color:#faf3e8;">Clear Cart</button>
    `;
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  function syncQtyLabels() {
    document.querySelectorAll('#orderGrid .qty-control').forEach(wrap => {
      const qty = getCart()[wrap.dataset.id] || 0;
      wrap.querySelector('.qty-val').textContent = qty;
    });
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-control button');
    if (!btn) return;
    const wrap = btn.closest('.qty-control');
    const newQty = changeQty(wrap.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
    wrap.querySelector('.qty-val').textContent = newQty;
    renderSummary();
  });

  summary.addEventListener('click', (e) => {
    if (e.target.id === 'clearCartBtn') {
      setCart({});
      updateCartBadge();
      renderSummary();
      syncQtyLabels();
      showToast('Cart cleared', 'success');
    }
    const removeId = e.target.dataset.remove;
    if (removeId) {
      const cart = getCart();
      delete cart[removeId];
      setCart(cart);
      updateCartBadge();
      renderSummary();
      syncQtyLabels();
    }
  });

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      renderGrid();
    });
  }

  renderGrid();
  renderSummary();

  /* Checkout form */
  const form = document.getElementById('checkoutForm');
  if (form) {
    setupForm('checkoutForm', {
      guard: () => cartLines().length > 0 || (showToast('Add at least one item to your order first', 'error'), false),
      onSuccess: () => {
        const orderNo = 'TOCS-' + Math.floor(10000 + Math.random() * 89999);
        document.getElementById('orderNumber').textContent = orderNo;
        document.getElementById('checkoutFormBody').hidden = true;
        document.getElementById('orderBuilderSection').hidden = true;
        document.getElementById('checkoutSuccess').classList.add('show');
        setCart({});
        updateCartBadge();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

/* ---------------------------------------------------------
   Loyalty points calculator
--------------------------------------------------------- */
function initLoyaltyCalculator() {
  const input = document.getElementById('loyaltySpend');
  if (!input) return;
  const pointsOut = document.getElementById('loyaltyPoints');
  const tierOut = document.getElementById('loyaltyTier');
  function calc() {
    const spend = Math.max(0, parseInt(input.value, 10) || 0);
    const points = Math.floor(spend / 100) * 10;
    pointsOut.textContent = points.toLocaleString();
    let tier = 'Bronze Bean';
    if (spend >= 15000) tier = 'Platinum Roast';
    else if (spend >= 8000) tier = 'Gold Espresso';
    else if (spend >= 3000) tier = 'Silver Blend';
    tierOut.textContent = tier;
  }
  input.addEventListener('input', calc);
  input.addEventListener('keyup', calc);
  calc();
}

/* ---------------------------------------------------------
   Generic form engine used by contact / reservation / checkout / franchise / events / review / blog comment
--------------------------------------------------------- */
function setupForm(formId, options = {}) {
  const form = document.getElementById(formId);
  if (!form) return;
  const fields = Array.from(form.querySelectorAll('input, textarea, select')).filter(f => f.type !== 'submit');

  function fieldError(field) {
    if (field.type === 'checkbox' && field.required) {
      return field.checked ? '' : (field.dataset.error || 'This field is required.');
    }
    if (field.hasAttribute('required') && !field.value.trim()) {
      return field.dataset.error || 'This field is required.';
    }
    if (field.value.trim() && field.type === 'email') {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      if (!ok) return 'Please enter a valid email address.';
    }
    if (field.value.trim() && field.type === 'tel') {
      const ok = /^[0-9+\-\s()]{7,15}$/.test(field.value.trim());
      if (!ok) return 'Please enter a valid phone number.';
    }
    if (field.value.trim() && field.hasAttribute('pattern')) {
      const re = new RegExp('^(?:' + field.getAttribute('pattern') + ')$');
      if (!re.test(field.value.trim())) return field.dataset.error || 'Please match the requested format.';
    }
    if (field.hasAttribute('minlength') && field.value.trim().length && field.value.trim().length < +field.getAttribute('minlength')) {
      return `Please enter at least ${field.getAttribute('minlength')} characters.`;
    }
    if (field.type === 'date' && field.value && field.min && field.value < field.min) {
      return `Please choose a date on or after ${field.min}.`;
    }
    return '';
  }

  function showFieldError(field, msg) {
    const group = field.closest('.form-group');
    const errorEl = group?.querySelector('.error-msg');
    field.classList.toggle('invalid', Boolean(msg));
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.toggle('show', Boolean(msg));
    }
    return !msg;
  }

  fields.forEach(field => {
    field.addEventListener('blur', () => showFieldError(field, fieldError(field)));
    field.addEventListener('input', () => { if (field.classList.contains('invalid')) showFieldError(field, fieldError(field)); });
    field.addEventListener('keyup', () => {
      const counter = document.getElementById(field.dataset.counter);
      if (counter) {
        const max = field.getAttribute('maxlength');
        counter.textContent = `${field.value.length}${max ? ' / ' + max : ''}`;
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (options.guard && options.guard() === false) return;
    let allValid = true;
    fields.forEach(field => {
      const ok = showFieldError(field, fieldError(field));
      if (!ok) allValid = false;
    });
    if (!allValid) {
      const firstInvalid = form.querySelector('.invalid');
      firstInvalid?.focus();
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }
    options.onSuccess?.(form);
  });
}

/* ---------------------------------------------------------
   Reservation page (guest counter + date min + form)
--------------------------------------------------------- */
function initReservationPage() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const dateInput = document.getElementById('resDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  const guestsWrap = document.getElementById('guestCounter');
  const guestsInput = document.getElementById('resGuests');
  if (guestsWrap && guestsInput) {
    guestsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      let val = parseInt(guestsInput.value, 10) || 1;
      val = btn.dataset.action === 'inc' ? Math.min(val + 1, 20) : Math.max(val - 1, 1);
      guestsInput.value = val;
      guestsWrap.querySelector('.qty-val').textContent = val;
    });
  }

  setupForm('reservationForm', {
    onSuccess: () => {
      const ref = 'RSV-' + Math.floor(1000 + Math.random() * 8999);
      document.getElementById('resRefNumber').textContent = ref;
      document.getElementById('reservationFormBody').hidden = true;
      document.getElementById('reservationSuccess').classList.add('show');
    }
  });
}

/* ---------------------------------------------------------
   Contact form
--------------------------------------------------------- */
function initContactForm() {
  if (!document.getElementById('contactForm')) return;
  setupForm('contactForm', {
    onSuccess: () => {
      document.getElementById('contactFormBody').hidden = true;
      document.getElementById('contactSuccess').classList.add('show');
    }
  });
}

/* ---------------------------------------------------------
   Franchise inquiry form
--------------------------------------------------------- */
function initFranchiseForm() {
  if (!document.getElementById('franchiseForm')) return;
  setupForm('franchiseForm', {
    onSuccess: () => {
      document.getElementById('franchiseFormBody').hidden = true;
      document.getElementById('franchiseSuccess').classList.add('show');
    }
  });
}

/* ---------------------------------------------------------
   Events RSVP form
--------------------------------------------------------- */
function initEventsForm() {
  if (!document.getElementById('eventForm')) return;
  setupForm('eventForm', {
    onSuccess: () => {
      document.getElementById('eventFormBody').hidden = true;
      document.getElementById('eventSuccess').classList.add('show');
    }
  });
}

/* ---------------------------------------------------------
   Review / testimonial submission form
--------------------------------------------------------- */
function initReviewForm() {
  if (!document.getElementById('reviewForm')) return;
  const stars = document.querySelectorAll('#reviewStars span');
  const ratingInput = document.getElementById('reviewRatingValue');
  stars.forEach(star => {
    star.addEventListener('mouseenter', () => paintStars(+star.dataset.val));
    star.addEventListener('click', () => { ratingInput.value = star.dataset.val; paintStars(+star.dataset.val); });
  });
  document.getElementById('reviewStars').addEventListener('mouseleave', () => paintStars(+ratingInput.value));
  function paintStars(n) {
    stars.forEach(s => s.textContent = (+s.dataset.val <= n) ? '★' : '☆');
  }
  setupForm('reviewForm', {
    onSuccess: () => {
      document.getElementById('reviewFormBody').hidden = true;
      document.getElementById('reviewSuccess').classList.add('show');
    }
  });
}

/* ---------------------------------------------------------
   Blog comment form
--------------------------------------------------------- */
function initBlogComments() {
  const form = document.getElementById('commentForm');
  if (!form) return;
  const list = document.getElementById('commentList');
  setupForm('commentForm', {
    onSuccess: (form) => {
      const name = form.querySelector('#commentName').value.trim();
      const text = form.querySelector('#commentText').value.trim();
      const li = document.createElement('div');
      li.className = 'testimonial-card';
      li.style.textAlign = 'left';
      li.style.marginTop = '18px';
      li.innerHTML = `<p class="quote" style="font-size:1rem;">"${text}"</p><div class="person"><div><p class="name">${name}</p><p class="role">Just now</p></div></div>`;
      list.prepend(li);
      form.reset();
      showToast('Comment posted — thank you!', 'success');
    }
  });
}
