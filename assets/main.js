// assets/js/main.js

(() => {
  // Init dynamic year in footer
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Init Bootstrap-style validation for the contact form
  function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Hook up your real endpoint (Formspree/EmailJS/server) here
        e.preventDefault();
        alert('Thanks! Your message was validated. Hook up a real endpoint to send it.');
      }
      form.classList.add('was-validated');
    });
  }

  // Init simple project filter buttons
  function initProjectFilters() {
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('#projectGrid .project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle active button state
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        const filter = btn.getAttribute('data-filter');
        cards.forEach((card) => {
          const tags = (card.dataset.tags || '').split(',');
          const show = filter === 'all' || tags.includes(filter);
          card.classList.toggle('d-none', !show);
        });
      });
    });
  }

  // Call all initializers
  initYear();
  initContactFormValidation();
  initProjectFilters();
})();
