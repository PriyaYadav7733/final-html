tailwind.config = {
    theme: {
        extend: {
            colors: {
                /* PRIMARY - Canvas & Ink */
                softCanvas: '#F7F5F2',
                inkBlack: '#0E0E0E',
                /* SECONDARY - Warm Neutrals */
                warmGray: '#A8A5A0',
                charcoalSand: '#5A5753',
                /* ACCENT - Tangerine & Clay */
                tangerinePop: '#FF6A3D',
                lightClay: '#FFEADA',
                /* OPTIONAL - Soft Honey */
                softHoney: '#EFCFA3',
                /* Legacy colors (for backwards compatibility) */
                primary: '#0E0E0E',
                alloySilver: '#A8A5A0',
                fogWhite: '#F7F5F2',
                charcoalMist: '#5A5753',
                cobaltLight: '#FF6A3D',
                roseMetal: '#FFEADA',
                red:'#ff0000',
            },
            fontFamily: {
               'inter': ['Inter', 'sans-serif'],
               'gtAmerica': ['GT America Trial', 'sans-serif'],
               'spaceGrotesk': ['Space Grotesk', 'sans-serif'],
            },
            letterSpacing: {
                tight: '-0.02em',
                wide: '0.04em',
            },
            lineHeight: {
                tight: '0.9',
            },
        }
    }
};


// Video modal: open YouTube embed, stop on close, overlay and ESC handling
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('open-video');
    const modal = document.getElementById('video-modal');
    const overlay = document.getElementById('video-modal-overlay');
    const closeBtn = document.getElementById('video-modal-close');
    const iframe = document.getElementById('video-iframe');

    if (!openBtn || !modal || !iframe) return;

    function showModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');
        // small delay to allow layout then focus
        setTimeout(() => {
            iframe.focus && iframe.focus();
        }, 120);
        // prevent background scroll
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('overflow-hidden');
    }

    function hideModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
        // stop video
        iframe.src = '';
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    }

    function openVideoWithId(id) {
        // set iframe src with autoplay
        iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&modestbranding=1';
        showModal();
    }

    openBtn.addEventListener('click', function (e) {
        const id = openBtn.getAttribute('data-video-id') || openBtn.dataset.videoId;
        if (!id) return;
        openVideoWithId(id);
    });

    // close handlers
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (overlay) overlay.addEventListener('click', hideModal);

    // close with Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
});

// Reveal feature cards on scroll using IntersectionObserver.
// Respects users who set prefers-reduced-motion.

document.addEventListener('DOMContentLoaded', function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        // If user prefers reduced motion, just make elements visible.
        document.querySelectorAll('.feature-card').forEach(el => {
            el.classList.remove('opacity-0', 'translate-y-6');
            el.classList.add('opacity-100');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-6');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));

    // Additional reveal animations for left/right slide elements
    const observerDirectional = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-x-[-20px]', 'translate-x-[20px]');
                entry.target.classList.add('opacity-100', 'translate-x-0');
                entry.target.style.transition = 'all 2500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-observe].reveal-left, [data-observe].reveal-right').forEach(el => observerDirectional.observe(el));

    // Scroll to top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // show button after 200px scroll
            if (window.scrollY > 200) {
                scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Initialize hidden state
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.style.transition = 'opacity 300ms ease-in-out';
    }
});



// Navbar toggle for mobile (shows when width <= 991px). Smooth open/close using max-height + opacity.
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!navToggle || !mobileMenu) return;

    // Initialize menu hidden state for mobile
    mobileMenu.classList.add('max-h-0', 'opacity-0', 'overflow-hidden');

    function closeMobileMenu() {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
    }

    function openMobileMenu() {
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-96', 'opacity-100');
    }

    navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Ensure the menu resets correctly on resize. We'll use 991px threshold per request.
    function handleResize() {
        if (window.innerWidth > 991) {
            // desktop: ensure mobile menu is visually hidden (desktop menu shown by CSS)
            mobileMenu.classList.remove('max-h-96', 'opacity-100');
            mobileMenu.classList.add('max-h-0', 'opacity-0');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    window.addEventListener('resize', handleResize);
    // Run once to set initial state
    handleResize();
});


// Hero slider implementation
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const track = slider.querySelector('.hero-slider-track');
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const prevBtn = slider.querySelector('.hero-prev');
    const nextBtn = slider.querySelector('.hero-next');
    const dots = Array.from(slider.querySelectorAll('.hero-dot'));

    let index = 0;
    let autoplayInterval = 4500;
    let timer = null;

    function update() {
        const pct = index * 100;
        track.style.transform = `translateX(-${pct}%)`;
        dots.forEach((d, i) => d.classList.toggle('bg-white/90', i === index));
    }

    function next() { index = (index + 1) % slides.length; update(); }
    function prev() { index = (index - 1 + slides.length) % slides.length; update(); }

    function startAutoplay() {
        stopAutoplay();
        timer = setInterval(next, autoplayInterval);
    }

    function stopAutoplay() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    // Wire controls
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); startAutoplay(); }));

    // Pause on hover / focus
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    // keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); startAutoplay(); }
        if (e.key === 'ArrowLeft') { prev(); startAutoplay(); }
    });

    // initialize
    track.style.width = `${slides.length * 100}%`;
    slides.forEach(s => s.style.width = `${100 / slides.length}%`);
    update();
    startAutoplay();
});


// Scroll-triggered fade-in animations for sections
document.addEventListener('DOMContentLoaded', function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Get all fade-in sections
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length === 0) return;

    // If user prefers reduced motion, show all sections immediately
    if (prefersReduced) {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        return;
    }

    // Create Intersection Observer to trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to trigger animation
                entry.target.classList.add('animate');
                // Unobserve after animation triggered (no need to watch again)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before reaching viewport
    });

    // Observe all fade-in sections
    sections.forEach(section => observer.observe(section));
});



