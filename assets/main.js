// assets/js/main.js
(() => {
  // Footer year
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Contact form: Bootstrap validation + Formspree submission (AJAX)
  function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Front-end validation
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Honeypot (simple bot check)
      const gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value) return;

      // Send to Formspree
      status.innerHTML = 'Sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          status.innerHTML = '<div class="alert alert-success mt-2">Thanks! Your message was sent.</div>';
          form.reset();
          form.classList.remove('was-validated');
        } else {
          status.innerHTML = '<div class="alert alert-danger mt-2">Oops, something went wrong. Try again later.</div>';
        }
      } catch {
        status.innerHTML = '<div class="alert alert-danger mt-2">Network error. Please try again.</div>';
      }
    });
  }

  // Project filter buttons
  function initProjectFilters() {
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('#projectGrid .project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        cards.forEach((card) => {
          const tags = (card.dataset.tags || '').split(',');
          const show = filter === 'all' || tags.includes(filter);
          card.classList.toggle('d-none', !show);
        });
      });
    });
  }

  // Init
  initYear();
  initContactFormValidation();
  initProjectFilters();
})();