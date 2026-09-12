(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const navigation = document.querySelector('[data-nav]');

  if (!toggle || !navigation) return;

  document.body.classList.add('nav-ready');

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.sr-only').textContent = 'Open navigation';
    navigation.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.querySelector('.sr-only').textContent = willOpen ? 'Close navigation' : 'Open navigation';
    navigation.classList.toggle('is-open', willOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  window.matchMedia('(min-width: 851px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
})();
