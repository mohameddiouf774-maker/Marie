document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Final reveal typing
  const revealBtn = document.getElementById('revealBtn');
  const questionEl = document.getElementById('question');
  const finalText1 = document.getElementById('finalText1');
  const finalText2 = document.getElementById('finalText2');

  // Emotional build-up lines
  const lines = [
    "Il y a des jours où tout semble ordinaire — puis il y a des jours où je veux tout rendre plus doux pour toi.",
    "Aujourd’hui, je veux que chaque instant soit consacré à te montrer combien tu comptes pour moi."
  ];
  const finalQuestion = "Veux-tu être ma Valentine ? ❤️";

  // Fill the emotional paragraphs (appear subtly before typing question)
  if (finalText1) finalText1.textContent = lines[0];
  if (finalText2) finalText2.textContent = lines[1];

  function typeText(el, text, speed = 50) {
    return new Promise((resolve) => {
      el.textContent = '';
      let i = 0;
      const timer = setInterval(() => {
        el.textContent += text.charAt(i++);
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(resolve, 300);
        }
      }, speed);
    });
  }

  async function revealQuestion() {
    if (!questionEl || revealBtn.disabled) return;
    revealBtn.disabled = true;
    revealBtn.setAttribute('aria-expanded', 'true');

    // ensure question element visible and focused after typing
    questionEl.classList.remove('hidden');
    questionEl.setAttribute('aria-hidden', 'false');
    questionEl.textContent = '';

    await typeText(questionEl, finalQuestion, 60);

    // focus for accessibility
    questionEl.focus({preventScroll: true});
    // small highlight animation
    questionEl.animate([{ transform: 'scale(1.02)' }, { transform: 'none' }], { duration: 350 });
  }

  if (revealBtn) {
    revealBtn.addEventListener('click', revealQuestion);
    revealBtn.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') revealQuestion();
    });
  }
});