document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initNavigation();
    initScrollAnimations();
    initProjectFilters();
    initNeuralNetworkBackground();
    initSmoothScroll();
});

function initTypingAnimation() {
    const phrases = ['NLP Researcher', 'Deep Learning Engineer', 'Transformer Architect', 'AI Safety Advocate', 'Full-Stack Developer'];
    const typingElement = document.getElementById('typing');
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) { typingElement.textContent = currentPhrase.substring(0, charIndex - 1); charIndex--; typingSpeed = 50; }
        else { typingElement.textContent = currentPhrase.substring(0, charIndex + 1); charIndex++; typingSpeed = 100; }
        if (!isDeleting && charIndex === currentPhrase.length) { isDeleting = true; typingSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typingSpeed = 500; }
        setTimeout(type, typingSpeed);
    }
    type();
}

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); navToggle.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { navLinks.classList.remove('active'); navToggle.classList.remove('active'); }); });
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        navbar.style.background = currentScroll > 100 ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = currentScroll > 100 ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none';
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.research-card, .project-card, .skill-category, .timeline-item, .contact-card').forEach((el, index) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    const style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
                } else {
                    card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

function initNeuralNetworkBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const neuralNet = document.getElementById('neural-net');
    if (!neuralNet) return;
    neuralNet.appendChild(canvas);
    let nodes = [], animationId;
    const nodeCount = 50;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initNodes(); }
    function initNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 2 + 1 });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'; ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.globalAlpha = 1 - distance / 150; ctx.stroke(); }
            }
        }
        ctx.globalAlpha = 1;
        nodes.forEach(node => {
            node.x += node.vx; node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            ctx.beginPath(); ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2); ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'; ctx.fill();
        });
        animationId = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
    document.addEventListener('visibilitychange', () => { document.hidden ? cancelAnimationFrame(animationId) : draw(); });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' }); }
        });
    });
}

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) { hero.style.transform = `translateY(${scrolled * 0.3}px)`; hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8); }
});

console.log('%c👋 Hello, curious developer!\n\n%cThanks for checking out my portfolio.\nLet\'s connect: karin23@terpmail.umd.edu', 'font-size: 20px; font-weight: bold;', 'font-size: 14px; color: #6366f1;');
