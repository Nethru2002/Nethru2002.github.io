document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const body = document.body; // Get body element

    menuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-times');
        menuBtn.querySelector('i').classList.toggle('fa-bars'); // Toggle bars icon too
        body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
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
        header.classList.toggle('sticky', window.scrollY > 20); // Trigger sticky slightly lower
    });

    // Typing Animation (check if elements exist)
    if (document.querySelector('.typing')) {
        const typed = new Typed('.typing', {
            strings: ['Software Engineer', 'Web Developer', 'IoT Developer', 'Mobile App Developer', 'Content Creator'], 
            typeSpeed: 80, // Slightly faster
            backSpeed: 50,
            loop: true,
            backDelay: 1500 // Longer pause before backspacing
        });
    }

    if (document.querySelector('.typing-2')) {
        const typed2 = new Typed('.typing-2', {
            strings: ['Software Engineer', 'Web Developer', 'IoT Developer', 'Mobile App Developer', 'Creative'],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    // Scroll Reveal Animation (check if ScrollReveal exists)
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom', // Animate from bottom
            distance: '60px',
            duration: 1000,
            delay: 150, // Slightly less delay
            easing: 'cubic-bezier(0.5, 0, 0, 1)', // Smoother easing
            reset: false // Animation runs only once
        });

        // General reveals
        sr.reveal('.title', { origin: 'top' }); // Changed from section-title
        sr.reveal('.home-content .text-1', { delay: 200 });
        sr.reveal('.home-content .text-2', { delay: 300 });
        sr.reveal('.home-content .text-3', { delay: 400 });
        sr.reveal('.home-content .btn, .home-content .social-icons', { delay: 500 });
        sr.reveal('.home-image', { delay: 300, origin: 'right' });

        // Section reveals
        sr.reveal('.about-content .left, .skills-content .right, .contact-content .left', { origin: 'left' });
        sr.reveal('.about-content .right, .skills-content .left, .contact-content .right', { origin: 'right' });

        // Staggered reveals for cards and timeline
        sr.reveal('.projects-content .card', { interval: 150 });
        sr.reveal('.timeline-item', { interval: 150 });
        sr.reveal('.skills-content .right .bars', { interval: 100, origin: 'right' }); // Animate skill bars

    } else {
        console.warn('ScrollReveal library not found. Animations will not work.');
    }


    // Active Link on Scroll
    const sections = document.querySelectorAll('section[id]'); // Ensure sections have IDs
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let index = sections.length;
        const offset = 150; // Adjust this value to change when the link becomes active

        while(--index && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));

        // Check if the corresponding link exists before adding the class
        // Add active class to current section link
        if(index >= 0) { // Ensure index is not negative
             const activeLink = document.querySelector(`.nav-link[href="#${sections[index].id}"]`);
             if (activeLink) {
                activeLink.classList.add('active');
            }
        }

         // Highlight home link specifically when near the top
         const homeLink = document.querySelector('.nav-link[href="#home"]');
         if (window.scrollY < sections[0].offsetTop - offset) {
             navLinks.forEach((link) => link.classList.remove('active')); // Remove from all first
             if(homeLink) homeLink.classList.add('active'); // Then add to home
         } else if (!document.querySelector('.nav-link.active') && homeLink) {
             // Fallback to home if no other section is active (might happen at exact top)
             homeLink.classList.add('active');
         }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check on load


    // Scroll to Top Button
    const scrollBtn = document.querySelector('.scroll-up-btn');

    if(scrollBtn){ // Check if button exists
        window.addEventListener('scroll', function() {
            if (this.scrollY > 400) { // Show button sooner
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });

        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');

    if (contactForm && successModal && closeModal) { // Check all elements exist
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                 if (response.ok || response.status === 200 || response.type === 'opaque') { // Opaque likely means redirect success for FormSubmit
                    // Show success modal slightly delayed
                    setTimeout(() => {
                         successModal.style.display = 'flex'; // Use flex to center
                    }, 300);
                 } else {
                    // Try to parse potential error JSON from FormSubmit or server
                    response.json().then(data => {
                        const errorMessage = data.errors ? data.errors.map(err => err.message).join(', ') : 'An error occurred. Please try again.';
                        alert(errorMessage);
                    }).catch(() => {
                         // Fallback if response isn't JSON
                         alert('An error occurred. Status: ' + response.status + '. Please try again.');
                    });
                 }
            })
            .catch(error => {
                console.error('Form Submission Error:', error);
                alert('Could not send message. Check your network connection or try again later.');
            })
            .finally(() => {
                // Restore button state after a short delay
                 setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                 }, 500);
            });
        });

        // Close modal when clicking X
        closeModal.addEventListener('click', function() {
            successModal.style.display = 'none';
            // Reset form only when modal is closed MANUALLY (after submission)
            // This prevents resetting if user is redirected via _next
             contactForm.reset();
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === successModal) {
                successModal.style.display = 'none';
                contactForm.reset(); // Reset form
            }
        });

         // Close modal with Escape key
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && successModal.style.display === 'flex') {
                 successModal.style.display = 'none';
                 contactForm.reset(); // Reset form
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