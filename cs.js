// Configuration and utilities
const CONFIG = {
    scrollOffset: 58,
    scrollRevealConfig: {
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200
    }
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Menu toggle functionality
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}
showMenu('nav-toggle', 'nav-menu');

// Navigation link handling
const navLink = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('nav-menu');

function linkAction() {
    if (navMenu) {
        navMenu.classList.remove('show');
    }
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// Scroll section active link
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - CONFIG.scrollOffset;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if (!sectionsClass) return;

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', debounce(scrollActive, 100));

// ScrollReveal animations
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal(CONFIG.scrollRevealConfig);

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text');
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {delay: 400});
    sr.reveal('.home__social-icon', {interval: 200});
    sr.reveal('.skills__data, .work__img, .contact__input', {interval: 200});
} else {
    console.warn('ScrollReveal is not loaded');
}

// Contact form handling
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const form = event.target;
        if (!form.checkValidity()) {
            throw new Error('Please fill all required fields');
        }

        // Here you can add your actual form submission logic
        // For example:
        // await submitForm(new FormData(form));

        alert('Your message has been sent successfully!');
        form.reset();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};

document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmit);