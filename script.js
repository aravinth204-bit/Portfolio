// High-Conversion Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect (Sticky and Blur)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
            header.style.background = 'rgba(3, 0, 20, 0.9)';
        } else {
            header.style.padding = '1.25rem 0';
            header.style.background = 'rgba(3, 0, 20, 0.7)';
        }
    });

    // 2. Reveal Animations on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });

    // 3. Smooth Scroll with Offset for Fixed Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Premium Form Feedback (Simulation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            btn.disabled = true;
            btn.style.opacity = '0.8';

            // Simulate API call to show conversion feedback
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Strategy Call Requested!';
                btn.style.background = '#10b981'; // Success Green
                
                // Clear form
                contactForm.reset();
                
                // Show a success message alert (optional but good for UX)
                // alert("Thanks! I'll get back to you within 24 hours to schedule your call.");

                // Reset button after 4 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--accent)';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 4000);
            }, 1800);
        });
    }

    // 5. Hero Mouse Parallax (Subtle Premium Feel)
    const visual = document.querySelector('.hero-visual');
    if (visual && window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            visual.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
});