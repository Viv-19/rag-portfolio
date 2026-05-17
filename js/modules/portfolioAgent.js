/**
 * Portfolio agent: start button, scroll reveal, and status overlay.
 */

import { AGENT_STATUS_MESSAGES } from '../config/content.js';

/**
 * Wires the agent CTA, intersection observer, and scroll-based status visibility.
 */
export function initPortfolioAgent() {
    const startBtn = document.getElementById('start-agent-btn');
    const agentStatus = document.getElementById('agent-status');
    const statusText = document.querySelector('.status-text');
    const sections = document.querySelectorAll('.agent-section');

    if (!startBtn || !agentStatus || !statusText) {
        console.warn('[portfolioAgent] Required DOM nodes missing — agent flow disabled.');
        return;
    }

    startBtn.addEventListener('click', () => {
        agentStatus.classList.remove('hidden');
        statusText.textContent = 'Initializing portfolio agent...';

        const firstSection = document.getElementById('skills');
        if (firstSection) {
            setTimeout(() => {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }, 800);
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const targetId = entry.target.id;
            agentStatus.classList.remove('hidden');

            if (AGENT_STATUS_MESSAGES[targetId]) {
                statusText.textContent = AGENT_STATUS_MESSAGES[targetId];
            }

            entry.target.classList.remove('hidden');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));

    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            agentStatus.classList.add('hidden');
        } else {
            agentStatus.classList.remove('hidden');
        }
    });
}
