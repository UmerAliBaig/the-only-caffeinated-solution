/* =========================================================
   Shared header / footer / floating widgets
   Injected on every page via #header-placeholder / #footer-placeholder
   ========================================================= */

const LOGO_SVG = `
<svg viewBox="0 0 64 64" class="brand-logo" role="img" aria-label="The Only Caffeinated Solution logo">
  <circle cx="32" cy="32" r="31" fill="#2b1810"/>
  <path d="M16 28h26v10a13 13 0 0 1-13 13 13 13 0 0 1-13-13V28z" fill="#f0e2cc"/>
  <path d="M42 30h4a5 5 0 0 1 0 10h-4v-4h4a1 1 0 0 0 0-2h-4v-4z" fill="#f0e2cc"/>
  <path d="M20 15c-2 3 2 4 0 7M27 15c-2 3 2 4 0 7M34 15c-2 3 2 4 0 7" stroke="#c8893b" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <rect x="14" y="46" width="30" height="4" rx="2" fill="#c8893b"/>
</svg>`;

const NAV_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'menu.html', label: 'Menu', key: 'menu' },
  { href: 'reservation.html', label: 'Reservations', key: 'reservation' },
  { href: 'locations.html', label: 'Locations', key: 'locations' },
];

const NAV_MORE = [
  { href: 'services.html', label: 'Services & Catering', key: 'services' },
  { href: 'loyalty.html', label: 'Loyalty Rewards', key: 'loyalty' },
  { href: 'testimonials.html', label: 'Testimonials', key: 'testimonials' },
  { href: 'faq.html', label: 'FAQ', key: 'faq' },
];

const MORE_KEYS = NAV_MORE.map(i => i.key);

function buildHeader(activePage) {
  const mainLinks = NAV_LINKS.map(item => `
    <li class="nav-item">
      <a href="${item.href}" class="nav-link${item.key === activePage ? ' active' : ''}">${item.label}</a>
    </li>`).join('');

  const moreLinks = NAV_MORE.map(item => `
    <a href="${item.href}"${item.key === activePage ? ' class="active"' : ''}>${item.label}</a>`).join('');

  const moreOpen = MORE_KEYS.includes(activePage);

  return `
  <div class="container header-inner">
    <a href="index.html" class="brand">
      ${LOGO_SVG}
      <span class="brand-text">
        <span class="brand-name">The Only Caffeinated Solution</span>
        <span class="brand-tag">Brewed For Believers</span>
      </span>
    </a>

    <nav class="main-nav" id="mainNav" aria-label="Primary">
      <ul>
        ${mainLinks}
        <li class="nav-item has-dropdown${moreOpen ? ' open' : ''}" id="moreDropdown">
          <button type="button" class="nav-link dropdown-toggle" id="moreToggle" aria-haspopup="true" aria-expanded="false">
            More <span class="caret">&#9662;</span>
          </button>
          <div class="dropdown-menu">${moreLinks}</div>
        </li>
        <li class="nav-item">
          <a href="contact.html" class="nav-link${activePage === 'contact' ? ' active' : ''}">Contact</a>
        </li>
      </ul>
    </nav>

    <div class="header-actions">
      <a href="order.html" class="icon-btn" id="headerCartBtn" aria-label="View cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h2l1.6 12.4A2 2 0 0 0 9.6 18h7.9a2 2 0 0 0 2-1.7L21 8H6.4"/><circle cx="9.8" cy="21" r="1.3"/><circle cx="17" cy="21" r="1.3"/></svg>
        <span class="cart-count" id="cartCount" hidden>0</span>
      </a>
      <a href="order.html" class="btn btn-primary btn-sm">Order Now</a>
      <button type="button" class="hamburger" id="hamburgerBtn" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>`;
}

