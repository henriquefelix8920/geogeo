/* ==================================================
   HEADER: muda ao rolar
   ================================================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

/* ==================================================
   VÍDEO ESTÁTICO COM PARALLAX NO SCROLL
   O vídeo fica parado no primeiro frame e só se move
   quando o usuário rola a página (efeito câmera descendo)
   ================================================== */
const hero = document.querySelector('.hero');
const heroVideo = document.getElementById('heroVideo');

// Garante que o vídeo está pausado no primeiro frame
if (heroVideo) {
    heroVideo.pause();
    heroVideo.currentTime = 0;
}

function updateVideoParallax() {
    if (!heroVideo || !hero) return;
    
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    // Só aplica o efeito enquanto o hero está visível
    if (scrollY < heroHeight) {
        // Porcentagem de scroll dentro do hero (0 a 1)
        const scrollProgress = scrollY / heroHeight;
        
        // Move o vídeo para cima (efeito parallax)
        // 0.3 = intensidade do parallax (aumente para mais movimento)
        const translateY = scrollY * 0.3;
        
        // Zoom progressivo sutil (1.0 a 1.08)
        const scale = 1 + (scrollProgress * 0.08);
        
        heroVideo.style.transform = 
            `translate3d(0, -${translateY}px, 0) scale(${scale})`;
    }
}

window.addEventListener('scroll', updateVideoParallax, { passive: true });
window.addEventListener('resize', updateVideoParallax, { passive: true });
updateVideoParallax();

/* ==================================================
   REVEAL ANIMATIONS (Intersection Observer)
   ================================================== */
const revealElements = document.querySelectorAll(
    '.about-content, .about-image-wrapper, .experience-header, .experience-item, .gallery-header, .gallery-item, .contact-content'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('reveal', 'active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Delay progressivo para itens de lista e galeria
document.querySelectorAll('.experience-item').forEach((el, i) => {
    el.dataset.delay = i * 100;
});

document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.dataset.delay = i * 150;
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==================================================
   SMOOTH SCROLL para links internos
   ================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
