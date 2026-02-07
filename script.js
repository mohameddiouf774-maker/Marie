document.addEventListener('DOMContentLoaded', function () {
  const revealBtn = document.getElementById('revealBtn');
  const question = document.getElementById('question');
  const text1El = document.getElementById('text1');
  const text2El = document.getElementById('text2');
  const finalEl = document.getElementById('finalQuestion');

  if (!revealBtn || !question || !text1El || !text2El || !finalEl) {
    // éléments manquants — rien à faire
    return;
  }

  const lines = [
    "Je ne sais pas toujours trouver les mots justes, mais je veux que tu saches que chaque instant passé avec toi compte.",
    "Tu rends les choses plus belles, plus simples et tellement vraies. J’aimerais continuer à te le prouver."
  ];
  const finalQuestion = "Veux-tu m’accompagner ce jour-là et partager ce moment avec moi ?";

  function typeText(el, text, delay = 30) {
    return new Promise(resolve => {
      el.textContent = "";
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text.charAt(i++);
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(resolve, 350);
        }
      }, delay);
    });
  }

  let revealed = false;
  async function reveal() {
    if (revealed) return;
    revealed = true;

    // afficher la zone (elle est .hidden dans le HTML)
    question.classList.remove('hidden');
    question.setAttribute('aria-hidden', 'false');

    // pour une transition douce
    question.style.opacity = 0;
    question.style.transform = 'translateY(6px)';
    // allow layout then animate
    requestAnimationFrame(() => {
      question.style.transition = '300ms ease';
      question.style.opacity = 1;
      question.style.transform = 'none';
    });

    // taper les lignes
    await typeText(text1El, lines[0], 28);
    await typeText(text2El, lines[1], 28);
    await typeText(finalEl, finalQuestion, 32);

    // désactiver le bouton pour éviter répéter
    revealBtn.disabled = true;
    revealBtn.setAttribute('aria-disabled', 'true');
    revealBtn.style.opacity = 0.85;
    // placer le focus sur la question finale pour accessibilité
    finalEl.tabIndex = -1;
    finalEl.focus({preventScroll:true});
  }

  revealBtn.addEventListener('click', reveal);
  // support clavier (Entrée/Espace)
  revealBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      reveal();
    }
  });
});