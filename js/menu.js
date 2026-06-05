document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (!btn || !nav) return;

  // Toggle nav and update button state/icon
  function setButtonState(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.classList.toggle('open', open);
    btn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  }

  btn.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('active');
    setButtonState(isOpen);
  });

  // Close nav when a link is clicked (mobile) and restore button
  document.querySelectorAll('header nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('active');
      setButtonState(false);
    });
  });
});
