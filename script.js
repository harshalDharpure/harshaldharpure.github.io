/* ============================================
   HARSHAL DHARPURE - PREMIUM PORTFOLIO
   Advanced JavaScript Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initCustomCursor();
    initNavbar();
    initMobileNav();
    initRoleSlider();
    initCounterAnimation();
    initScrollAnimations();
    initExperienceTabs();
    initMagneticButtons();
    initBackToTop();
    initParticles();
    initSmoothScroll();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2500);
    });
    
    // Fallback - hide preloader after max time
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 4000);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    // Only enable on devices with hover capability
    if (!window.matchMedia('(hover: hover)').matches) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth following for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic, .social-link, .skill-item, .tab-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    const scrollThreshold = 50;
    
    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    
    if (!navToggle || !navMenu) return;
    
    const toggleNav = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    navToggle.addEventListener('click', toggleNav);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleNav();
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleNav();
        }
    });
}

/* ============================================
   ROLE SLIDER (Hero Section)
   ============================================ */
function initRoleSlider() {
    const slides = document.querySelectorAll('.role-slide');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    function nextSlide() {
        const current = slides[currentIndex];
        current.classList.remove('active');
        current.classList.add('exit');
        
        currentIndex = (currentIndex + 1) % slides.length;
        
        const next = slides[currentIndex];
        next.classList.remove('exit');
        next.classList.add('active');
        
        // Remove exit class after animation
        setTimeout(() => {
            current.classList.remove('exit');
        }, 500);
    }
    
    setInterval(nextSlide, 3000);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   EXPERIENCE TABS
   ============================================ */
function initExperienceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    const showThreshold = 500;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > showThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   PARTICLES ANIMATION
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles');
    
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translate(50px, -50px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translate(-30px, 30px) scale(0.8);
            opacity: 0.3;
        }
        75% {
            transform: translate(30px, 50px) scale(1.1);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(particleStyles);

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   DOWNLOAD RESUME FUNCTION
   ============================================ */
function downloadResume() {
    // Create a simple alert for now - you can replace with actual resume download
    alert('Resume download will be available soon! Contact: harshaldharpure9922@gmail.com');
}

// Make function globally available
window.downloadResume = downloadResume;

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log(`
%c╔══════════════════════════════════════════════╗
%c║                                              ║
%c║   👋 Hey there, curious developer!           ║
%c║                                              ║
%c║   Welcome to Harshal Dharpure's Portfolio   ║
%c║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        ║
%c║                                              ║
%c║   🎓 M.Tech AI @ IIT Patna                  ║
%c║   🤖 NLP | LLMs | RAG | Multimodal AI       ║
%c║   🚀 DevOps | ML Engineering                ║
%c║                                              ║
%c║   Interested in hiring or collaborating?    ║
%c║   📧 harshaldharpure9922@gmail.com          ║
%c║                                              ║
%c╚══════════════════════════════════════════════╝
`,
'color: #8b5cf6; font-weight: bold;',
'color: #8b5cf6;',
'color: #06b6d4; font-weight: bold;',
'color: #8b5cf6;',
'color: #f59e0b; font-weight: bold;',
'color: #8b5cf6;',
'color: #8b5cf6;',
'color: #22c55e;',
'color: #22c55e;',
'color: #22c55e;',
'color: #8b5cf6;',
'color: #ec4899;',
'color: #06b6d4;',
'color: #8b5cf6;',
'color: #8b5cf6; font-weight: bold;'
);

/* ============================================
   TYPING ANIMATION (Alternative)
   ============================================ */
function initTypingAnimation() {
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    const text = element.getAttribute('data-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

/* ============================================
   REVEAL ON SCROLL (Alternative Method)
   ============================================ */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

/* ============================================
   TILT EFFECT FOR CARDS (Optional)
   ============================================ */
function initTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card');
    
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================
   THEME TOGGLE (Future Enhancement)
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
