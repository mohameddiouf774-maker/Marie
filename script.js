document.addEventListener('DOMContentLoaded', function() {
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const page3 = document.getElementById('page3');
  
  const startBtn = document.getElementById('startBtn');
  const toFinalBtn = document.getElementById('toFinal');
  const noBtn = document.querySelector('.noBtn');
  const yesBtn = document.querySelector('.yesBtn');
  const finalMessage = document.getElementById('finalMessage');
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');

  function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // navigation pages
  startBtn.addEventListener('click', () => {page1.classList.remove('active'); page2.classList.add('active');});
  toFinalBtn.addEventListener('click', () => {page2.classList.remove('active'); page3.classList.add('active');});
  noBtn.addEventListener('click', () => {}); // ne fait rien

  yesBtn.addEventListener('click', () => {
    yesBtn.style.transform = 'scale(1.5)';
    finalMessage.textContent = "Je t'oblige ❤️!";
    finalMessage.classList.remove('hidden');
    launchFireworks();
  });

  function launchFireworks(){
    const particles = [];
    function random(min,max){return Math.random()*(max-min)+min;}
    function createFirework(){
      const x=random(0,canvas.width);
      const y=random(0,canvas.height/2);
      for(let i=0;i<100;i++){
        particles.push({
          x:x,y:y,
          vx:random(-3,3),
          vy:random(-5,-1),
          alpha:1,
          color:`hsl(${random(0,360)},100%,50%)`
        });
      }
    }

    function animate(){
      ctx.fillStyle='rgba(7,16,34,0.2)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i];
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.alpha-=0.01;
        ctx.fillStyle=p.color; ctx.globalAlpha=p.alpha;
        ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
        if(p.alpha<=0) particles.splice(i,1);
      }
      ctx.globalAlpha=1;
      if(particles.length>0) requestAnimationFrame(animate);
    }

    createFirework();
    animate();
    setInterval(createFirework,500);
  }
});
