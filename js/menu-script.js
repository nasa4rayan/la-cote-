/* ========================================
   Menu Page - JavaScript
   Trilingual Support (FR/AR/EN)
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
            fr: 'Menu | Cafe Restaurant La Cote - Asilah, Morocco',
            ar: 'القائمة | مقهى مطعم لا كوت - أصيلة، المغرب',
            en: 'Menu | Cafe Restaurant La Cote - Asilah, Morocco'
        };
        document.title = titles[lang];

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descriptions = {
                fr: 'Découvrez notre menu - Petit Déjeuner, Crêpes, Gaufres, Jus, Mojitos et plus encore',
                ar: 'اكتشف قائمتنا - الفطور، الكريب، الوافل، العصائر، الموهيتو والمزيد',
                en: 'Discover our menu - Breakfast, Crêpes, Waffles, Juices, Mojitos and more'
            };
            metaDesc.setAttribute('content', descriptions[lang]);
        }
    }

    // ========================================
    // Menu Category Navigation
    // ========================================
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            // Update active button
            menuNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                    // Scroll to top of menu content
                    document.querySelector('.menu-main').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });

            // Update URL hash
            history.pushState(null, null, `#${category}`);
        });
    });

    // Handle URL hash on page load
    function handleHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const targetBtn = document.querySelector(`.menu-nav-btn[data-category="${hash}"]`);
            const targetSection = document.getElementById(hash);
            
            if (targetBtn && targetSection) {
                menuNavBtns.forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
                
                menuSections.forEach(s => s.classList.remove('active'));
                targetSection.classList.add('active');
            }
        }
    }

    handleHash();

    // Handle back/forward navigation
    window.addEventListener('hashchange', handleHash);

    // ========================================
    // Mobile Navigation Integration
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navRight = document.querySelector('.nav-right');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navRight) {
                navRight.classList.toggle('active');
            }
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (navRight) {
                    navRight.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // Scroll Reveal for Menu Items
    // ========================================
    const revealItems = document.querySelectorAll('.menu-package, .menu-item-simple, .flavor-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 30);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        revealObserver.observe(item);
    });

    // ========================================
    // Package Card Hover Effect
    // ========================================
    const packages = document.querySelectorAll('.menu-package');
    
    packages.forEach(pkg => {
        pkg.addEventListener('mouseenter', () => {
            packages.forEach(p => {
                if (p !== pkg) {
                    p.style.opacity = '0.6';
                }
            });
        });

        pkg.addEventListener('mouseleave', () => {
            packages.forEach(p => {
                p.style.opacity = '1';
            });
        });
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Arrow keys for category navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeIndex = Array.from(menuNavBtns).findIndex(btn => btn.classList.contains('active'));
            let newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (activeIndex + 1) % menuNavBtns.length;
            } else {
                newIndex = (activeIndex - 1 + menuNavBtns.length) % menuNavBtns.length;
            }

            menuNavBtns[newIndex].click();
            menuNavBtns[newIndex].focus();
        }

        // Number keys for quick category switch
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= menuNavBtns.length) {
            menuNavBtns[numKey - 1].click();
        }
    });

    // ========================================
    // Print Menu Button (Optional)
    // ========================================
    // Add print functionality if needed
    function printMenu() {
        // Show all sections for printing
        menuSections.forEach(section => section.classList.add('active'));
        window.print();
        // Restore active section after print
        handleHash();
    }

    // Expose print function globally
    window.printMenu = printMenu;

    // ========================================
    // Smooth scroll for internal links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target && target.classList.contains('menu-section')) {
                    e.preventDefault();
                    const category = href.slice(1);
                    const btn = document.querySelector(`.menu-nav-btn[data-category="${category}"]`);
                    if (btn) btn.click();
                }
            }
        });
    });
});
