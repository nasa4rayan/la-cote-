/* ========================================
   Cafe Restaurant La Cote - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Language Switcher
    // ========================================
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'fr';

    // Load saved language preference (default to French)
    const savedLang = localStorage.getItem('lacote-lang');
    currentLang = savedLang || 'fr';
    updateLanguage(currentLang);
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Save preference
            localStorage.setItem('lacote-lang', lang);

            // Update all text content
            updateLanguage(lang);
        });
    });

    function updateLanguage(lang) {
        // Update HTML lang and dir attributes
        const html = document.documentElement;
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-fr][data-ar][data-en]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });

        // Update page title
        const titles = {
            fr: 'Café Restaurant La Cote | Asilah, Maroc',
            ar: 'مقهى مطعم لا كوت | أصيلة، المغرب',
            en: 'Cafe Restaurant La Cote | Asilah, Morocco'
        };
        document.title = titles[lang];

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descriptions = {
                fr: 'Café Restaurant La Cote - Fine dining à Asilah, Maroc. Découvrez une cuisine exquise, une ambiance élégante et un service exceptionnel.',
                ar: 'مقهى مطعم لا كوت - تناول فاخر في أصيلة، المغرب. استمتع بمطبق رائع وجو أنيق وخدمة استثنائية.',
                en: 'Cafe Restaurant La Cote - Fine dining in Asilah, Morocco. Experience exquisite cuisine, elegant ambiance, and exceptional service.'
            };
            metaDesc.setAttribute('content', descriptions[lang]);
        }
    }

    // ========================================
    // Navigation
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.classList.toggle('active');
        }
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            const navRight = document.querySelector('.nav-right');
            if (navRight) {
                navRight.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ========================================
    // Hero Slider
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    // Change slide every 6 seconds
    if (heroSlides.length > 1) {
        setInterval(nextSlide, 6000);
    }

    // ========================================
    // Menu Tabs
    // ========================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuGrids = document.querySelectorAll('.menu-grid');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding grid
            menuGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.id === category) {
                    grid.classList.add('active');
                }
            });
        });
    });

    // ========================================
    // Gallery Lightbox
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // Scroll Reveal Animations
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // Reservation Form
    // ========================================
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Reservation request sent successfully! We will contact you shortly.', 'success');
            reservationForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#1a472a' : '#4a1a1a'};
            color: #fff;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            border-left: 4px solid ${type === 'success' ? '#c9a227' : '#ff4444'};
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5;
            heroSlides.forEach(slide => {
                slide.style.transform = `scale(1) translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    });

    // ========================================
    // Image Lazy Loading
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // Counter Animation for Features
    // ========================================
    const counters = document.querySelectorAll('.feature-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // Preloader (Optional)
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Press 'Home' to go to top
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 'End' to go to bottom
        if (e.key === 'End') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
});
