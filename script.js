/* ==================================================
   HEADER: muda ao rolar
   ================================================== */
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

/* ==================================================
   PARALLAX REAL NO HERO
   Move o container inteiro + zoom progressivo
   ================================================== */
const hero = document.querySelector('.hero');
const heroVideoContainer = document.querySelector('.hero-video-container');

function updateHeroParallax() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
        // Container se move mais devagar que o scroll (efeito parallax)
        const translateY = scrollY * 0.35;
        // Zoom progressivo suave
        const scale = 1 + (scrollY * 0.0004);
        
        heroVideoContainer.style.transform = 
            `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
}

window.addEventListener('scroll', updateHeroParallax, { passive: true });
window.addEventListener('resize', updateHeroParallax, { passive: true });
updateHeroParallax();

/* ==================================================
   REVEAL ANIMATIONS (Intersection Observer)
   ================================================== */
const revealElements = document.querySelectorAll(
    '.about-content, .about-image-wrapper, .experience-header, .experience-item, .gallery-header, .gallery-item, .contact-content'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Delay progressivo para elementos irmãos
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

// Adiciona delay progressivo para itens de lista e galeria
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
