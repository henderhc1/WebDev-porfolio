// assets/js/main.js
(() => {
  // Footer year
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Contact form: Bootstrap validation + Formspree (FormData POST)
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

      // Honeypot (spam trap)
      const gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value) return;

      // Send to Formspree as multipart/form-data (browser sets headers)
      if (status) status.innerHTML = 'Sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          if (status) status.innerHTML = '<div class="alert alert-success mt-2">Thanks! Your message was sent.</div>';
          form.reset();
          form.classList.remove('was-validated');
        } else {
          let msg = 'Oops, something went wrong. Try again later.';
          try {
            const data = await res.json();
            if (data?.errors?.[0]?.message) msg = data.errors[0].message;
          } catch (_) {}
          if (status) status.innerHTML = `<div class="alert alert-danger mt-2">${msg}</div>`;
        }
      } catch {
        if (status) status.innerHTML = '<div class="alert alert-danger mt-2">Network error. Please try again.</div>';
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

  // Initialize features
  initYear();
  initContactFormValidation();
  initProjectFilters();
})();