function buildFooter() {
  return `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="index.html" class="brand">
          ${LOGO_SVG}
          <span class="brand-text">
            <span class="brand-name" style="color:#faf3e8">The Only Caffeinated Solution</span>
            <span class="brand-tag">Brewed For Believers</span>
          </span>
        </a>
        <p>Specialty coffee, honest food and a warm seat for every story — served fresh across Karachi since 2016.</p>
        <div class="footer-social">
          <a href="https://facebook.com/onlycaffeinatedsolution" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M13.6 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.5 1.6-1.5h1.7V3.3C16.6 3.2 15.7 3 14.6 3c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.7v3.2h2.7V21z"/></svg></a>
          <a href="https://instagram.com/onlycaffeinatedsolution" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"/></svg></a>
          <a href="https://youtube.com/@onlycaffeinatedsolution" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor"/></svg></a>
          <a href="https://linkedin.com/company/onlycaffeinatedsolution" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="7.5" cy="8" r="1.1" fill="currentColor" stroke="none"/><path d="M6.3 10.7h2.4V18H6.3zM10.8 10.7h2.3v1.1c.5-.8 1.3-1.3 2.5-1.3 2 0 3 1.3 3 3.7V18h-2.4v-3.5c0-1.1-.4-1.8-1.4-1.8-.8 0-1.3.5-1.5 1-.1.2-.1.5-.1.8V18h-2.4z" fill="currentColor" stroke="none"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="menu.html">Menu</a></li>
          <li><a href="testimonials.html">Testimonials</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="order.html">Order Online</a></li>
          <li><a href="reservation.html">Reservations</a></li>
          <li><a href="services.html">Catering & Events</a></li>
          <li><a href="loyalty.html">Loyalty Rewards</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>96-B Khayaban-e-Iqbal, Clifton, Karachi</li>
          <li><a href="tel:+923001234567">+92 300 1234567</a></li>
          <li><a href="mailto:hello@onlycaffeinated.com">hello@onlycaffeinated.com</a></li>
          <li>Open Daily · 8:00 AM – 12:00 AM</li>
          <li><a href="contact.html">Get Directions &rarr;</a></li>
        </ul>
      </div>
      <div class="footer-newsletter">
        <h4>Stay Brewed-In</h4>
        <p style="color:#e3bd82;font-size:0.85rem;">Get new-menu drops & offers in your inbox.</p>
        <form id="footerNewsletterForm" novalidate>
          <label for="footerNewsletterEmail" class="sr-only" style="position:absolute;left:-9999px;">Email address</label>
          <input type="email" id="footerNewsletterEmail" placeholder="Your email address" required>
          <button type="submit">Join</button>
        </form>
        <p class="error-msg" id="footerNewsletterError"></p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="footerYear"></span> The Only Caffeinated Solution. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Support</a>
      </div>
    </div>
  </div>`;
}

function buildFloatStack() {
  return `
  <a class="wa-float" id="waFloat" href="https://wa.me/923001234567?text=Hi!%20I'd%20like%20to%20know%20more%20about%20The%20Only%20Caffeinated%20Solution."
     target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 1.8a8 8 0 1 1 0 16 8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4z"/><path d="M9.1 7.6c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.1 1.7 2.7 4.2 3.7 2 .8 2.4.7 2.9.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.5-.3-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.1-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C9.7 9.1 9.3 8 9.1 7.6z"/></svg></a>
  <button type="button" class="back-to-top" id="backToTop" aria-label="Back to top">&#8593;</button>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const activePage = document.body.dataset.page || '';

  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const floatEl = document.getElementById('float-placeholder');

  if (headerEl) {
    headerEl.outerHTML = `<header class="site-header" id="siteHeader">${buildHeader(activePage)}</header>`;
  }
  if (footerEl) {
    footerEl.outerHTML = `<footer class="site-footer">${buildFooter()}</footer>`;
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
  if (floatEl) {
    floatEl.outerHTML = `<div class="float-stack">${buildFloatStack()}</div>`;
  }

  initHeaderBehavior();
  initFooterNewsletter();
  updateCartBadge();
});

function initHeaderBehavior() {
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('mainNav');
  const moreDropdown = document.getElementById('moreDropdown');
  const moreToggle = document.getElementById('moreToggle');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  });

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (moreDropdown && moreToggle) {
    moreToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = moreDropdown.classList.toggle('open');
      moreToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!moreDropdown.contains(e.target)) {
        moreDropdown.classList.remove('open');
        moreToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        moreDropdown.classList.remove('open');
        moreToggle.setAttribute('aria-expanded', 'false');
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          hamburger.classList.remove('is-active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

function initFooterNewsletter() {
  const form = document.getElementById('footerNewsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('footerNewsletterEmail');
    const error = document.getElementById('footerNewsletterError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
      error.textContent = 'Please enter a valid email address.';
      error.classList.add('show');
      input.classList.add('invalid');
      return;
    }
    error.classList.remove('show');
    input.classList.remove('invalid');
    showToast('Thanks for subscribing! Check your inbox soon.', 'success');
    form.reset();
  });
}

/* ---------- Cart badge (shared across pages via localStorage) ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem('tocs_cart') || '{}'); }
  catch { return {}; }
}
function updateCartBadge() {
  const cart = getCart();
  const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = total;
    badge.hidden = total === 0;
  }
}

/* ---------- Toast helper (global) ---------- */
function showToast(message, type = 'success') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  wrap.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
