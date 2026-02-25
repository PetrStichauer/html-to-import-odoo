document.addEventListener('DOMContentLoaded', function() {
    /* ─── HERO CAROUSEL ─── */
    const SLIDE_DURATION = 50000;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const counter = document.getElementById('heroCounter');
    const fill = document.getElementById('progressFill');
    const track = document.getElementById('heroTrack');
    
    // Ujistíme se, že prvky na stránce existují (ochrana před pádem JS na jiných stránkách)
    if(track && slides.length > 0) {
        let cur = 0, timer, prog, progStart;
        function goTo(idx) {
          slides[cur].classList.remove('is-active');
          dots[cur].classList.remove('on');
          cur = (idx + slides.length) % slides.length;
          slides[cur].classList.add('is-active');
          dots[cur].classList.add('on');
          track.style.transform = `translateX(-${cur * 100}%)`;
          counter.textContent = `0${cur + 1} / 0${slides.length}`;
          startProgress();
        }
        function startProgress() {
          cancelAnimationFrame(prog);
          fill.style.transition = 'none';
          fill.style.width = '0%';
          progStart = performance.now();
          function tick(ts) {
            const pct = Math.min((ts - progStart) / SLIDE_DURATION * 100, 100);
            fill.style.transition = 'none';
            fill.style.width = pct + '%';
            if (pct < 100) prog = requestAnimationFrame(tick);
          }
          prog = requestAnimationFrame(tick);
        }
        function startAuto() { timer = setInterval(() => goTo(cur + 1), SLIDE_DURATION); }
        function resetAuto() { clearInterval(timer); startAuto(); }
        document.getElementById('heroNext').addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
        document.getElementById('heroPrev').addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
        dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.i); resetAuto(); }));
        
        let touchX = null;
        document.querySelector('.hero').addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, {passive:true});
        document.querySelector('.hero').addEventListener('touchend', e => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 50) { dx < 0 ? goTo(cur + 1) : goTo(cur - 1); resetAuto(); }
          touchX = null;
        }, {passive:true});
        goTo(0);
        startAuto();
    }

    /* ─── SCROLL FADE-UP ─── */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('vis'), i * 90);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
    document.querySelectorAll('.fu').forEach(el => obs.observe(el));

    /* ─── NAVBAR SHADOW ─── */
    const topnav = document.getElementById('topnav');
    if(topnav) {
        window.addEventListener('scroll', () => {
          topnav.style.boxShadow =
            window.scrollY > 48 ? '0 4px 24px rgba(28,26,22,0.09)' : 'none';
        }, {passive: true});
    }
});