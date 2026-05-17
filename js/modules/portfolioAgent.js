/**
 * Portfolio interactions: Scroll reveal.
 */

export function initPortfolioAgent() {
    const sections = document.querySelectorAll('.agent-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.remove('hidden');
            entry.target.classList.add('visible');

            // Typewriter effect for section headers
            const typewriter = entry.target.querySelector('.section-typewriter');
            if (typewriter) {
                const text = typewriter.getAttribute('data-text');
                typewriter.textContent = '';
                typewriter.classList.add('typing');
                
                let i = 0;
                const speed = 100;
                function typeWriter() {
                    if (i < text.length) {
                        typewriter.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }
                setTimeout(typeWriter, 500); // 500ms delay after section becomes visible
            }

            observer.unobserve(entry.target);
        });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
}
