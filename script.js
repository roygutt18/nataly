document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Logic ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');

            // Toggle Icon
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Accessibility Widget Logic ---
    const accToggle = document.getElementById('acc-toggle');
    const accMenu = document.getElementById('acc-menu');
    const toggleContrast = document.getElementById('toggle-contrast');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const resetAcc = document.getElementById('reset-acc');

    let currentFontSize = 16;

    if (accToggle) {
        accToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            accMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!accMenu.contains(e.target) && !accToggle.contains(e.target)) {
                accMenu.classList.remove('active');
            }
        });
    }

    // High Contrast Toggle
    if (toggleContrast) {
        toggleContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isContrast = document.body.classList.contains('high-contrast');
            toggleContrast.textContent = isContrast ? 'בטל' : 'הפעל';
        });
    }

    // Font Size Control
    const updateFontSize = () => {
        document.documentElement.style.setProperty('--font-size-base', `${currentFontSize}px`);
    };

    if (fontIncrease) {
        fontIncrease.addEventListener('click', () => {
            if (currentFontSize < 24) {
                currentFontSize += 2;
                updateFontSize();
            }
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                updateFontSize();
            }
        });
    }

    // Reset Accessibility
    if (resetAcc) {
        resetAcc.addEventListener('click', () => {
            document.body.classList.remove('high-contrast');
            if (toggleContrast) toggleContrast.textContent = 'הפעל';
            currentFontSize = 16;
            updateFontSize();
            accMenu.classList.remove('active');
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
