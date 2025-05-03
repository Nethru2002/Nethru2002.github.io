document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const body = document.body; 

    menuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-times');
        menuBtn.querySelector('i').classList.toggle('fa-bars'); 
        body.classList.toggle('no-scroll'); 
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
                body.classList.remove('no-scroll');
            }
        });
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickOnMenuButton = menuBtn.contains(event.target);

        if (!isClickInsideNavbar && !isClickOnMenuButton && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
            body.classList.remove('no-scroll');
        }
    });


    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 20);
    });

    // Typing Animation (check if elements exist)
    if (document.querySelector('.typing')) {
        const typed = new Typed('.typing', {
            strings: ['Software Engineer', 'Web Developer', 'IoT Developer', 'Mobile App Developer', 'Content Creator'], 
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    if (document.querySelector('.typing-2')) {
        const typed2 = new Typed('.typing-2', {
             strings: ['Software Engineer', 'Web Developer', 'IoT Developer', 'Mobile App Developer', 'Content Creator'],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 150,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        // General reveals
        sr.reveal('.title', { origin: 'top' });
        sr.reveal('.home-content .text-1', { delay: 200 });
        sr.reveal('.home-content .text-2', { delay: 300 });
        sr.reveal('.home-content .text-3', { delay: 400 });
        sr.reveal('.home-content .btn, .home-content .social-icons', { delay: 500 });
        sr.reveal('.home-image', { delay: 300, origin: 'right' });

        // Section reveals
        sr.reveal('.about-content .left, .skills-content .right, .contact-content .left', { origin: 'left' });
        sr.reveal('.about-content .right, .skills-content .left, .contact-content .right', { origin: 'right' });

        // Staggered reveals
        sr.reveal('.projects-content .card', { interval: 150 });
        sr.reveal('.timeline-item', { interval: 150 });
        sr.reveal('.skills-content .right .bars', { interval: 100, origin: 'right' });

    } else {
        console.warn('ScrollReveal library not found. Animations will not work.');
    }


    // Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let index = sections.length;
        const offset = 150;

        while(--index && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));

        if(index >= 0) {
             const activeLink = document.querySelector(`.nav-link[href="#${sections[index].id}"]`);
             if (activeLink) {
                activeLink.classList.add('active');
            }
        }

         const homeLink = document.querySelector('.nav-link[href="#home"]');
         if (window.scrollY < sections[0].offsetTop - offset) {
             navLinks.forEach((link) => link.classList.remove('active'));
             if(homeLink) homeLink.classList.add('active');
         } else if (!document.querySelector('.nav-link.active') && homeLink) {
             homeLink.classList.add('active');
         }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();


    // Scroll to Top Button
    const scrollBtn = document.querySelector('.scroll-up-btn');

    if(scrollBtn){
        window.addEventListener('scroll', function() {
            if (this.scrollY > 400) {
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });

        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');

    if (contactForm && successModal && closeModal) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                 if (response.ok || response.status === 200 || response.type === 'opaque') {
                    setTimeout(() => {
                         successModal.style.display = 'flex';
                    }, 300);
                 } else {
                    response.json().then(data => {
                        const errorMessage = data.errors ? data.errors.map(err => err.message).join(', ') : 'An error occurred. Please try again.';
                        alert(errorMessage);
                    }).catch(() => {
                         alert('An error occurred. Status: ' + response.status + '. Please try again.');
                    });
                 }
            })
            .catch(error => {
                console.error('Form Submission Error:', error);
                alert('Could not send message. Check your network connection or try again later.');
            })
            .finally(() => {
                 setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                 }, 500);
            });
        });

        closeModal.addEventListener('click', function() {
            successModal.style.display = 'none';
             contactForm.reset();
        });

        window.addEventListener('click', function(event) {
            if (event.target === successModal) {
                successModal.style.display = 'none';
                contactForm.reset();
            }
        });

        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && successModal.style.display === 'flex') {
                 successModal.style.display = 'none';
                 contactForm.reset();
            }
        });

    } else {
        if (!contactForm) console.warn('Contact form (.contact-form) not found.');
        if (!successModal) console.warn('Success modal (#successModal) not found.');
        if (!closeModal) console.warn('Close modal button (.close-modal) not found.');
    }

    // Update copyright year automatically
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});