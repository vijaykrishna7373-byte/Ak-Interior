(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const whatsapp = document.querySelector('.whatsapp');
  const whatsappPhone = window.AKRUTHI_WHATSAPP_PHONE || '';
  if (whatsapp && /^\d{8,15}$/.test(whatsappPhone)) {
    whatsapp.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello Akruthi, I am interested in your interior design services. I would like to discuss my home and understand the next steps.')}`;
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.setAttribute('aria-label', 'Chat with Akruthi on WhatsApp');
    whatsapp.querySelector('span').textContent = 'WhatsApp';
  }
  const form = document.getElementById('enquiry-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    const status = document.getElementById('form-status');
    // Deliberately no pretend network submission: no verified destination has been provided.
    const email = window.AKRUTHI_CONTACT_EMAIL || '';
    if (!email) {
      status.textContent = 'Your details are ready, but the studio email is not configured. Please contact Akruthi directly once verified contact details are available.';
      status.classList.add('form-error');
      return;
    }
    const subject = encodeURIComponent(`Interior enquiry from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email || 'Not provided'}\nProperty: ${values.property}\nLocation: ${values.location}\nMessage: ${values.message}`);
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app has opened with a prepared message. Send it there to complete your enquiry.';
  });
})();
